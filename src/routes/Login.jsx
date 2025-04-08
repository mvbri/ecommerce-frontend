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

  if (auth.isAuthenticated && auth.getUser().role == "customer") {
    return <Navigate to="/dashboard" />;
  } else if (auth.isAuthenticated && auth.getUser().role == "admin") {
    return <Navigate to="/admin/dashboard" />;
  }

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

      if (json.accessToken && json.refreshToken) {
        auth.saveUser(json);
        goTo("/dashboard");
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <DefaultLayout>
      <div className="min-h-screen flex flex-col items-start md:items-center">
        <form
          onSubmit={handleSubmit}
          className="flex w-fit mx-auto items-center flex-col p-3 mb-3 border border-secondary rounded-md
"
        >
          <h1
            className="mb-4 md:mb-20 p-[2rem] text-2xl md:text-4xl text-center rounded-t-md
"
          >
            Login
          </h1>

          {!!errorResponse && (
            <div className="bg-red-500 w-80 text-center ml-4 p-1 mb-3">
              {errorResponse}
            </div>
          )}
          <div className="flex flex-col w-80 mb-4">
            <label className="mb-2 text-left text-lg">Correo</label>
            <input
              className="p-2 px-3 rounded border-b border-secondary-accent"
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="flex flex-col w-80 mb-8">
            <label className="mb-2 text-left text-lg">Contraseña</label>
            <input
              className="p-2 px-3 rounded border-b border-secondary-accent"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button
            className="bg-secondary w-fit py-1 px-4 rounded-md
 hover:bg-secondary-accent text-white font-semibold mb-3"
          >
            Login
          </button>
        </form>
        <p className="pt-3 text-center w-full">
          ¿No tienes cuenta todavía?{" "}
          <Link
            className="text-secondary hover:text-secondary-accent"
            to="/signup"
          >
            Registrate
          </Link>
        </p>
      </div>
    </DefaultLayout>
  );
}

export default Login;
