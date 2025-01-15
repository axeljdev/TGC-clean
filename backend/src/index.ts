import "reflect-metadata";
import { datasource } from "./datasource";
import { buildSchema } from "type-graphql";
import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { CategoriesResolver } from "./resolvers/Categories";
import { AdsResolver } from "./resolvers/Ads";
import { TagsResolver } from "./resolvers/Tags";
import { UsersResolver } from "./resolvers/Users";
import { authChecker } from "./auth";

async function initialize() {
  await datasource.initialize();
  console.log("Datasource is connected");

  const schema = await buildSchema({
    resolvers: [CategoriesResolver, AdsResolver, TagsResolver, UsersResolver],
    authChecker,
  });

  const server = new ApolloServer({ schema });

  const { url } = await startStandaloneServer(server, {
    listen: { port: 5500 },
    context: async ({ req, res }) => {
      return {
        req,
        res,
      };
    },
  });
  console.log(`GraphQL server ready at ${url}`);
}

initialize();
