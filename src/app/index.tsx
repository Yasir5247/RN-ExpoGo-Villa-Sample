import { Link } from "expo-router";
import { ScrollView, Text, View, StyleSheet } from "react-native";

/**
 * INDEX SCREEN — UI with Flexbox (StyleSheet)
 * Shows how flex lays out children without hard-coded positions.
 */
export default function ScreenOne() {
  return (
    <ScrollView contentContainerStyle={styles.page}>
      <Text style={styles.title}>Flex Layout</Text>
      <Text style={styles.subtitle}>
        Designed with StyleSheet + flex. No NativeWind on this screen.
      </Text>

      {/* Row: space between */}
      <Text style={styles.label}>flexDirection: "row" + space-between</Text>
      <View style={styles.rowBetween}>
        <View style={[styles.box, styles.boxBlue]}>
          <Text style={styles.boxText}>A</Text>
        </View>
        <View style={[styles.box, styles.boxGreen]}>
          <Text style={styles.boxText}>B</Text>
        </View>
        <View style={[styles.box, styles.boxOrange]}>
          <Text style={styles.boxText}>C</Text>
        </View>
      </View>

      {/* Flex grow ratios */}
      <Text style={styles.label}>flex: 1 / 2 / 1 — share horizontal space</Text>
      <View style={styles.row}>
        <View style={[styles.flexBox, { flex: 1, backgroundColor: "#2563EB" }]}>
          <Text style={styles.boxText}>flex: 1</Text>
        </View>
        <View style={[styles.flexBox, { flex: 1, backgroundColor: "#16A34A" }]}>
          <Text style={styles.boxText}>flex: 2</Text>
        </View>
        <View style={[styles.flexBox, { flex: 1, backgroundColor: "#EA580C" }]}>
          <Text style={styles.boxText}>flex: 1</Text>
        </View>
      </View>

      {/* Centered card */}
      <Text style={styles.label}>justifyContent + alignItems: center</Text>
      <View style={styles.centerBox}>
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Centered Card</Text>
          <Text style={styles.cardBody}>
            Parent uses flex: 1, justifyContent: "center", alignItems: "center"
          </Text>
        </View>
      </View>

      {/* Column with gap */}
      <Text style={styles.label}>flexDirection: "column" + gap</Text>
      <View style={styles.column}>
        <View style={[styles.listItem, { backgroundColor: "#DBEAFE" }]}>
          <Text>Item 1</Text>
        </View>
        <View style={[styles.listItem, { backgroundColor: "#DCFCE7" }]}>
          <Text>Item 2</Text>
        </View>
        <View style={[styles.listItem, { backgroundColor: "#FFEDD5" }]}>
          <Text>Item 3</Text>
        </View>
      </View>

      <Link href="/details" style={styles.link}>
        Open Details (NativeWind) →
      </Link>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  page: {
    padding: 20,
    paddingBottom: 40,
    gap: 12,
    backgroundColor: "#F4F4F5",
  },
  title: {
    fontSize: 26,
    fontWeight: "800",
    color: "#111",
  },
  subtitle: {
    fontSize: 14,
    lineHeight: 20,
    color: "#52525B",
    marginBottom: 8,
  },
  label: {
    marginTop: 8,
    fontSize: 12,
    fontWeight: "700",
    color: "#71717A",
    textTransform: "uppercase",
    letterSpacing: 0.4,
  },
  rowBetween: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  row: {
    flexDirection: "row",
    gap: 10,
  },
  box: {
    width: 64,
    height: 64,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  boxBlue: { backgroundColor: "#2563EB" },
  boxGreen: { backgroundColor: "#16A34A" },
  boxOrange: { backgroundColor: "#EA580C" },
  boxText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 13,
  },
  flexBox: {
    height: 56,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  centerBox: {
    height: 140,
    borderRadius: 12,
    backgroundColor: "#E4E4E7",
    justifyContent: "center",
    alignItems: "center",
  },
  card: {
    width: "80%",
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    gap: 6,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#111",
  },
  cardBody: {
    fontSize: 13,
    color: "#52525B",
    lineHeight: 18,
  },
  column: {
    borderWidth: 1,
    borderColor: "#000",
    flexDirection: "column", // important part
    borderRadius: 12,
    padding: 10,
    gap: 8,
  },
  listItem: {
    padding: 14,
    borderRadius: 10,
  },
  link: {
    marginTop: 16,
    color: "#007AFF",
    fontSize: 16,
    fontWeight: "600",
  },
});
