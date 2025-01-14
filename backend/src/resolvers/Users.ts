import { Resolver, Arg, Mutation, Ctx } from "type-graphql";
import { CreateUserInput, User } from "../entities/User";
import { hashPassword } from "../utils/hashage";
import { validate } from "class-validator";
import { verify } from "argon2";
import { sign } from "jsonwebtoken";
import Cookies from "cookies";
@Resolver()
export class UsersResolver {
  @Mutation(() => User)
  async createUser(
    @Arg("data", () => CreateUserInput) data: CreateUserInput
  ): Promise<User> {
    const errors = await validate(data);
    if (errors.length > 0) {
      throw new Error(`Validation error: ${JSON.stringify(errors)}`);
    }

    const newUser = new User();

    try {
      const hashedPassword = await hashPassword(data.password);
      Object.assign(newUser, data, { hashedPassword, password: undefined });
      await newUser.save();
      return newUser;
    } catch (error) {
      throw new Error("Erreur lors de la création de l'utilisateur");
    }
  }

  @Mutation(() => User, { nullable: true })
  async login(
    @Arg("email") email: string,
    @Arg("password") password: string,
    @Ctx() context: any
  ): Promise<User> {
    try {
      const user = await User.findOneBy({ email });

      if (user) {
        if (await verify(user.hashedPassword, password)) {
          const token = sign({ id: user.id }, process.env.JWT_SECRET);
          console.log(token);

          // try {
          //   const payload = jwtVerify(token, "supersecret");
          //   console.log("token valid", payload);
          // } catch (error) {
          //   console.log("token invalid");
          // }
          const cookies = new Cookies(context.req, context.res);

          cookies.set("token", token, {
            secure: false,
            httpOnly: true,
            maxAge: 1000 * 60 * 60 * 72,
          });

          return user;
        } else {
          return null;
        }
      } else {
        return null;
      }
    } catch (error) {
      throw new Error("Invalid credentials");
    }
  }
}
