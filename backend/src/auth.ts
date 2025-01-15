import Cookies from "cookies";
import { AuthChecker } from "type-graphql";
import { User } from "./entities/User";
import { verify as jwtVerify } from "jsonwebtoken";

export type ContextType = {
  req: any;
  res: any;
  user: User | null | undefined;
};

export type AuthContextType = ContextType & {
  user: User;
};

export async function getUserFromContext(
  context: AuthContextType
): Promise<User | null> {
  const cookies = new Cookies(context.req, context.res);
  const token = cookies.get("token");

  if (!token) {
    console.log("No token found in cookies");
    return null;
  }
  try {
    const payload = jwtVerify(token, process.env.JWT_SECRET) as unknown as {
      id: number;
    };
    console.log("Token is valid");
    const user = await User.findOneBy({ id: payload.id });
    return user;
  } catch (error) {
    console.log("Invalid token");
    return null;
  }
}

export const authChecker: AuthChecker<ContextType> = async (
  { root, args, context, info },
  roles
) => {
  const user = await getUserFromContext(context);
  context.user = user;
  if (!user) {
    return false;
  }
  return true;
};
