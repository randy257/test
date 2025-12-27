import Link from "next/link";

export default function AuthLayout(props: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-zinc-50">
      <div className="mx-auto flex min-h-screen w-full max-w-md items-center px-6">
        <div className="w-full">
          <div className="mb-6 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-xl bg-yellow-400" />
              <div className="text-lg font-semibold tracking-tight text-black">Bouwapp</div>
            </div>
            <Link href="/" className="text-xs font-medium text-blue-600 hover:underline">
              Start
            </Link>
          </div>

          <div className="auth-card rounded-2xl border border-black/10 bg-white p-7">
            {props.children}
          </div>

          <div className="mt-5 text-center text-xs text-black/60">
            <Link className="hover:underline" href="/">
              Terug naar start
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
