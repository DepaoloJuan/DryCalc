import React, { useEffect, useMemo, useState } from "react";
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Switch, Alert } from "react-native";
import { useCatalogo } from "../store/catalogo";
import { calcularMuro } from "../engine/muro";
import type { ParametrosCalculoMuro, Material } from "../types/domain";
import Select from "../components/Select";

export default function MuroFormScreen({ navigation }: any) {
  // Cargar catálogo (desde storage o semilla)
  const materiales = useCatalogo((s) => s.materiales);
  const cargarSemilla = useCatalogo((s) => s.cargarSemilla);

  useEffect(() => {
    if (Object.keys(materiales).length === 0) {
      cargarSemilla();
    }
  }, [materiales, cargarSemilla]);

  // Helpers para armar opciones por categoría
  const byCat = (cat: Material["categoria"]) =>
    Object.values(materiales).filter((m) => m.categoria === cat);

  const opts = useMemo(() => {
    const placas = byCat("placa").map((m) => ({ label: m.nombre, value: m.id }));
    const perfiles = byCat("perfil");
    const montantes = perfiles
      .filter((m) => /montante/i.test(m.nombre) || /montante/i.test(m.id) || / C /i.test(m.nombre))
      .map((m) => ({ label: m.nombre, value: m.id }));
    const soleras = perfiles
      .filter((m) => /solera/i.test(m.nombre) || /solera/i.test(m.id) || / U /i.test(m.nombre))
      .map((m) => ({ label: m.nombre, value: m.id }));
    const tornillos = byCat("tornillo").map((m) => ({ label: m.nombre, value: m.id }));
    const masillas = byCat("compuesto").map((m) => ({ label: m.nombre, value: m.id }));
    const cintas = byCat("cinta").map((m) => ({ label: m.nombre, value: m.id }));

    return { placas, montantes, soleras, tornillos, masillas, cintas };
  }, [materiales]);

  // Estados numéricos (como string para TextInput)
  const [ancho, setAncho] = useState("3");   // m
  const [alto, setAlto] = useState("2.6");   // m
  const [sep, setSep] = useState<"400" | "600">("400");
  const [caras, setCaras] = useState<"1" | "2">("1");
  const [doblePlaca, setDoblePlaca] = useState(false);
  const [tornPorM2, setTornPorM2] = useState("25");

  // Selección de materiales (arrancan vacíos, se setean al primer elemento disponible)
  const [placaId, setPlacaId] = useState("");
  const [montanteId, setMontanteId] = useState("");
  const [soleraId, setSoleraId] = useState("");
  const [tornilloId, setTornilloId] = useState("");
  const [masillaId, setMasillaId] = useState("");
  const [cintaId, setCintaId] = useState("");

  // Cuando haya opciones disponibles, setear defaults si están vacíos
  useEffect(() => {
    if (!placaId && opts.placas[0]) setPlacaId(opts.placas[0].value);
    if (!montanteId && opts.montantes[0]) setMontanteId(opts.montantes[0].value);
    if (!soleraId && opts.soleras[0]) setSoleraId(opts.soleras[0].value);
    if (!tornilloId && opts.tornillos[0]) setTornilloId(opts.tornillos[0].value);
    // masilla y cinta son opcionales: permiten quedar vacías
  }, [opts, placaId, montanteId, soleraId, tornilloId]);

  function onCalcular() {
    const ancho_m = Number(ancho);
    const alto_m = Number(alto);
    const tornillos_por_m2 = Number(tornPorM2);

    if (!isFinite(ancho_m) || ancho_m <= 0) return Alert.alert("Validación", "Ancho inválido");
    if (!isFinite(alto_m) || alto_m <= 0) return Alert.alert("Validación", "Alto inválido");
    if (!isFinite(tornillos_por_m2) || tornillos_por_m2 <= 0)
      return Alert.alert("Validación", "Tornillos/m² inválido");

    if (!placaId || !montanteId || !soleraId || !tornilloId) {
      return Alert.alert("Validación", "Seleccioná placa, montante, solera y tornillo.");
    }

    const params: ParametrosCalculoMuro = {
      ancho_m,
      alto_m,
      separacion_montantes_mm: sep === "400" ? 400 : 600,
      doble_placa: doblePlaca,
      caras: caras === "1" ? 1 : 2,
      aberturas: [], // más adelante sumamos puertas/ventanas
      tornillos_por_m2,
    };

    const resultado = calcularMuro(params, materiales, {
      placa: placaId,
      montante: montanteId,
      solera: soleraId,
      tornillo: tornilloId,
      masilla: masillaId || undefined,
      cinta: cintaId || undefined,
    });

    navigation.navigate("Resultado", { resultado });
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Muro</Text>

      {/* Dimensiones y parámetros */}
      <Text style={styles.label}>Ancho (m)</Text>
      <TextInput
        style={styles.input}
        value={ancho}
        onChangeText={setAncho}
        keyboardType="decimal-pad"
        placeholder="Ej: 3"
      />

      <Text style={styles.label}>Alto (m)</Text>
      <TextInput
        style={styles.input}
        value={alto}
        onChangeText={setAlto}
        keyboardType="decimal-pad"
        placeholder="Ej: 2.6"
      />

      <Text style={styles.label}>Separación montantes (mm)</Text>
      <View style={styles.row}>
        <TouchableOpacity
          style={[styles.chip, sep === "400" && styles.chipActive]}
          onPress={() => setSep("400")}
        >
          <Text style={[styles.chipText, sep === "400" && styles.chipTextActive]}>400</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.chip, sep === "600" && styles.chipActive]}
          onPress={() => setSep("600")}
        >
          <Text style={[styles.chipText, sep === "600" && styles.chipTextActive]}>600</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.label}>Caras</Text>
      <View style={styles.row}>
        <TouchableOpacity
          style={[styles.chip, caras === "1" && styles.chipActive]}
          onPress={() => setCaras("1")}
        >
          <Text style={[styles.chipText, caras === "1" && styles.chipTextActive]}>1 cara</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.chip, caras === "2" && styles.chipActive]}
          onPress={() => setCaras("2")}
        >
          <Text style={[styles.chipText, caras === "2" && styles.chipTextActive]}>2 caras</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.switchRow}>
        <Text style={styles.labelInline}>Doble placa por cara</Text>
        <Switch value={doblePlaca} onValueChange={setDoblePlaca} />
      </View>

      <Text style={styles.label}>Tornillos por m²</Text>
      <TextInput
        style={styles.input}
        value={tornPorM2}
        onChangeText={setTornPorM2}
        keyboardType="number-pad"
        placeholder="Ej: 25"
      />

      {/* Selectores de materiales */}
      <Select label="Placa" value={placaId} onChange={setPlacaId} options={opts.placas} />
      <Select
        label="Montante (perfil C)"
        value={montanteId}
        onChange={setMontanteId}
        options={opts.montantes}
      />
      <Select
        label="Solera (perfil U)"
        value={soleraId}
        onChange={setSoleraId}
        options={opts.soleras}
      />
      <Select
        label="Tornillo"
        value={tornilloId}
        onChange={setTornilloId}
        options={opts.tornillos}
      />
      <Select
        label="Masilla (opcional)"
        value={masillaId}
        onChange={setMasillaId}
        options={[{ label: "—", value: "" }, ...opts.masillas]}
      />
      <Select
        label="Cinta (opcional)"
        value={cintaId}
        onChange={setCintaId}
        options={[{ label: "—", value: "" }, ...opts.cintas]}
      />

      <TouchableOpacity style={styles.btn} onPress={onCalcular}>
        <Text style={styles.btnText}>Calcular</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: "#f8fafc" },
  title: { fontSize: 22, fontWeight: "800", color: "#334155", marginBottom: 12 },
  label: { fontSize: 14, color: "#334155", marginTop: 8, marginBottom: 4 },
  labelInline: { fontSize: 14, color: "#334155" },
  input: {
    backgroundColor: "#fff",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#e2e8f0",
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 16,
  },
  row: { flexDirection: "row", gap: 8 },
  chip: {
    borderWidth: 1,
    borderColor: "#e2e8f0",
    borderRadius: 999,
    paddingHorizontal: 12,
    paddingVertical: 8,
    backgroundColor: "#fff",
  },
  chipActive: { backgroundColor: "#2563eb" },
  chipText: { color: "#334155" },
  chipTextActive: { color: "#fff", fontWeight: "700" },
  switchRow: {
    marginTop: 8,
    marginBottom: 8,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  btn: {
    marginTop: 16,
    backgroundColor: "#2563eb",
    padding: 14,
    borderRadius: 12,
    alignItems: "center",
  },
  btnText: { color: "#fff", fontWeight: "700" },
});



