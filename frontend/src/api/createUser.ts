import { gql } from "@apollo/client";

export const mutationCreateUser = gql`
  mutation createUser($data: CreateUserInput!) {
    createUser(data: $data) {
      id
    }
  }
`;
