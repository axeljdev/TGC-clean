import * as argon2 from "argon2";

export const hashPassword = async (password: string) => {
  try {
    const hash = await argon2.hash(password);
    return hash;
  } catch (err) {
    console.log(err);
  }
};

export const verifyPassword = async (
  password: string,
  hashedPassword: string
) => {
  return await argon2.verify(hashedPassword, password);
};
