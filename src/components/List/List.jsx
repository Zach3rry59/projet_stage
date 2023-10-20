import { useNavigate } from "react-router-dom";
import { useToggle } from "../../hooks/useToggle";
import { FaInfoCircle } from "react-icons/fa";
import axios from "axios";
import { useEffect, useState } from "react";

const List = ({
  items,
  subItems,
  parentItemIdField,
  itemRoute,
  childItemRoute,
  noItemPlaceholder,
  tableColumnHeaders,
  showRowMobile,
}) => {
  const navigate = useNavigate();
  const { openElements, toggle } = useToggle(itemRoute);
  const tableHeaders = Object.keys(tableColumnHeaders);
  const BASE_URL = "http://localhost:3002";

  const [employeeData, setEmployeeData] = useState({});

  useEffect(() => {
    axios
      .get(`${BASE_URL}/employees/all`)
      .then((response) => {
        if (response.data) {
          const employeeInfo = {};
          response.data.forEach((employee) => {
            employeeInfo[employee.id] = {
              firstname: employee.firstname,
              lastname: employee.lastname,
            };
          });
          setEmployeeData(employeeInfo);
        } else {
          console.error("Error fetching employee data:", response);
        }
      })
      .catch((error) => {
        console.error("Error fetching employee data:", error);
      });
  }, []);

  return (
    <ul className="border-gray-300">
      {items.map((item) => (
        <li key={item.id} className="bg-white p-2 mb-2 rounded">
          <span
            className="flex justify-between cursor-pointer items-center"
            onClick={(e) => toggle(item.id, e)}
          >
            <span>{item.name}</span>
            <div>
              <span className="link hover:text-blue-500 m-10">
                <FaInfoCircle /> Détails
              </span>
              {openElements.includes(item.id) ? (
                <span className="text-green-500">&#9660;</span>
              ) : (
                <span className="text-gray-500 hover:text-green-500">
                  &#9654;
                </span>
              )}
            </div>
          </span>
          {openElements.includes(item.id) && (
            <div className="mt-2">
              {subItems?.filter(
                (subItem) => subItem[parentItemIdField] === item.id
              ).length > 0 ? (
                <div className="overflow-x-auto">
                  <table className="min-w-full">
                    <thead className="bg-gray-200">
                      <tr>
                        {tableHeaders.map((header, index) => (
                          <th
                            key={index}
                            className={`p-2 ${
                              index < showRowMobile
                                ? ""
                                : "hidden md:table-cell"
                            }`}
                          >
                            {tableColumnHeaders[header]}
                          </th>
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
                            className="cursor-pointer hover:text-blue-500 border"
                            onClick={() => {
                              navigate(`${childItemRoute}/${subItem.id}`);
                            }}
                          >
                            {tableHeaders.map((header, index) => {
                              if (header === "employee_id") {
                                return (
                                  <td
                                    key={index}
                                    className={`p-2 ${
                                      index < showRowMobile
                                        ? ""
                                        : "hidden md:table-cell"
                                    }`}
                                  >
                                    {employeeData[subItem.employee_id]
                                      ? `${
                                          employeeData[subItem.employee_id]
                                            .firstname
                                        } ${
                                          employeeData[subItem.employee_id]
                                            .lastname
                                        }`
                                      : ""}
                                  </td>
                                );
                              } else {
                                return (
                                  <td
                                    key={index}
                                    className={`p-2 ${
                                      index < showRowMobile
                                        ? ""
                                        : "hidden md:table-cell"
                                    }`}
                                  >
                                    {subItem[header]}
                                  </td>
                                );
                              }
                            })}
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </div>
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
