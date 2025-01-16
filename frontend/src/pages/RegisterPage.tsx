import { useMutation } from "@apollo/client";
import { useState } from "react";
import { mutationCreateUser } from "../api/createUser";
import { Link } from "react-router-dom";

function RegisterPage() {
  const [error, setError] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [doCreateUser, { loading, data }] = useMutation(mutationCreateUser);

  async function doSubmit() {
    try {
      await doCreateUser({
        variables: { data: { email, password } },
      });
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (e: any) {
      if (e.message.includes("password is not strong enough")) {
        setError("Le mot de passe n'est pas assez fort");
      } else if (e.message.includes("email must be an email")) {
        setError("L'email n'est pas valide");
      } else if (e.message.includes("email must be unique")) {
        setError("Cette adresse email est déjà utilisée");
      } else {
        setError("Erreur lors de la création de l'utilisateur");
      }
    }
  }

  if (data) {
    return (
      <div className="flex flex-col items-center justify-center pt-10">
        <h1 className="text-2xl font-bold">Inscription réussie 🎉</h1>
        <p className="text-lg">Vous pouvez maintenant vous connecter</p>
        <Link to="/login" className="button mt-4">
          Se connecter
        </Link>
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mx-auto max-w-md pt-10">S'inscrire</h1>
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
          S'inscrire
        </button>
        {loading && <p>Envoi...</p>}
      </form>
    </div>
  );
}

export default RegisterPage;
