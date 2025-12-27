import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  View,
  Text,
  Pressable,
  StyleSheet,
  TextInput,
  Platform,
  Alert,
} from "react-native";
import MapView, { Marker, Polyline, PROVIDER_GOOGLE, Region } from "react-native-maps";
import * as Location from "expo-location";

type Screen = "home" | "login" | "maps";

type PackageStop = {
  id: string;
  name: string;
  address: string;
  lat: number;
  lng: number;
  status: "nieuw" | "onderweg" | "geleverd" | "probleem";
};

type Courier = {
  id: string;
  name: string;
  lat: number;
  lng: number;
};

export default function App() {
  const [screen, setScreen] = useState<Screen>("home");

  return screen === "home" ? (
    <HomeScreen onLogin={() => setScreen("login")} onMaps={() => setScreen("maps")} />
  ) : screen === "login" ? (
    <LoginScreen onBack={() => setScreen("home")} onDone={() => setScreen("maps")} />
  ) : (
    <MapsScreen onBack={() => setScreen("home")} />
  );
}

function HomeScreen(props: { onLogin: () => void; onMaps: () => void }) {
  return (
    <View style={s.page}>
      <View style={s.overlay} />
      <View style={s.container}>
        <View style={s.header}>
          <View style={s.brandRow}>
            <View style={s.logo} />
            <Text style={s.brand}>Bouwapp</Text>
          </View>
          <Pressable style={s.headerBtn} onPress={props.onLogin}>
            <Text style={s.headerBtnText}>Inloggen</Text>
          </Pressable>
        </View>

        <View style={s.hero}>
          <Text style={s.h1}>Routeplanner</Text>
          <Text style={s.p}>Kaart met bezorgers en pakketten.</Text>

          <Pressable style={s.cta} onPress={props.onMaps}>
            <Text style={s.ctaText}>Open kaart</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
}

function LoginScreen(props: { onBack: () => void; onDone: () => void }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <View style={s.page}>
      <View style={s.overlay} />
      <View style={s.loginWrap}>
        <View style={s.card}>
          <Text style={s.loginTitle}>Inloggen</Text>

          <TextInput
            style={s.input}
            placeholder="E-mail"
            placeholderTextColor="rgba(0,0,0,0.4)"
            value={email}
            onChangeText={setEmail}
            autoCapitalize="none"
          />

          <TextInput
            style={s.input}
            placeholder="Wachtwoord"
            placeholderTextColor="rgba(0,0,0,0.4)"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />

          <Pressable style={s.loginBtn} onPress={props.onDone}>
            <Text style={s.loginBtnText}>Inloggen</Text>
          </Pressable>

          <Pressable onPress={props.onBack}>
            <Text style={s.backLink}>Terug</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
}

function MapsScreen(props: { onBack: () => void }) {
  const mapRef = useRef<MapView | null>(null);

  const [region, setRegion] = useState<Region>({
    latitude: 52.3676,
    longitude: 4.9041,
    latitudeDelta: 0.06,
    longitudeDelta: 0.06,
  });

  const [myPos, setMyPos] = useState<{ lat: number; lng: number } | null>(null);

  const courier: Courier = useMemo(
    () => ({
      id: "c1",
      name: "Bezorger 1",
      lat: myPos?.lat ?? 52.3676,
      lng: myPos?.lng ?? 4.9041,
    }),
    [myPos]
  );

  const stops: PackageStop[] = useMemo(
    () => [
      { id: "p1", name: "Pakket 1001", address: "Stop A", lat: 52.372, lng: 4.895, status: "onderweg" },
      { id: "p2", name: "Pakket 1002", address: "Stop B", lat: 52.361, lng: 4.920, status: "nieuw" },
      { id: "p3", name: "Pakket 1003", address: "Stop C", lat: 52.354, lng: 4.905, status: "geleverd" },
      { id: "p4", name: "Pakket 1004", address: "Stop D", lat: 52.377, lng: 4.930, status: "probleem" },
    ],
    []
  );

  const routeLine = useMemo(() => {
    const pts = [{ latitude: courier.lat, longitude: courier.lng }];
    for (const st of stops) pts.push({ latitude: st.lat, longitude: st.lng });
    return pts;
  }, [courier.lat, courier.lng, stops]);

  useEffect(() => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        Alert.alert("Locatie", "Geen locatie toestemming. Kaart werkt nog met standaard locatie.");
        return;
      }

      const loc = await Location.getCurrentPositionAsync({});
      const lat = loc.coords.latitude;
      const lng = loc.coords.longitude;

      setMyPos({ lat, lng });
      setRegion((r) => ({
        ...r,
        latitude: lat,
        longitude: lng,
      }));
    })();
  }, []);

  function fitAll() {
    const points = routeLine;
    if (!mapRef.current || points.length === 0) return;
    mapRef.current.fitToCoordinates(points, {
      edgePadding: { top: 80, right: 60, bottom: 220, left: 60 },
      animated: true,
    });
  }

  useEffect(() => {
    const t = setTimeout(() => fitAll(), 600);
    return () => clearTimeout(t);
  }, [routeLine]);

  return (
    <View style={s.mapPage}>
     <MapView
  ref={mapRef}
  style={StyleSheet.absoluteFill}
  provider={Platform.OS === "android" ? PROVIDER_GOOGLE : undefined}
  region={region}
  onRegionChangeComplete={setRegion}
>

        <Marker
          coordinate={{ latitude: courier.lat, longitude: courier.lng }}
          title={courier.name}
          description="Huidige locatie bezorger"
          pinColor="#2563EB"
        />

        {stops.map((st) => (
          <Marker
            key={st.id}
            coordinate={{ latitude: st.lat, longitude: st.lng }}
            title={st.name}
            description={`${st.address} • ${st.status}`}
            pinColor={pinColorFor(st.status)}
          />
        ))}

        <Polyline coordinates={routeLine} strokeWidth={4} strokeColor="#FFD400" />
      </MapView>

      <View style={s.mapTop}>
        <View style={s.mapTopLeft}>
          <Text style={s.mapTitle}>Routeplanner</Text>
          <Text style={s.mapSub}>Bezorger en pakketten op de kaart</Text>
        </View>

        <Pressable style={s.mapBtnGhost} onPress={props.onBack}>
          <Text style={s.mapBtnGhostText}>Terug</Text>
        </Pressable>
      </View>

      <View style={s.mapBottom}>
        <Pressable style={s.mapBtn} onPress={fitAll}>
          <Text style={s.mapBtnText}>Alles in beeld</Text>
        </Pressable>

        <View style={s.legendRow}>
          <LegendDot color="#2563EB" label="Bezorger" />
          <LegendDot color="#111827" label="Nieuw" />
          <LegendDot color="#FFD400" label="Onderweg" />
          <LegendDot color="#16A34A" label="Geleverd" />
          <LegendDot color="#DC2626" label="Probleem" />
        </View>
      </View>
    </View>
  );
}

function pinColorFor(status: PackageStop["status"]) {
  if (status === "nieuw") return "#111827";
  if (status === "onderweg") return "#FFD400";
  if (status === "geleverd") return "#16A34A";
  return "#DC2626";
}

function LegendDot(props: { color: string; label: string }) {
  return (
    <View style={s.legendItem}>
      <View style={[s.legendDot, { backgroundColor: props.color }]} />
      <Text style={s.legendText}>{props.label}</Text>
    </View>
  );
}

const s = StyleSheet.create({
  page: { flex: 1, backgroundColor: "#000" },
  overlay: { ...StyleSheet.absoluteFillObject, backgroundColor: "rgba(0,0,0,0.70)" },
  container: { flex: 1, padding: 20, justifyContent: "space-between" },
  header: { flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
  brandRow: { flexDirection: "row", alignItems: "center", gap: 10 },
  logo: { width: 36, height: 36, borderRadius: 10, backgroundColor: "#FFD400" },
  brand: { color: "#fff", fontSize: 18, fontWeight: "800" },

  headerBtn: { backgroundColor: "rgba(255,255,255,0.15)", paddingHorizontal: 14, paddingVertical: 10, borderRadius: 12 },
  headerBtnText: { color: "#fff", fontWeight: "700" },

  hero: { marginBottom: 80 },
  h1: { fontSize: 32, fontWeight: "900", color: "#fff" },
  p: { marginTop: 10, color: "rgba(255,255,255,0.75)" },
  cta: { marginTop: 18, backgroundColor: "#FFD400", paddingVertical: 14, borderRadius: 14, alignItems: "center" },
  ctaText: { fontWeight: "900", color: "#111" },

  loginWrap: { flex: 1, justifyContent: "center", padding: 20 },
  card: { backgroundColor: "#fff", borderRadius: 18, padding: 18 },
  loginTitle: { fontSize: 22, fontWeight: "900", marginBottom: 12, color: "#111827" },
  input: { height: 46, borderRadius: 12, borderWidth: 1, borderColor: "#e5e7eb", paddingHorizontal: 12, marginBottom: 12 },
  loginBtn: { backgroundColor: "#111", paddingVertical: 14, borderRadius: 12, alignItems: "center" },
  loginBtnText: { color: "#fff", fontWeight: "800" },
  backLink: { marginTop: 12, textAlign: "center", color: "#2563EB", fontWeight: "700" },

  mapPage: { flex: 1, backgroundColor: "#000" },
  mapTop: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    paddingTop: 44,
    paddingHorizontal: 14,
    paddingBottom: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "rgba(0,0,0,0.35)",
  },
  mapTopLeft: { flex: 1, paddingRight: 10 },
  mapTitle: { color: "#fff", fontSize: 18, fontWeight: "900" },
  mapSub: { marginTop: 3, color: "rgba(255,255,255,0.7)", fontSize: 12 },

  mapBtnGhost: { paddingHorizontal: 12, paddingVertical: 10, borderRadius: 12, backgroundColor: "rgba(255,255,255,0.12)" },
  mapBtnGhostText: { color: "#fff", fontWeight: "800", fontSize: 12 },

  mapBottom: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    paddingHorizontal: 14,
    paddingTop: 12,
    paddingBottom: 16,
    backgroundColor: "rgba(0,0,0,0.45)",
  },
  mapBtn: { height: 44, borderRadius: 14, backgroundColor: "#FFD400", alignItems: "center", justifyContent: "center" },
  mapBtnText: { fontWeight: "900", color: "#111827" },

  legendRow: { marginTop: 10, flexDirection: "row", flexWrap: "wrap", gap: 10 },
  legendItem: { flexDirection: "row", alignItems: "center", gap: 6 },
  legendDot: { width: 10, height: 10, borderRadius: 999 },
  legendText: { color: "rgba(255,255,255,0.75)", fontSize: 12, fontWeight: "700" },
});
