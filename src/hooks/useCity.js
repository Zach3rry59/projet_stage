import axios from "axios";
import { useCityStore } from "../store";

export function useCities() {
  const { cities, setCities } = useCityStore();
  const BASE_URL = "http://localhost:3002";

  const fetchCities = () => {
    axios
      .get(`${BASE_URL}/cities/all`)
      .then((values) => {
        if (values.data.Error) {
          return setCities(null);
        }
        setCities(values.data);
      })
      .catch(() => setCities(null));
  };

  return { cities, fetchCities };
}
