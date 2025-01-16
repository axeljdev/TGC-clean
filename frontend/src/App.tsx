import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import { HomePage } from "./pages/Home";
import { AboutPage } from "./pages/About";
import { PageLayout } from "./components/Layout";
import { AdPage } from "./pages/Ad";
import { AdEditorPage } from "./pages/AdEditor";
import { CategoryPage } from "./pages/Category";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  useQuery,
} from "@apollo/client";
import RegisterPage from "./pages/RegisterPage";
import { queryWhoami } from "./api/whoami";
import LoginPage from "./pages/LoginPage";

const client = new ApolloClient({
  uri: "/api",
  cache: new InMemoryCache(),
  credentials: "same-origin",
});

function checkAuth(
  Component: React.FC,
  authStates: AuthState[],
  redirectTo: string = "/"
) {
  return function () {
    const { data: whoamiData } = useQuery(queryWhoami);
    const me = whoamiData?.whoami;

    if (me === undefined) {
      return null;
    }

    if (
      (me === null && authStates.includes(AuthState.unauthenticated)) ||
      (me && authStates.includes(AuthState.authenticated))
    ) {
      return <Component />;
    }

    return <Navigate to={redirectTo} replace />;
  };
}

enum AuthState {
  unauthenticated,
  authenticated,
}

function App() {
  return (
    <ApolloProvider client={client}>
      <BrowserRouter>
        <Routes>
          <Route Component={PageLayout}>
            <Route path="/" Component={HomePage} />
            <Route path="/categories/:id" Component={CategoryPage} />
            <Route path="/ads/:id" Component={AdPage} />
            <Route
              path="/ads/:id/edit"
              Component={checkAuth(AdEditorPage, [AuthState.authenticated])}
            />
            <Route
              path="/ads/new"
              Component={checkAuth(AdEditorPage, [AuthState.authenticated])}
            />
            <Route path="/about" Component={AboutPage} />
            <Route
              path="/login"
              Component={checkAuth(LoginPage, [AuthState.unauthenticated])}
            />
            <Route
              path="/register"
              Component={checkAuth(RegisterPage, [AuthState.unauthenticated])}
            />
            <Route path="*" Component={() => <Navigate to="/" />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ApolloProvider>
  );
}

export default App;
