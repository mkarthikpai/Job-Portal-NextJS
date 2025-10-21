"use server";

import { db } from "@/config/db";
import { users } from "@/drizzle/schema";
import argon2 from "argon2";

export const registrationAction = async (data: {
  name: string;
  userName: string;
  email: string;
  password: string;
  role: "applicant" | "employer";
}) => {
  //   console.log(formData.get("name"));
  //   console.log(Object.fromEntries(formData.entries()));
  const { name, userName, email, password, role } = data;

  // Hashing Password
  const hashPassword = await argon2.hash(password);

  // Inserting To DB
  await db
    .insert(users)
    .values({ name, userName, email, password: hashPassword, role });
};
