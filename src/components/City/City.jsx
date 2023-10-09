import { useEffect, useState } from "react";
import { useCities } from "../../hooks/useCity";
import socketIOClient from "socket.io-client";

const City = () => {
  const { cities, fetchCities } = useCities();
  const BASE_URL = "http://localhost:3002";

  useEffect(() => {
    const newSocket = socketIOClient(BASE_URL);
    fetchCities();
    newSocket.on("newCity", () => {
      fetchCities();
      console.log("NEW CITY !");
    });

    return () => {
      if (newSocket) {
        newSocket.disconnect();
      }
    };
  }, []);

  return (
    <>{cities && cities.map((city) => <div key={city.id}>{city.name}</div>)}</>
  );
};

export default City;
