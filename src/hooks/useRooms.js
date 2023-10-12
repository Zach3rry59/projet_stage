import axios from "axios";
import { useRoomStore } from "../store";

export function useRooms() {
  const { rooms, setRooms } = useRoomStore();
  const BASE_URL = "http://localhost:3002";

  const fetchRooms = (ids = 0) => {
    let URL = `${BASE_URL}/rooms/all`;
    if (ids !== 0) {
      const idQuerry = ids.map((item) => item.id);
      URL = `${BASE_URL}/rooms/centers?ids=${idQuerry}`;
    }
    axios
      .get(URL)
      .then((values) => {
        if (values.data.Error) {
          return setRooms(null);
        }
        console.log("fetching");
        setRooms(values.data);
      })
      .catch(() => setRooms(null));
  };

  return { rooms, fetchRooms };
}
