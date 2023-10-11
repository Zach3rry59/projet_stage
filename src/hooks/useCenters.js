import axios from "axios";
import { useCenterStore } from "../store";

export function useCenters() {
  const { centers, setCenters } = useCenterStore();
  const BASE_URL = "http://localhost:3002";

  const fetchCenters = () => {
    axios
      .get(`${BASE_URL}/centers/all`)
      .then((values) => {
        if (values.data.Error) {
          return setCenters(null);
        }
        setCenters(values.data);
      })
      .catch(() => setCenters(null));
  };

  return { centers, fetchCenters };
}
