import { useNavigate } from "react-router-dom";

const AdminList = ({
  cities = 0,
  keys = 0,
  items,
  onEditClick,
  onRemoveClick,
}) => {
  const navigate = useNavigate();
  return (
    <ul className="mt-4">
      {items?.map((item, index) => {
        let city = null;

        if (cities) {
          city = cities?.find((city) => city.id === parseInt(item.id_city));
        }
        if (keys === 0) {
          keys = null;
        }

        return (
          <li
            key={item.id}
            className="bg-white p-4 mb-2 rounded shadow flex flex-col md:flex-row justify-between items-center"
          >
            <div className="flex items-center">
              <span>
                {item.name} {item.firstname} {item.lastname} {item.username}
              </span>
              {city && <span className="ml-2">{city.name}</span>}
              {keys && <span className="ml-2">Clé {index + 1}</span>}
            </div>
            <div className="flex items-center mt-2 md:mt-0">
              {city && (
                <>
                  <button
                    className="bg-green-500 text-white px-2 py-1 rounded hover:bg-green-600 focus:outline-none focus:ring focus:border-blue-300 m-1"
                    onClick={() => navigate(`/admin/center/${item.id}`)}
                  >
                    Salles
                  </button>
                  <button
                    className="bg-green-500 text-white px-2 py-1 rounded hover:bg-green-600 focus:outline-none focus:ring focus:border-blue-300 m-1"
                    onClick={() => navigate(`/admin/key/${item.id}`)}
                  >
                    Clés
                  </button>
                </>
              )}

              <button
                onClick={() => onEditClick(item)}
                className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300 m-1"
              >
                Editer
              </button>
              <button
                onClick={() => onRemoveClick(item)}
                className="text-red-500 px-2 py-1 rounded hover:bg-red-200 focus:outline-none focus:ring focus:border-red-300 m-1"
              >
                Supprimer
              </button>
            </div>
          </li>
        );
      })}
    </ul>
  );
};

export default AdminList;
