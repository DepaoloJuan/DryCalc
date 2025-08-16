import React, { useEffect } from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import { useCatalogo } from "../store/catalogo";

export default function CatalogoScreen() {
  const materiales = useCatalogo((s) => s.materiales);
  const cargarSemilla = useCatalogo((s) => s.cargarSemilla);

  useEffect(() => {
    cargarSemilla();
  }, [cargarSemilla]);

  const data = Object.values(materiales);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Catálogo</Text>
      {data.length === 0 ? (
        <Text style={styles.text}>Sin materiales todavía.</Text>
      ) : (
        <FlatList
          data={data}
          keyExtractor={(item) => item.id}
          ItemSeparatorComponent={() => <View style={styles.separator} />}
          renderItem={({ item }) => (
            <View style={styles.item}>
              <Text style={styles.itemTitle}>{item.nombre}</Text>
              <Text style={styles.itemSub}>
                {item.categoria} · unidad: {item.unidad}
                {item.largo_mm ? ` · largo: ${item.largo_mm} mm` : ""}
                {item.ancho_mm ? ` · ancho: ${item.ancho_mm} mm` : ""}
                {item.espesor_mm ? ` · espesor: ${item.espesor_mm} mm` : ""}
                {typeof item.cobertura_m2 === "number" ? ` · cobertura: ${item.cobertura_m2} m²` : ""}
                {" · desperdicio: "}{item.desperdicio_pct}%
              </Text>
            </View>
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: "#f8fafc" },
  title: { fontSize: 22, fontWeight: "800", color: "#334155", marginBottom: 12 },
  text: { fontSize: 14, color: "#64748b" },
  separator: { height: 8 },
  item: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 12,
    borderWidth: 1,
    borderColor: "#e2e8f0",
  },
  itemTitle: { fontSize: 16, fontWeight: "700", color: "#334155", marginBottom: 4 },
  itemSub: { fontSize: 13, color: "#64748b" },
});
