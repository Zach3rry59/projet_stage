import { useEffect } from "react";
import "./App.css";
import Login from "./components/Login/Login";
import { AuthStatus, useAuth } from "./hooks/useAuth";

function App() {
  const { status, account, logout, authenticate } = useAuth();

  useEffect(() => {
    authenticate();
  }, []);

  if (status === AuthStatus.Unknown) {
    return (
      <>
        <div
          className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
          role="status"
        ></div>
      </>
    );
  }

  if (status === AuthStatus.Guest) {
    return (
      <>
        <Login />
      </>
    );
  }
  return (
    <>
      <button
        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        onClick={logout}
      >
        Bravo {account.username} vous êtes connecter cliquer pour vous déco
      </button>
    </>
  );
}

export default App;
