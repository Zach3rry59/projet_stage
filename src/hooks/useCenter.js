import axios from "axios";
import { useCenterStore } from "../store";

export function useCenters() {
  const { centers, setCenters } = useCenterStore();
  const BASE_URL = "http://localhost:3002";

  const fetchCenters = (id = 0) => {
    let url = `${BASE_URL}/centers/all`;
    if (id !== 0) {
      url = `${BASE_URL}/centers/center/${id}`;
    }
    axios
      .get(url)
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
