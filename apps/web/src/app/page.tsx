import Link from "next/link";

export default function HomePage() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-black text-white">
      <ScrewBackground />
      <div className="absolute inset-0 bg-black/70" />

      <div className="relative z-10 mx-auto w-full max-w-6xl px-6 py-10">
        <header className="flex items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-yellow-400" />
            <div>
              <div className="text-lg font-semibold tracking-tight">Bouwapp</div>
              <div className="text-xs text-white/60">Routes. Pakketten. Facturatie.</div>
            </div>
          </div>

          <nav className="hidden items-center gap-6 text-sm text-white/75 md:flex">
            <Link href="/pricing" className="hover:text-white">
              Tarieven
            </Link>
            <Link href="/contact" className="hover:text-white">
              Contact
            </Link>
            <Link href="/docs" className="hover:text-white">
              Docs
            </Link>
          </nav>

          <div className="flex items-center gap-3">
            <Link
              href="/login"
              className="rounded-xl bg-white/10 px-4 py-2 text-sm font-semibold hover:bg-white/15"
            >
              Inloggen
            </Link>
            <Link
              href="/contact"
              className="rounded-xl bg-yellow-400 px-4 py-2 text-sm font-semibold text-black hover:bg-yellow-300"
            >
              Demo
            </Link>
          </div>
        </header>

        <main className="mt-14 grid grid-cols-1 gap-10 lg:grid-cols-12 lg:items-start">
          <div className="lg:col-span-7">
            <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs">
              <span className="h-2 w-2 rounded-full bg-yellow-400" />
              Bouw, schilder, logistiek
            </div>

            <h1 className="mt-6 text-5xl font-semibold leading-tight">
              Planning en controle voor elke levering.
            </h1>

            <p className="mt-4 max-w-2xl text-sm leading-6 text-white/75">
              Plan routes, volg pakketten, beheer voorraad en maak facturen. Eén platform voor zzp, consumenten en organisaties.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/login"
                className="flex h-11 items-center justify-center rounded-xl bg-yellow-400 px-6 text-sm font-semibold text-black hover:bg-yellow-300"
              >
                Start nu
              </Link>
              <Link
                href="/contact"
                className="flex h-11 items-center justify-center rounded-xl border border-white/15 bg-white/5 px-6 text-sm font-semibold hover:bg-white/10"
              >
                Demo aanvragen
              </Link>
              <Link
                href="/pricing"
                className="flex h-11 items-center justify-center rounded-xl border border-white/15 bg-transparent px-6 text-sm font-semibold hover:bg-white/5"
              >
                Bekijk tarieven
              </Link>
            </div>

            <div className="mt-10 flex flex-wrap items-center gap-3 text-xs text-white/60">
              <span className="rounded-full bg-blue-600/15 px-3 py-1 text-blue-200">RBAC</span>
              <span className="rounded-full bg-blue-600/15 px-3 py-1 text-blue-200">Audit logs</span>
              <span className="rounded-full bg-blue-600/15 px-3 py-1 text-blue-200">API integraties</span>
              <span className="rounded-full bg-blue-600/15 px-3 py-1 text-blue-200">SSO later</span>
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
              <div className="text-sm font-semibold">Voor wie is het</div>

              <div className="mt-4 space-y-3">
                <AudienceCard
                  title="Organisaties"
                  text="Eigen bezorgers, meerdere planners, rollen en rapportages."
                  tag="Meerdere teams"
                />
                <AudienceCard
                  title="ZZP en kleine teams"
                  text="Snel routes plannen en status bijhouden, zonder gedoe."
                  tag="Snel starten"
                />
                <AudienceCard
                  title="Consumenten"
                  text="Eenvoudig levering plannen en tracken."
                  tag="Eenvoudig"
                />
              </div>

              <div className="mt-5 rounded-xl border border-white/10 bg-black/20 p-4">
                <div className="text-xs text-white/60">Tip</div>
                <div className="mt-1 text-sm">
                  Begin met 1 organisatie. Voeg daarna zzp en consumenten toe.
                </div>
              </div>
            </div>

            <div className="mt-4 rounded-2xl border border-white/10 bg-white/5 p-5">
              <div className="text-xs text-white/60">Trusted by</div>
              <div className="mt-3 flex flex-wrap items-center gap-2 text-xs">
                <span className="rounded-full bg-white/10 px-3 py-1">Installatie</span>
                <span className="rounded-full bg-white/10 px-3 py-1">Schilder</span>
                <span className="rounded-full bg-white/10 px-3 py-1">Bouw</span>
                <span className="rounded-full bg-white/10 px-3 py-1">Magazijn</span>
                <span className="rounded-full bg-white/10 px-3 py-1">Koerier</span>
              </div>
            </div>
          </div>

          <section className="lg:col-span-12">
            <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <Feature title="Routes" text="Overzicht, stops, toewijzing aan bezorgers." />
              <Feature title="Pakketten" text="Status, uitzonderingen, bewijs van levering." />
              <Feature title="Voorraad" text="Mutaties per order, inzicht per locatie." />
              <Feature title="Facturatie" text="Automatisch genereren en exporteren." />
            </div>

            <div className="mt-10 rounded-2xl border border-white/10 bg-white/5 p-6">
              <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <div className="text-lg font-semibold">Klaar om te starten</div>
                  <div className="mt-1 text-sm text-white/70">
                    Log in en bekijk de demo omgeving.
                  </div>
                </div>

                <div className="flex flex-wrap gap-3">
                  <Link
                    href="/login"
                    className="flex h-11 items-center justify-center rounded-xl bg-yellow-400 px-6 text-sm font-semibold text-black hover:bg-yellow-300"
                  >
                    Naar login
                  </Link>
                  <Link
                    href="/contact"
                    className="flex h-11 items-center justify-center rounded-xl border border-white/15 bg-white/5 px-6 text-sm font-semibold hover:bg-white/10"
                  >
                    Plan een demo call
                  </Link>
                </div>
              </div>
            </div>
          </section>
        </main>

        <footer className="mt-14 flex flex-wrap items-center gap-3 text-xs text-white/60">
          <span className="h-2 w-2 rounded-full bg-blue-600" />
          <span>Secure login</span>
          <span className="text-white/30">•</span>
          <span>RBAC</span>
          <span className="text-white/30">•</span>
          <span>Audit</span>
          <span className="text-white/30">•</span>
          <span>API</span>
        </footer>
      </div>
    </div>
  );
}

function Feature(props: { title: string; text: string }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
      <div className="text-sm font-semibold">{props.title}</div>
      <div className="mt-1 text-xs text-white/70">{props.text}</div>
    </div>
  );
}

function AudienceCard(props: { title: string; text: string; tag: string }) {
  return (
    <div className="rounded-xl border border-white/10 bg-black/15 p-4">
      <div className="flex items-start justify-between gap-3">
        <div>
          <div className="text-sm font-semibold">{props.title}</div>
          <div className="mt-1 text-xs text-white/70">{props.text}</div>
        </div>
        <div className="rounded-full bg-blue-600/15 px-3 py-1 text-xs text-blue-200">
          {props.tag}
        </div>
      </div>
    </div>
  );
}

function ScrewBackground() {
  return (
    <div className="screw-bg">
      <img src="/screw.svg" alt="" className="screw" style={{ left: "7%", top: "16%" }} />
      <img src="/screw.svg" alt="" className="screw blue" style={{ left: "22%", top: "62%" }} />
      <img src="/screw.svg" alt="" className="screw small" style={{ left: "46%", top: "26%" }} />
      <img src="/screw.svg" alt="" className="screw blue small" style={{ left: "58%", top: "72%" }} />
      <img src="/screw.svg" alt="" className="screw" style={{ left: "80%", top: "14%" }} />
      <img src="/screw.svg" alt="" className="screw blue" style={{ left: "90%", top: "50%" }} />
      <img src="/screw.svg" alt="" className="screw tiny" style={{ left: "66%", top: "10%" }} />
      <img src="/screw.svg" alt="" className="screw tiny" style={{ left: "14%", top: "42%" }} />
    </div>
  );
}
