"use server";

import { redirect } from "next/navigation";
import { signIn, signOut } from "@/lib/auth";
import { type Role } from "@/lib/mock-data";

export async function signInAs(role: Role) {
  await signIn(role);
  redirect("/portal/dashboard");
}

export async function signOutAction() {
  await signOut();
  redirect("/portal");
}
