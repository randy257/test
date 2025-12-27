import React, { useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  Pressable,
  StyleSheet,
  Animated,
  Easing,
  TextInput,
} from "react-native";

export default function App() {
  const [screen, setScreen] = useState<"home" | "login">("home");

  return screen === "home" ? (
    <HomeScreen onLogin={() => setScreen("login")} />
  ) : (
    <LoginScreen onBack={() => setScreen("home")} />
  );
}

function HomeScreen(props: { onLogin: () => void }) {
  return (
    <View style={styles.page}>
      <ScrewBackground />
      <View style={styles.overlay} />

      <View style={styles.container}>
        <View style={styles.header}>
          <View style={styles.brandRow}>
            <View style={styles.logo} />
            <Text style={styles.brand}>Bouwapp</Text>
          </View>

          <Pressable style={styles.headerBtn} onPress={props.onLogin}>
            <Text style={styles.headerBtnText}>Inloggen</Text>
          </Pressable>
        </View>

        <View style={styles.hero}>
          <Text style={styles.h1}>
            Planning en controle in één systeem.
          </Text>

          <Text style={styles.p}>
            Routes, pakketten, voorraad en facturatie. Voor zzp en organisaties.
          </Text>

          <Pressable style={styles.cta} onPress={props.onLogin}>
            <Text style={styles.ctaText}>Start nu</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
}

function LoginScreen(props: { onBack: () => void }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <View style={styles.page}>
      <ScrewBackground />
      <View style={styles.overlay} />

      <View style={styles.loginWrap}>
        <View style={styles.card}>
          <Text style={styles.loginTitle}>Inloggen</Text>

          <TextInput
            style={styles.input}
            placeholder="E-mail"
            placeholderTextColor="rgba(0,0,0,0.4)"
            value={email}
            onChangeText={setEmail}
            autoCapitalize="none"
          />

          <TextInput
            style={styles.input}
            placeholder="Wachtwoord"
            placeholderTextColor="rgba(0,0,0,0.4)"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />

          <Pressable style={styles.loginBtn}>
            <Text style={styles.loginBtnText}>Inloggen</Text>
          </Pressable>

          <Pressable onPress={props.onBack}>
            <Text style={styles.backLink}>Terug</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
}

function ScrewBackground() {
  const a = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.timing(a, {
        toValue: 1,
        duration: 12000,
        easing: Easing.linear,
        useNativeDriver: true,
      })
    ).start();
  }, [a]);

  const rot = a.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "360deg"],
  });

  return (
    <Animated.Image
      source={require("./assets/screw.png")}
      style={[
        styles.screw,
        { transform: [{ rotate: rot }] },
      ]}
    />
  );
}

const styles = StyleSheet.create({
  page: { flex: 1, backgroundColor: "#000" },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.65)",
  },

  container: { flex: 1, padding: 20, justifyContent: "space-between" },
  header: { flexDirection: "row", justifyContent: "space-between" },
  brandRow: { flexDirection: "row", alignItems: "center", gap: 10 },
  logo: { width: 36, height: 36, borderRadius: 10, backgroundColor: "#FFD400" },
  brand: { color: "#fff", fontSize: 18, fontWeight: "800" },

  headerBtn: {
    backgroundColor: "rgba(255,255,255,0.15)",
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 12,
  },
  headerBtnText: { color: "#fff", fontWeight: "700" },

  hero: { marginBottom: 80 },
  h1: { fontSize: 32, fontWeight: "900", color: "#fff" },
  p: { marginTop: 10, color: "rgba(255,255,255,0.75)" },

  cta: {
    marginTop: 18,
    backgroundColor: "#FFD400",
    paddingVertical: 14,
    borderRadius: 14,
    alignItems: "center",
  },
  ctaText: { fontWeight: "900", color: "#111" },

  loginWrap: { flex: 1, justifyContent: "center", padding: 20 },
  card: {
    backgroundColor: "#fff",
    borderRadius: 18,
    padding: 18,
  },
  loginTitle: { fontSize: 22, fontWeight: "900", marginBottom: 12 },
  input: {
    height: 46,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#e5e7eb",
    paddingHorizontal: 12,
    marginBottom: 12,
  },
  loginBtn: {
    backgroundColor: "#111",
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: "center",
  },
  loginBtnText: { color: "#fff", fontWeight: "800" },
  backLink: {
    marginTop: 12,
    textAlign: "center",
    color: "#2563eb",
    fontWeight: "700",
  },

  screw: {
    position: "absolute",
    width: 220,
    height: 220,
    opacity: 0.25,
    top: "20%",
    left: "25%",
    tintColor: "#FFD400",
  },
});
