import { View, Text, StyleSheet } from "react-native";
import { Link } from "expo-router";

export default function Dashboard() {
  return (
    <View style={s.page}>
      <Text style={s.h}>Dashboard</Text>
      <Text style={s.p}>Hier komt straks organisatie of consument view.</Text>
      <Link href="/" style={s.link}>Terug</Link>
    </View>
  );
}

const s = StyleSheet.create({
  page: { flex: 1, padding: 18, backgroundColor: "#0B0B0F" },
  h: { color: "#FFFFFF", fontSize: 22, fontWeight: "900" },
  p: { marginTop: 8, color: "rgba(255,255,255,0.70)" },
  link: { marginTop: 14, color: "#FFD400", fontWeight: "800" },
});
