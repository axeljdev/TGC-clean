import { gql } from "@apollo/client";

export const mutationLogout = gql`
  mutation logout {
    logout
  }
`;
