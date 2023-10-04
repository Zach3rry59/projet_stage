import { useCallback } from "react";
import { useAccountStore } from "../store";
import axios from "axios";

axios.defaults.withCredentials = true;

export enum AuthStatus {
  Unknown = 0,
  Authenticated = 1,
  Guest = 2,
}

interface LoginValues {
  username: string;
  password: string;
}
export function useAuth() {
  const { account, setAccount } = useAccountStore();
  let status = AuthStatus.Unknown;

  switch (account) {
    case null:
      status = AuthStatus.Guest;
      break;
    case undefined:
      status = AuthStatus.Unknown;
      break;
    default:
      status = AuthStatus.Authenticated;
      break;
  }

  const authenticate = useCallback(() => {
    axios
      .get("http://localhost:3002/users/")
      .then((values) => {
        if (values.data.Error) {
          return setAccount(null);
        }
        setAccount(values.data);
      })
      .catch(() => setAccount(null));
  }, []);

  const login = useCallback((values: LoginValues) => {
    axios
      .post("http://localhost:3002/users/login", values)
      .then((values) => {
        setAccount(values.data);
      })
      .catch((error) => {
        alert(error.response?.data.error);
        return error;
      });
  }, []);

  const logout = useCallback(() => {
    axios.get("http://localhost:3002/users/logout").then(() => {
      setAccount(null);
    });
  }, []);

  return {
    status,
    account,
    authenticate,
    login,
    logout,
  };
}
