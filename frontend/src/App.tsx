import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import { HomePage } from "./pages/Home";
import { AboutPage } from "./pages/About";
import { PageLayout } from "./components/Layout";
import { AdPage } from "./pages/Ad";
import { AdEditorPage } from "./pages/AdEditor";
import { CategoryPage } from "./pages/Category";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";

const client = new ApolloClient({
  uri: "http://localhost:5500",
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <BrowserRouter>
        <Routes>
          <Route Component={PageLayout}>
            <Route path="/" Component={HomePage} />
            <Route path="/categories/:id" Component={CategoryPage} />
            <Route path="/ads/:id" Component={AdPage} />
            <Route path="/ads/:id/edit" Component={AdEditorPage} />
            <Route path="/ads/new" Component={AdEditorPage} />
            <Route path="/about" Component={AboutPage} />
            <Route path="/login" Component={LoginPage} />
            <Route path="/register" Component={RegisterPage} />
            <Route path="*" Component={() => <Navigate to="/" />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ApolloProvider>
  );
}

export default App;
