import { useState } from "react";
import { useMutation } from "@apollo/client";
import { mutationLogin } from "../api/login";
import { queryWhoami } from "../api/whoami";

function LoginPage() {
  const [email, setEmail] = useState("test1@gmail.com");
  const [password, setPassword] = useState("Supersecret1!");
  const [error, setError] = useState("");

  const [doLogin, { loading }] = useMutation(mutationLogin, {
    refetchQueries: [queryWhoami],
  });

  async function doSubmit() {
    try {
      const { data } = await doLogin({ variables: { email, password } });
      if (data.login) {
        window.location.reload();
      } else {
        setError("impossible de se connecter");
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (e: any) {
      if (e.message.includes("Invalid credentials")) {
        setError("Email ou mot de passe incorrect");
      } else {
        setError("Erreur lors de la connexion");
      }
    }
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mx-auto max-w-md pt-10">
        Se connecter
      </h1>
      <form
        className="flex flex-col gap-4 mx-auto max-w-md pt-10"
        onSubmit={(e) => {
          e.preventDefault();
          doSubmit();
        }}
      >
        {error && <p className="text-red-500">{error}</p>}
        <input
          type="email"
          placeholder="Email"
          className="input"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Mot de passe"
          className="input"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit" className="button" disabled={loading}>
          Se connecter
        </button>
        {loading && <p>Connexion en cours...</p>}
      </form>
    </div>
  );
}

export default LoginPage;
