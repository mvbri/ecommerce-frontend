import { useState } from "react";
import DefaultLayout from "../layout/DefaultLayout";
import { useAuth } from "../auth/AuthProvider";
import { Navigate } from "react-router-dom";

function Signup() {
  const [name, setName] = useState();
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();

  const auth = useAuth();

  if (auth.isAuthenticated) return <Navigate to="/dashboard" />;

  return (
    <DefaultLayout>
      <form className="flex justify-center w-max mx-auto items-center flex-col min-h-screen">
        <h1 className="mb-20">Registro</h1>

        <label className="mb-2.5 w-full text-left font-semibold">
          Nombre y Apellido
        </label>
        <input
          className="mb-2.5 w-64 p-1 pl-3.5 rounded"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <label className="mb-2.5 w-full text-left font-semibold">
          Nombre de usuario
        </label>
        <input
          className="mb-2.5 w-64 p-1 pl-3.5 rounded"
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <label className="mb-2.5 w-full text-left font-semibold">
          Contraseña
        </label>
        <input
          className="mb-7 w-64 p-1 pl-3.5 rounded"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button className="bg-sky-500/75 hover:bg-sky-700  hover:border-sky- font-semibold">
          Registrarse
        </button>
      </form>
    </DefaultLayout>
  );
}

export default Signup;
