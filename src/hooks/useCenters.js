import axios from "axios";
import { useCenterStore } from "../store";
import { useState } from "react";

export function useCenters() {
  const { centers, setCenters } = useCenterStore();
  const [loading, setLoading] = useState(true);
  const BASE_URL = "http://localhost:3002";

  const fetchCenters = async () => {
    setLoading(true);
    return axios
      .get(`${BASE_URL}/centers/all`)
      .then((values) => {
        if (values.data.Error) {
          setLoading(false);
          return setCenters(null);
        }
        setCenters(values.data);
        setLoading(false);
      })
      .catch(() => {
        setCenters(null);
        setLoading(false);
      });
  };

  return { centers, loading, fetchCenters };
}
