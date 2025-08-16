import React, { useMemo } from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import { useCatalogo } from "../store/catalogo";

export default function ResultadoScreen({ route }: any) {
  const resultado = route.params?.resultado;

  const materiales = useCatalogo((s) => s.materiales);
  const cargarSemilla = useCatalogo((s) => s.cargarSemilla);

  // Aseguramos tener el catálogo en memoria (por si se entra directo)
  useMemo(() => {
    if (Object.keys(materiales).length === 0) cargarSemilla();
  }, [materiales, cargarSemilla]);

  if (!resultado) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Resultado</Text>
        <Text style={styles.text}>No hay datos para mostrar.</Text>
      </View>
    );
  }

  const items = resultado.items ?? [];
  const detalle = resultado.detalle ?? [];

  // Helper: devuelve nombre del material o el id si no está
  const nombreDe = (id: string) => materiales[id]?.nombre ?? id;
  const unidadDe = (id: string) => materiales[id]?.unidad ?? "pieza";

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Resultado</Text>
      <Text style={styles.text}>m² cubiertos: {resultado.m2_cubiertos?.toFixed?.(2) ?? "—"}</Text>

      <Text style={styles.section}>Materiales</Text>
      <FlatList
        data={items}
        keyExtractor={(it, idx) => `${it.materialId}-${idx}`}
        ItemSeparatorComponent={() => <View style={styles.sep} />}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.matTitle}>{nombreDe(item.materialId)}</Text>
            <Text style={styles.matLine}>
              Cantidad: <Text style={styles.bold}>{item.cantidad}</Text> {unidadDe(item.materialId)}
            </Text>
            {item.nota ? <Text style={styles.muted}>{item.nota}</Text> : null}
          </View>
        )}
      />

      <Text style={styles.section}>Detalle de cálculo</Text>
      {detalle.map((d: string, i: number) => (
        <Text key={i} style={styles.muted}>• {d}</Text>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: "#f8fafc" },
  title: { fontSize: 22, fontWeight: "800", color: "#334155", marginBottom: 8 },
  text: { fontSize: 14, color: "#64748b", marginBottom: 12 },
  section: { fontSize: 16, fontWeight: "700", color: "#334155", marginTop: 12, marginBottom: 6 },
  sep: { height: 8 },
  card: { backgroundColor: "#fff", borderWidth: 1, borderColor: "#e2e8f0", borderRadius: 12, padding: 12 },
  matTitle: { fontSize: 14, fontWeight: "700", color: "#334155", marginBottom: 4 },
  matLine: { fontSize: 14, color: "#334155" },
  bold: { fontWeight: "700" },
  muted: { fontSize: 13, color: "#64748b", marginTop: 2 },
});
