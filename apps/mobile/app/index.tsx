import React, { useEffect, useRef } from "react";
import { View, Text, Pressable, StyleSheet, Animated, Easing, ImageSourcePropType } from "react-native";
import { Link } from "expo-router";

const SCREW: ImageSourcePropType = require("../assets/screw.png");

export default function HomeScreen() {
  return (
    <View style={styles.page}>
      <ScrewBackground />

      <View style={styles.overlay} />

      <View style={styles.container}>
        <View style={styles.header}>
          <View style={styles.brandLeft}>
            <View style={styles.logo} />
            <View>
              <Text style={styles.brand}>Bouwapp</Text>
              <Text style={styles.brandSub}>Routes. Pakketten. Facturatie.</Text>
            </View>
          </View>

          <View style={styles.headerRight}>
            <Link href="/login" asChild>
              <Pressable style={styles.headerBtnGhost}>
                <Text style={styles.headerBtnGhostText}>Inloggen</Text>
              </Pressable>
            </Link>

            <Link href="/contact" asChild>
              <Pressable style={styles.headerBtnYellow}>
                <Text style={styles.headerBtnYellowText}>Demo</Text>
              </Pressable>
            </Link>
          </View>
        </View>

        <View style={styles.hero}>
          <View style={styles.pill}>
            <View style={styles.pillDot} />
            <Text style={styles.pillText}>Bouw, schilder, logistiek</Text>
          </View>

          <Text style={styles.h1}>Planning en controle voor elke levering.</Text>

          <Text style={styles.p}>
            Plan routes, volg pakketten, beheer voorraad en maak facturen. Eén platform voor zzp, consumenten en organisaties.
          </Text>

          <View style={styles.ctaRow}>
            <Link href="/login" asChild>
              <Pressable style={styles.ctaPrimary}>
                <Text style={styles.ctaPrimaryText}>Start nu</Text>
              </Pressable>
            </Link>

            <Link href="/pricing" asChild>
              <Pressable style={styles.ctaGhost}>
                <Text style={styles.ctaGhostText}>Tarieven</Text>
              </Pressable>
            </Link>
          </View>

          <View style={styles.chipsRow}>
            <Chip text="RBAC" />
            <Chip text="Audit logs" />
            <Chip text="API integraties" />
            <Chip text="SSO later" />
          </View>
        </View>

        <View style={styles.cardsGrid}>
          <Card title="Routes" text="Overzicht, stops, toewijzing aan bezorgers." />
          <Card title="Pakketten" text="Status, uitzonderingen, bewijs van levering." />
          <Card title="Voorraad" text="Mutaties per order, inzicht per locatie." />
          <Card title="Facturatie" text="Automatisch genereren en exporteren." />
        </View>

        <View style={styles.footerRow}>
          <View style={styles.footerDot} />
          <Text style={styles.footerText}>Secure login</Text>
          <Text style={styles.footerSep}>•</Text>
          <Text style={styles.footerText}>RBAC</Text>
          <Text style={styles.footerSep}>•</Text>
          <Text style={styles.footerText}>Audit</Text>
          <Text style={styles.footerSep}>•</Text>
          <Text style={styles.footerText}>API</Text>
        </View>
      </View>
    </View>
  );
}

function Chip(props: { text: string }) {
  return (
    <View style={styles.chip}>
      <Text style={styles.chipText}>{props.text}</Text>
    </View>
  );
}

function Card(props: { title: string; text: string }) {
  return (
    <View style={styles.card}>
      <Text style={styles.cardTitle}>{props.title}</Text>
      <Text style={styles.cardText}>{props.text}</Text>
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
        easing: Easing.inOut(Easing.quad),
        useNativeDriver: true,
      })
    ).start();
  }, [a]);

  const rot = a.interpolate({ inputRange: [0, 1], outputRange: ["0deg", "360deg"] });
  const floatY = a.interpolate({ inputRange: [0, 0.5, 1], outputRange: [0, -18, 0] });

  return (
    <View style={StyleSheet.absoluteFill}>
      <View style={styles.bgBase} />

      <Animated.Image
        source={SCREW}
        style={[styles.screw, { left: "8%", top: "14%", transform: [{ translateY: floatY }, { rotate: rot }] }]}
        resizeMode="contain"
      />
      <Animated.Image
        source={SCREW}
        style={[styles.screwSmall, { left: "78%", top: "18%", transform: [{ translateY: floatY }, { rotate: rot }] }]}
        resizeMode="contain"
      />
      <Animated.Image
        source={SCREW}
        style={[styles.screwBlue, { left: "16%", top: "66%", transform: [{ translateY: floatY }, { rotate: rot }] }]}
        resizeMode="contain"
      />
      <Animated.Image
        source={SCREW}
        style={[styles.screwTiny, { left: "88%", top: "64%", transform: [{ translateY: floatY }, { rotate: rot }] }]}
        resizeMode="contain"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  page: { flex: 1, backgroundColor: "#000000" },
  bgBase: { ...StyleSheet.absoluteFillObject, backgroundColor: "#000000" },
  overlay: { ...StyleSheet.absoluteFillObject, backgroundColor: "rgba(0,0,0,0.70)" },

  container: { flex: 1, paddingHorizontal: 18, paddingTop: 18, paddingBottom: 18 },

  header: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", gap: 12 },
  brandLeft: { flexDirection: "row", alignItems: "center", gap: 10 },
  logo: { width: 38, height: 38, borderRadius: 12, backgroundColor: "#FFD400" },
  brand: { fontSize: 16, fontWeight: "800", color: "#FFFFFF" },
  brandSub: { marginTop: 2, fontSize: 12, color: "rgba(255,255,255,0.65)" },

  headerRight: { flexDirection: "row", alignItems: "center", gap: 10 },
  headerBtnGhost: { paddingHorizontal: 12, paddingVertical: 10, borderRadius: 12, backgroundColor: "rgba(255,255,255,0.10)" },
  headerBtnGhostText: { fontSize: 12, fontWeight: "800", color: "#FFFFFF" },
  headerBtnYellow: { paddingHorizontal: 12, paddingVertical: 10, borderRadius: 12, backgroundColor: "#FFD400" },
  headerBtnYellowText: { fontSize: 12, fontWeight: "900", color: "#111827" },

  hero: { marginTop: 22 },
  pill: { alignSelf: "flex-start", flexDirection: "row", alignItems: "center", gap: 8, paddingHorizontal: 10, paddingVertical: 6, borderRadius: 999, backgroundColor: "rgba(255,255,255,0.10)" },
  pillDot: { width: 8, height: 8, borderRadius: 999, backgroundColor: "#FFD400" },
  pillText: { fontSize: 12, fontWeight: "700", color: "#FFFFFF" },

  h1: { marginTop: 14, fontSize: 34, lineHeight: 40, fontWeight: "900", color: "#FFFFFF" },
  p: { marginTop: 10, fontSize: 13, lineHeight: 20, color: "rgba(255,255,255,0.75)" },

  ctaRow: { marginTop: 14, flexDirection: "row", flexWrap: "wrap", gap: 10 },
  ctaPrimary: { height: 44, paddingHorizontal: 16, borderRadius: 14, backgroundColor: "#FFD400", alignItems: "center", justifyContent: "center" },
  ctaPrimaryText: { fontSize: 13, fontWeight: "900", color: "#111827" },
  ctaGhost: { height: 44, paddingHorizontal: 16, borderRadius: 14, borderWidth: 1, borderColor: "rgba(255,255,255,0.15)", backgroundColor: "rgba(255,255,255,0.05)", alignItems: "center", justifyContent: "center" },
  ctaGhostText: { fontSize: 13, fontWeight: "900", color: "#FFFFFF" },

  chipsRow: { marginTop: 12, flexDirection: "row", flexWrap: "wrap", gap: 8 },
  chip: { paddingHorizontal: 10, paddingVertical: 6, borderRadius: 999, backgroundColor: "rgba(37,99,235,0.15)" },
  chipText: { fontSize: 12, fontWeight: "800", color: "rgba(191,219,254,1)" },

  cardsGrid: { marginTop: 16, flexDirection: "row", flexWrap: "wrap", gap: 10 },
  card: { width: "48%", minWidth: 160, borderRadius: 16, borderWidth: 1, borderColor: "rgba(255,255,255,0.10)", backgroundColor: "rgba(255,255,255,0.05)", padding: 12 },
  cardTitle: { fontSize: 13, fontWeight: "900", color: "#FFFFFF" },
  cardText: { marginTop: 6, fontSize: 12, lineHeight: 18, color: "rgba(255,255,255,0.70)" },

  footerRow: { marginTop: "auto", paddingTop: 14, flexDirection: "row", flexWrap: "wrap", alignItems: "center", gap: 8 },
  footerDot: { width: 8, height: 8, borderRadius: 999, backgroundColor: "#2563EB" },
  footerText: { fontSize: 12, color: "rgba(255,255,255,0.60)" },
  footerSep: { fontSize: 12, color: "rgba(255,255,255,0.30)" },

  screw: { position: "absolute", width: 56, height: 56, opacity: 0.35, tintColor: "#FFD400" },
  screwSmall: { position: "absolute", width: 40, height: 40, opacity: 0.28, tintColor: "#FFD400" },
  screwTiny: { position: "absolute", width: 26, height: 26, opacity: 0.22, tintColor: "#FFD400" },
  screwBlue: { position: "absolute", width: 48, height: 48, opacity: 0.25, tintColor: "#2563EB" },
});
