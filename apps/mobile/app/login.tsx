import React, { useEffect, useRef, useState } from "react";
import { View, Text, TextInput, Pressable, StyleSheet, Animated, Easing, ImageSourcePropType } from "react-native";
import { Link, useRouter } from "expo-router";

const SCREW: ImageSourcePropType = require("../assets/screw.png");

export default function LoginScreen() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState<string | null>(null);

  async function onLogin() {
    setMsg(null);

    const e = email.trim();
    if (!e || !e.includes("@")) {
      setMsg("Vul een geldig e-mailadres in.");
      return;
    }
    if (password.trim().length < 6) {
      setMsg("Wachtwoord moet minimaal 6 tekens zijn.");
      return;
    }

    setBusy(true);
    try {
      await new Promise((r) => setTimeout(r, 500));
      router.replace("/dashboard");
    } finally {
      setBusy(false);
    }
  }

  return (
    <View style={styles.page}>
      <ScrewBackground />
      <View style={styles.overlay} />

      <View style={styles.container}>
        <View style={styles.topRow}>
          <View style={styles.brandLeft}>
            <View style={styles.logo} />
            <Text style={styles.brand}>Bouwapp</Text>
          </View>

          <Link href="/" asChild>
            <Pressable style={styles.topLinkBtn}>
              <Text style={styles.topLinkText}>Start</Text>
            </Pressable>
          </Link>
        </View>

        <View style={styles.card}>
          <View style={styles.cardHead}>
            <View>
              <Text style={styles.title}>Inloggen</Text>
              <Text style={styles.sub}>Gebruik je werkmail.</Text>
            </View>

            <View style={styles.badge}>
              <Text style={styles.badgeText}>Secure</Text>
            </View>
          </View>

          <View style={{ marginTop: 16, gap: 12 }}>
            <View>
              <Text style={styles.label}>E-mail</Text>
              <TextInput
                value={email}
                onChangeText={setEmail}
                placeholder="naam@bedrijf.nl"
                placeholderTextColor="rgba(17,24,39,0.45)"
                autoCapitalize="none"
                autoCorrect={false}
                keyboardType="email-address"
                style={styles.input}
              />
            </View>

            <View>
              <Text style={styles.label}>Wachtwoord</Text>
              <TextInput
                value={password}
                onChangeText={setPassword}
                placeholder="Wachtwoord"
                placeholderTextColor="rgba(17,24,39,0.45)"
                secureTextEntry
                style={styles.input}
              />
            </View>

            {msg ? (
              <View style={styles.note}>
                <Text style={styles.noteText}>{msg}</Text>
              </View>
            ) : null}

            <Pressable
              disabled={busy}
              onPress={onLogin}
              style={({ pressed }) => [
                styles.button,
                busy ? { opacity: 0.6 } : null,
                pressed ? { opacity: 0.9 } : null,
              ]}
            >
              <Text style={styles.buttonText}>{busy ? "Bezig..." : "Inloggen"}</Text>
            </Pressable>

            <View style={styles.linksRow}>
              <Link href="/forgot-password" asChild>
                <Pressable>
                  <Text style={styles.linkBlue}>Wachtwoord vergeten</Text>
                </Pressable>
              </Link>

              <Pressable onPress={() => setMsg("SSO voeg je later toe via OIDC")}>
                <Text style={styles.linkDark}>Login met SSO</Text>
              </Pressable>
            </View>

            <Text style={styles.small}>
              Door in te loggen accepteer je de voorwaarden en privacy policy.
            </Text>
          </View>
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
        duration: 11000,
        easing: Easing.inOut(Easing.quad),
        useNativeDriver: true,
      })
    ).start();
  }, [a]);

  const rot = a.interpolate({ inputRange: [0, 1], outputRange: ["0deg", "360deg"] });
  const floatY = a.interpolate({ inputRange: [0, 0.5, 1], outputRange: [0, -16, 0] });

  return (
    <View style={StyleSheet.absoluteFill}>
      <View style={styles.bgBase} />

      <Animated.Image
        source={SCREW}
        style={[styles.screw, { left: "10%", top: "16%", transform: [{ translateY: floatY }, { rotate: rot }] }]}
        resizeMode="contain"
      />
      <Animated.Image
        source={SCREW}
        style={[styles.screwSmall, { left: "78%", top: "18%", transform: [{ translateY: floatY }, { rotate: rot }] }]}
        resizeMode="contain"
      />
      <Animated.Image
        source={SCREW}
        style={[styles.screwBlue, { left: "18%", top: "72%", transform: [{ translateY: floatY }, { rotate: rot }] }]}
        resizeMode="contain"
      />
      <Animated.Image
        source={SCREW}
        style={[styles.screwTiny, { left: "86%", top: "66%", transform: [{ translateY: floatY }, { rotate: rot }] }]}
        resizeMode="contain"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  page: { flex: 1, backgroundColor: "#000000" },
  bgBase: { ...StyleSheet.absoluteFillObject, backgroundColor: "#000000" },
  overlay: { ...StyleSheet.absoluteFillObject, backgroundColor: "rgba(0,0,0,0.70)" },

  container: { flex: 1, paddingHorizontal: 18, paddingTop: 18, justifyContent: "center" },

  topRow: { position: "absolute", top: 18, left: 18, right: 18, flexDirection: "row", alignItems: "center", justifyContent: "space-between" },
  brandLeft: { flexDirection: "row", alignItems: "center", gap: 10 },
  logo: { width: 38, height: 38, borderRadius: 12, backgroundColor: "#FFD400" },
  brand: { fontSize: 16, fontWeight: "900", color: "#FFFFFF" },
  topLinkBtn: { paddingHorizontal: 10, paddingVertical: 8, borderRadius: 12, backgroundColor: "rgba(255,255,255,0.10)" },
  topLinkText: { fontSize: 12, fontWeight: "800", color: "#FFFFFF" },

  card: { borderRadius: 18, backgroundColor: "#FFFFFF", borderWidth: 1, borderColor: "rgba(0,0,0,0.08)", padding: 16 },
  cardHead: { flexDirection: "row", alignItems: "flex-start", justifyContent: "space-between", gap: 12 },
  title: { fontSize: 22, fontWeight: "900", color: "#111827" },
  sub: { marginTop: 6, fontSize: 13, color: "rgba(17,24,39,0.60)" },

  badge: { paddingHorizontal: 10, paddingVertical: 6, borderRadius: 999, backgroundColor: "rgba(37,99,235,0.10)" },
  badgeText: { fontSize: 12, fontWeight: "900", color: "#2563EB" },

  label: { fontSize: 12, fontWeight: "800", color: "#111827", marginBottom: 8 },
  input: { height: 46, borderRadius: 14, borderWidth: 1, borderColor: "rgba(0,0,0,0.10)", paddingHorizontal: 14, fontSize: 14, color: "#111827", backgroundColor: "#FFFFFF" },

  note: { borderRadius: 14, borderWidth: 1, borderColor: "rgba(255,212,0,0.45)", backgroundColor: "rgba(255,212,0,0.16)", paddingHorizontal: 12, paddingVertical: 10 },
  noteText: { fontSize: 13, color: "#111827" },

  button: { height: 46, borderRadius: 14, backgroundColor: "#111827", alignItems: "center", justifyContent: "center" },
  buttonText: { color: "#FFFFFF", fontSize: 14, fontWeight: "900" },

  linksRow: { marginTop: 8, flexDirection: "row", alignItems: "center", justifyContent: "space-between", gap: 12 },
  linkBlue: { fontSize: 12, fontWeight: "900", color: "#2563EB" },
  linkDark: { fontSize: 12, fontWeight: "900", color: "rgba(17,24,39,0.65)" },

  small: { marginTop: 12, fontSize: 11, lineHeight: 16, color: "rgba(17,24,39,0.55)", textAlign: "center" },

  screw: { position: "absolute", width: 56, height: 56, opacity: 0.35, tintColor: "#FFD400" },
  screwSmall: { position: "absolute", width: 40, height: 40, opacity: 0.28, tintColor: "#FFD400" },
  screwTiny: { position: "absolute", width: 26, height: 26, opacity: 0.22, tintColor: "#FFD400" },
  screwBlue: { position: "absolute", width: 48, height: 48, opacity: 0.25, tintColor: "#2563EB" },
});
