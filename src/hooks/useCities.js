import axios from "axios";
import { useCityStore } from "../store";
import { useState } from "react";

export function useCities() {
  const { cities, setCities } = useCityStore();
  const [loading, setLoading] = useState(true);
  const BASE_URL = "http://localhost:3002";

  const fetchCities = async () => {
    setLoading(true);
    return axios
      .get(`${BASE_URL}/cities/all`)
      .then((values) => {
        if (values.data.Error) {
          return setCities(null);
        }
        setCities(values.data);
        setLoading(false);
      })
      .catch(() => {
        setCities(null);
        setLoading(false);
      });
  };

  return { cities, loading, fetchCities };
}
