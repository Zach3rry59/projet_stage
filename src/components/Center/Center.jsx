import { useParams } from "react-router-dom";

const Center = () => {
  const { centerId } = useParams();
  return <div>Contenu du Centre {centerId}</div>;
};

export default Center;
