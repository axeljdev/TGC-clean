import { gql } from "@apollo/client";

export const mutationLogin = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      id
    }
  }
`;
