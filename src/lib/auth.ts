import { cookies } from "next/headers";
import { type Role, users } from "./mock-data";

const ROLE_COOKIE = "dnre_role";
const USER_COOKIE = "dnre_user_id";

export async function getSession() {
  const store = await cookies();
  const role = (store.get(ROLE_COOKIE)?.value ?? null) as Role | null;
  const userId = store.get(USER_COOKIE)?.value ?? null;
  const user = userId ? users.find((u) => u.id === userId) : null;
  return { role, user };
}

export async function signIn(role: Role) {
  const store = await cookies();
  const defaults: Record<Role, string> = {
    applicant: "usr-101",
    officer: "usr-201",
    admin: "usr-301",
  };
  store.set(ROLE_COOKIE, role, { path: "/", httpOnly: false, sameSite: "lax" });
  store.set(USER_COOKIE, defaults[role], { path: "/", httpOnly: false, sameSite: "lax" });
}

export async function signOut() {
  const store = await cookies();
  store.delete(ROLE_COOKIE);
  store.delete(USER_COOKIE);
}
