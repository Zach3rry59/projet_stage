import axios from "axios";
import { useRoomStore } from "../store";
import { useState } from "react";

export function useRooms() {
  const { rooms, setRooms } = useRoomStore();
  const [loading, setLoading] = useState(true);
  const BASE_URL = "http://localhost:3002";

  const fetchRooms = async (ids = 0) => {
    setLoading(true);
    let URL = `${BASE_URL}/rooms/all`;

    if (ids !== 0) {
      let idQuerry;
      if (Array.isArray(ids)) {
        idQuerry = ids.map((item) => item.id);
      } else {
        idQuerry = ids;
      }
      URL = `${BASE_URL}/rooms/centers?ids=${idQuerry}`;
    }

    return axios
      .get(URL)
      .then((values) => {
        if (values.data.Error) {
          return setRooms(null);
        }
        setRooms(values.data);
        setLoading(false);
      })
      .catch(() => {
        setRooms(null);
        setLoading(false);
      });
  };

  return { rooms, loading, fetchRooms };
}
