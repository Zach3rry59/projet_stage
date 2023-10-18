import axios from "axios";
import { useKeyStore } from "../store";

export function useKeys() {
  const { keys, setKeys } = useKeyStore();
  const BASE_URL = "http://localhost:3002";

  const fetchKeys = (id = 0) => {
    let URL = `${BASE_URL}/keys/all`;
    if (id !== 0) {
      URL = `${BASE_URL}/keys/center/${id}`;
    }
    axios
      .get(URL)
      .then((values) => {
        if (values.data.Error) {
          return setKeys(null);
        }
        console.log("fetching");
        setKeys(values.data);
      })
      .catch(() => setKeys(null));
  };

  return { keys, fetchKeys };
}
