import { useState } from "react";
import DefaultLayout from "../layout/DefaultLayout";
import { useAuth } from "../auth/AuthProvider";
import { Navigate, useNavigate } from "react-router-dom";
import { API_URL } from "../auth/constants";

function Signup() {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorResponse, setErrorResponse] = useState();

  const auth = useAuth();
  const goTo = useNavigate();

  if (auth.isAuthenticated) return <Navigate to="/dashboard" />;

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      let response = await fetch(`${API_URL}/signup`, {
        method: "POST",
        headers: {
          "content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          username,
          password,
        }),
      });

      if (!response.ok) {
        console.log("Something Went Wrong");
        const json = await response.json();
        setErrorResponse(json.body.error);

        return;
      }
      setErrorResponse("");

      goTo("/");
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <DefaultLayout>
      <form
        onSubmit={handleSubmit}
        className="flex justify-center w-max mx-auto items-center flex-col min-h-screen"
      >
        <h1 className="mb-20">Registro</h1>

        {!!errorResponse && <div className="errorMessage">{errorResponse}</div>}

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
