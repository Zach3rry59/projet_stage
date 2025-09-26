import axios from "axios";
import { useEmployeeStore } from "../store";

export function useEmployee() {
  const { employees, setEmployees } = useEmployeeStore();
  const BASE_URL = "http://localhost:3002";

  const fetchEmployees = (id = 0) => {
    let URL = `${BASE_URL}/employees/all`;
    if (id !== 0) {
      URL = `${BASE_URL}/employees/employee/${id}`;
    }
    axios
      .get(URL)
      .then((values) => {
        if (values.data.Error) {
          return setEmployees(null);
        }
        setEmployees(values.data);
      })
      .catch(() => setEmployees(null));
  };

  return { employees, fetchEmployees };
}
