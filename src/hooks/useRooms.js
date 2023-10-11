import axios from "axios";
import { useRoomStore } from "../store";

export function useRooms() {
  const { rooms, setRooms } = useRoomStore();
  const BASE_URL = "http://localhost:3002";

  const fetchRooms = (id = 0) => {
    let URL = `${BASE_URL}/rooms/all`;
    if (id !== 0) {
      URL = `${BASE_URL}/rooms/center/${id}`;
    }
    axios
      .get(URL)
      .then((values) => {
        if (values.data.Error) {
          return setRooms(null);
        }

        setRooms(values.data);
        console.log(values.data);
      })
      .catch(() => setRooms(null));
  };

  return { rooms, fetchRooms };
}
