type User = {
  id: string;
  email: string;
  password: string;
  emailVerified: boolean;
  createdAt: number;
};

type TokenRecord = {
  token: string;
  userId: string;
  expiresAt: number;
};

const users = new Map<string, User>();
const verifyTokens = new Map<string, TokenRecord>();
const resetTokens = new Map<string, TokenRecord>();

function now() {
  return Date.now();
}

function randomToken() {
  return crypto.randomUUID().replaceAll("-", "");
}

function expiryMs(minutes: number) {
  return now() + minutes * 60 * 1000;
}

function getUserByEmail(email: string) {
  const e = email.toLowerCase().trim();
  for (const u of users.values()) {
    if (u.email === e) return u;
  }
  return null;
}

export const DevAuthStore = {
  ensureSeedUser() {
    if (users.size > 0) return;

    const id = crypto.randomUUID();
    users.set(id, {
      id,
      email: "admin@bouwapp.local",
      password: "Admin123!",
      emailVerified: true,
      createdAt: now(),
    });

    const id2 = crypto.randomUUID();
    users.set(id2, {
      id: id2,
      email: "user@bouwapp.local",
      password: "User123!",
      emailVerified: false,
      createdAt: now(),
    });
  },

  login(email: string, password: string) {
    this.ensureSeedUser();

    const u = getUserByEmail(email);
    if (!u || u.password !== password) {
      return { ok: false as const, error: "Ongeldige inloggegevens" };
    }
    if (!u.emailVerified) {
      return { ok: false as const, error: "Je e-mail is nog niet geverifieerd" };
    }
    return { ok: true as const, user: { id: u.id, email: u.email } };
  },

  requestPasswordReset(email: string) {
    this.ensureSeedUser();

    const u = getUserByEmail(email);
    if (!u) {
      return { ok: true as const, message: "Als dit e-mailadres bestaat, sturen we een link." };
    }

    const token = randomToken();
    resetTokens.set(token, { token, userId: u.id, expiresAt: expiryMs(30) });

    return { ok: true as const, token };
  },

  resetPassword(token: string, newPassword: string) {
    this.ensureSeedUser();

    const rec = resetTokens.get(token);
    if (!rec) return { ok: false as const, error: "Reset link is ongeldig" };
    if (rec.expiresAt < now()) {
      resetTokens.delete(token);
      return { ok: false as const, error: "Reset link is verlopen" };
    }

    const u = users.get(rec.userId);
    if (!u) return { ok: false as const, error: "Gebruiker bestaat niet" };

    users.set(u.id, { ...u, password: newPassword });
    resetTokens.delete(token);

    return { ok: true as const };
  },

  requestEmailVerification(email: string) {
    this.ensureSeedUser();

    const u = getUserByEmail(email);
    if (!u) return { ok: true as const };

    const token = randomToken();
    verifyTokens.set(token, { token, userId: u.id, expiresAt: expiryMs(60) });
    return { ok: true as const, token };
  },

  verifyEmail(token: string) {
    this.ensureSeedUser();

    const rec = verifyTokens.get(token);
    if (!rec) return { ok: false as const, error: "Verificatie link is ongeldig" };
    if (rec.expiresAt < now()) {
      verifyTokens.delete(token);
      return { ok: false as const, error: "Verificatie link is verlopen" };
    }

    const u = users.get(rec.userId);
    if (!u) return { ok: false as const, error: "Gebruiker bestaat niet" };

    users.set(u.id, { ...u, emailVerified: true });
    verifyTokens.delete(token);

    return { ok: true as const };
  },

  devListUsers() {
    this.ensureSeedUser();
    return Array.from(users.values()).map((u) => ({
      id: u.id,
      email: u.email,
      emailVerified: u.emailVerified,
      createdAt: u.createdAt,
    }));
  },
};
