import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

export default function HomeScreen({ navigation }: any) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>DryCalc</Text>
      <Text style={styles.subtitle}>Calculadora de materiales (MVP)</Text>

      <TouchableOpacity style={styles.card} onPress={() => navigation.navigate("MuroForm")}>
        <Text style={styles.cardTitle}>Muro</Text>
        <Text style={styles.cardText}>Ingresá medidas y parámetros (próximo paso).</Text>
      </TouchableOpacity>

      <TouchableOpacity style={[styles.card, styles.disabled]} disabled>
        <Text style={styles.cardTitle}>Cielorraso (próximamente)</Text>
        <Text style={styles.cardText}>Aún no disponible.</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.card} onPress={() => navigation.navigate("Catalogo")}>
        <Text style={styles.cardTitle}>Catálogo</Text>
        <Text style={styles.cardText}>Materiales estándar (placeholder).</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: "#f8fafc" },
  title: { fontSize: 28, fontWeight: "800", color: "#334155", marginBottom: 4 },
  subtitle: { fontSize: 14, color: "#64748b", marginBottom: 16 },
  card: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#e2e8f0",
  },
  disabled: { opacity: 0.6 },
  cardTitle: { fontSize: 18, fontWeight: "700", color: "#334155", marginBottom: 4 },
  cardText: { fontSize: 14, color: "#64748b" },
});
