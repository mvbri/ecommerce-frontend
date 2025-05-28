import { Navigate, useNavigate } from "react-router-dom";
import { useAuth } from "../auth/AuthProvider";
import AdminLoginLayout from "../layout/AdminLoginLayout";
import { useState } from "react";
import { API_URL } from "../auth/constants";

function AdminLogin() {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [errorResponse, setErrorResponse] = useState();
  const auth = useAuth();
  const goTo = useNavigate();

  if (auth.isAuthenticated && auth.getUser().role == "admin") return <Navigate to="/admin/dashboard" />;
  if (auth.isAuthenticated && auth.getUser().role == "delivery") return <Navigate to="/delivery/dashboard" />;

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      let response = await fetch(`${API_URL}/admin/login`, {
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
      console.log("AdminLogin Successful");
      setErrorResponse("");

      const json = await response.json();

      if (json.accessToken && json.refreshToken) {
        auth.saveUser(json);
        // goTo("/admin/dashboard");
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <AdminLoginLayout>
      <div className="flex flex-col items-start md:items-center pt-[4rem]">
        <form
          onSubmit={handleSubmit}
          className="flex mx-auto items-center flex-col px-8 p-3 mb-3 border border-gray-700 rounded-md"
        >
          <h1 className="mmb-4 md:mb-6 p-[2rem] text-2xl md:text-3xl text-gray-800 text-center rounded-t-md">
            Inicio de sesión
          </h1>

          {!!errorResponse && (
            <div className="bg-red-500 w-80 text-center p-1 mb-3">
              {errorResponse}
            </div>
          )}
          <div className="flex flex-col mb-6 w-full">
            <label className="mb-2 text-left text-base">Correo:</label>
            <div className="relative">
              <div className="inline-flex items-center justify-center absolute left-0 top-0 h-full w-10 text-gray-400">
                <svg
                  className="h-6 w-6"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                </svg>
              </div>
              <input
                className="text-sm sm:text-base placeholder-gray-500 pl-10 pr-4 rounded-lg border border-gray-400 w-full py-2 focus:outline-none focus:border-blue-400"
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>

          <div className="flex flex-col mb-6 w-full">
            <label className="mb-2 self-start  text-base">Contraseña:</label>
            <div className="relative">
              <div className="inline-flex items-center justify-center absolute left-0 top-0 h-full w-10 text-gray-400">
                <span>
                  <svg
                    className="h-6 w-6"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </span>
              </div>
              <input
                className="text-sm sm:text-base placeholder-gray-500 pl-10 pr-4 rounded-lg border border-gray-400 w-full py-2 focus:outline-none focus:border-blue-400"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          <button className="mb-4 w-full inline-flex items-center justify-center border align-middle select-none font-sans font-medium text-center transition-all duration-300 ease-in disabled:opacity-50 disabled:shadow-none disabled:cursor-not-allowed data-[shape=pill]:rounded-full data-[width=full]:w-full focus:shadow-none text-sm rounded-md py-2 px-4 shadow-sm hover:shadow-md bg-slate-800 border-slate-800 text-slate-50 hover:bg-slate-700 hover:border-slate-700">
            iniciar sesión
          </button>
        </form>
      </div>
    </AdminLoginLayout>
  );
}

export default AdminLogin;
