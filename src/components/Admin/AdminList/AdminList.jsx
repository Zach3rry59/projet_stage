const AdminList = ({ items, onEditClick, onRemoveClick }) => {
  return (
    <ul className="mt-4">
      {items.map((item) => (
        <li
          key={item.id}
          className="bg-white p-4 mb-2 rounded shadow flex justify-between items-center"
        >
          {item.name}
          <div>
            <button
              onClick={() => onEditClick(item)}
              className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300"
            >
              Editer
            </button>
            <button
              onClick={() => onRemoveClick(item)}
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

export default AdminList;
