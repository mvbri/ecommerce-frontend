import { Link, Navigate, useNavigate } from "react-router-dom";
import { useAuth } from "../auth/AuthProvider";
import DefaultLayout from "../layout/DefaultLayout";
import { useState } from "react";
import { API_URL } from "../auth/constants";

function Login() {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [errorResponse, setErrorResponse] = useState();
  const auth = useAuth();
  const goTo = useNavigate();

  if (auth.isAuthenticated) return <Navigate to="/dashboard" />;

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      let response = await fetch(`${API_URL}/login`, {
        method: "POST",
        headers: {
          "content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      if (!response.ok) {
        console.log("Something Went Wrong");
        const json = await response.json();
        setErrorResponse(json.body.error);

        return;
      }
      console.log("Login Successful");
      setErrorResponse("");

      const json = await response.json();

      if (json.body.accessToken && json.body.refreshToken) {
        auth.saveUser(json);
        goTo("/show");
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <DefaultLayout>
      <form
        onSubmit={handleSubmit}
        className="flex w-[80%] mx-auto items-center flex-col min-h-screen"
      >
        <h1 className="mb-20 pt-[6rem]">Login</h1>

        {!!errorResponse && (
          <div className="bg-red-500 w-80 text-center p-1 mb-3">
            {errorResponse}
          </div>
        )}
        <div className="flex flex-col w-80 mb-4">
          <label className="mb-2 text-left font-semibold">Correo</label>
          <input
            className="p-2 px-3 rounded"
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="flex flex-col w-80 mb-8">
          <label className="mb-2 text-left font-semibold">Contraseña</label>
          <input
            className="p-2 px-3 rounded"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button
          className="bg-sky-500/75 w-[100px] py-1 px-2 rounded-md
 hover:bg-sky-700  hover:border-sky- font-semibold mb-3"
        >
          Login
        </button>
        <p className="pt-3">
          ¿No tienes cuenta todavía? <Link to="/signup">Registrate</Link>
        </p>
      </form>
    </DefaultLayout>
  );
}

export default Login;
