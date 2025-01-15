function RegisterPage() {
  return (
    <form>
      <input type="text" placeholder="Nom d'utilisateur" />
      <input type="email" placeholder="Email" />
      <input type="password" placeholder="Mot de passe" />
      <button type="submit">S'inscrire</button>
    </form>
  );
}

export default RegisterPage;
