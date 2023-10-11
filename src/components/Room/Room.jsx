import { useParams } from "react-router-dom";

const Room = () => {
  const { roomId } = useParams();
  return <div>Contenu de la Salle {roomId}</div>;
};

export default Room;
