import { Link } from "react-router-dom";
import { FaKey } from "react-icons/fa";

const KeysList = ({ keys }) => {
  console.log(keys);

  if (!keys || keys.length === 0) {
    return <div>Aucune clé disponible</div>;
  }
  return (
    <div className="flex items-center space-x-2">
      {keys.map((key) =>
        key.id_employee ? (
          <Link to={`/employee/${key.id_employee}`} key={key.id}>
            <div className="bg-blue-500 text-white rounded-full p-2 hover:bg-blue-600 transition duration-300 ease-in-out">
              <FaKey />
            </div>
          </Link>
        ) : (
          <div
            key={key.id}
            className="bg-green-500 text-white rounded-full p-2 hover:bg-green-600 transition duration-300 ease-in-out"
            title="Clé libre"
          >
            <FaKey />
          </div>
        )
      )}
    </div>
  );
};

export default KeysList;
