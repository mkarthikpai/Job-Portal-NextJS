"use server";

import { db } from "@/config/db";
import { users } from "@/drizzle/schema";
import argon2 from "argon2";
import { eq, or } from "drizzle-orm";

export const registrationAction = async (data: {
  name: string;
  userName: string;
  email: string;
  password: string;
  role: "applicant" | "employer";
}) => {
  try {
    //   console.log(formData.get("name"));
    //   console.log(Object.fromEntries(formData.entries()));
    const { name, userName, email, password, role } = data;

    const [user] = await db
      .select()
      .from(users)
      .where(or(eq(users.email, email), eq(users.userName, userName)));

    if (user) {
      if (user.email === email) {
        return { status: "ERROR", message: "Email Already Exists" };
      } else return { status: "ERROR", message: "Username Already Exists" };
    }

    // Hashing Password
    const hashPassword = await argon2.hash(password);

    // Inserting To DB
    await db
      .insert(users)
      .values({ name, userName, email, password: hashPassword, role });
    return {
      status: "SUCCESS",
      message: "Registration Completed Successfully",
    };
  } catch (error) {
    return {
      status: "ERROR",
      message: "Unknown Error Occured!, Please Try Again",
    };
  }
};
