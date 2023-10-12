import { useNavigate } from "react-router-dom";
import { useToggle } from "../../hooks/useToggle";

const List = ({
  items,
  subItems,
  parentItemIdField,
  itemRoute,
  childItemRoute,
  noItemPlaceholder,
  tableColumnHeaders,
}) => {
  const navigate = useNavigate();
  const { openElements, toggle } = useToggle(itemRoute);
  const tableHeaders = Object.keys(tableColumnHeaders);
  return (
    <ul>
      {items.map((item) => (
        <li key={item.id} className="bg-white p-4 mb-2 rounded shadow">
          <span
            className="flex justify-between cursor-pointer items-center"
            onClick={(e) => toggle(item.id, e)}
          >
            <span className="link hover:text-blue-500">{item.name}</span>
            {openElements.includes(item.id) ? (
              <span className="text-green-500">&#9660;</span>
            ) : (
              <span className="text-gray-500">&#9654;</span>
            )}
          </span>
          {openElements.includes(item.id) && (
            <div className="mt-2">
              {subItems?.filter(
                (subItem) => subItem[parentItemIdField] === item.id
              ).length > 0 ? (
                <table className="w-full">
                  <thead>
                    <tr>
                      {tableHeaders.map((header) => (
                        <th key={header}>{tableColumnHeaders[header]}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {subItems
                      .filter(
                        (subItem) => subItem[parentItemIdField] === item.id
                      )
                      .map((subItem) => (
                        <tr
                          key={subItem.id}
                          className="cursor-pointer hover:text-blue-500"
                          onClick={() => {
                            navigate(`${childItemRoute}/${subItem.id}`);
                          }}
                        >
                          {tableHeaders.map((header) => (
                            <td key={header}>{subItem[header]}</td>
                          ))}
                        </tr>
                      ))}
                  </tbody>
                </table>
              ) : (
                <p>{noItemPlaceholder}</p>
              )}
            </div>
          )}
        </li>
      ))}
    </ul>
  );
};

export default List;
