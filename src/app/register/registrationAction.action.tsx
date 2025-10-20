"use server";

export const registrationAction = async (formData: FormData) => {
  //   console.log(formData.get("name"));
  //   console.log(Object.fromEntries(formData.entries()));
  const { name, userName, email, password, confirmPassword, role } =
    Object.fromEntries(formData.entries());
};
