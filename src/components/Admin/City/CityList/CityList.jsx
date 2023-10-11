const CityList = ({ cities, onEditClick, onRemoveClick }) => {
  return (
    <ul className="mt-4">
      {cities.map((city) => (
        <li
          key={city.id}
          className="bg-white p-4 mb-2 rounded shadow flex justify-between items-center"
        >
          {city.name}
          <div>
            <button
              onClick={() => onEditClick(city)}
              className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300"
            >
              Editer
            </button>
            <button
              onClick={() => onRemoveClick(city)}
              className="text-red-500 px-2 py-1 rounded hover:bg-red-200 focus:outline-none focus:ring focus:border-red-300"
            >
              Supprimer
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default CityList;
