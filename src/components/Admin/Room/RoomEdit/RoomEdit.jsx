import axios from "axios";
import { Formik, Form, Field, ErrorMessage } from "formik";
import SearchableSelect from "../../SearchableSelect/SearchableSelect";

const RoomEdit = ({ onClose, room, employees, id_center }) => {
  const formData = {
    name: room?.name || "",
    date_start: new Date(room?.date_start)
      .toISOString()
      .slice(0, 19)
      .replace("T", " "),
    date_end: new Date(room?.date_end)
      .toISOString()
      .slice(0, 19)
      .replace("T", " "),
    infos: room?.infos || "",
    formation_name: room?.formation_name || "",
    capacity: room?.capacity || undefined,
    computer: room?.computer || undefined,
    id_employee: room?.id_employee || undefined,
    id_center: id_center,
  };

  const validate = (values) => {
    const errors = {};

    if (!values.name) {
      errors.name = "Le nom de la salle est requis";
    }

    return errors;
  };

  const onSubmit = (values) => {
    let verif = parseInt(values.id_employee, 10);
    if (!Number.isInteger(verif)) {
      values.id_employee = null;
    }
    axios.put(`http://localhost:3002/rooms/room/${room.id}`, values);
    onClose();
  };

  return (
    <div className="modal p-4 bg-white rounded-lg shadow-md w-80 mx-auto mt-20">
      <h2 className="text-xl font-semibold mb-4">Edition de {room?.name}</h2>
      <Formik initialValues={formData} validate={validate} onSubmit={onSubmit}>
        <Form>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-600">
              Nom de la salle:
            </label>
            <Field
              type="text"
              name="name"
              className="mt-1 p-2 w-full border rounded focus:outline-none focus:border-blue-500"
            />
            <ErrorMessage
              name="name"
              component="div"
              className="text-red-500"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-600">
              Nom de la formation:
            </label>
            <Field
              type="text"
              name="formation_name"
              className="mt-1 p-2 w-full border rounded focus:outline-none focus:border-blue-500"
            />
            <ErrorMessage
              name="formation_name"
              component="div"
              className="text-red-500"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-600">
              Capacité:
            </label>
            <Field
              type="number"
              name="capacity"
              className="mt-1 p-2 w-full border rounded focus:outline-none focus:border-blue-500"
            />
            <ErrorMessage
              name="capacity"
              component="div"
              className="text-red-500"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-600">
              Nombres d&apos;ordinateur:
            </label>
            <Field
              type="number"
              name="computer"
              className="mt-1 p-2 w-full border rounded focus:outline-none focus:border-blue-500"
            />
            <ErrorMessage
              name="computer"
              component="div"
              className="text-red-500"
            />
          </div>
          <SearchableSelect
            name="id_employee"
            label="Employé"
            searchPlaceholder={"Rechercher un employé"}
            $
            optionPlaceholder={"Séléctionne un employé"}
            options={[
              ...employees.map((employee) => ({
                label: `${employee.firstname} ${employee.lastname}`,
                value: employee.id.toString(),
              })),
            ]}
          />
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-600">
              Informations suplémentaire:
            </label>
            <Field
              as="textarea"
              name="infos"
              className="mt-1 p-2 w-full border rounded focus:outline-none focus:border-blue-500"
            />
            <ErrorMessage
              name="infos"
              component="div"
              className="text-red-500"
            />
          </div>
          <div className="flex justify-between">
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300"
            >
              Ajouter
            </button>
            <button
              type="button"
              onClick={onClose}
              className="text-gray-500 px-4 py-2 rounded hover:bg-gray-200 focus:outline-none focus:ring focus:border-gray-300"
            >
              Annuler
            </button>
          </div>
        </Form>
      </Formik>
    </div>
  );
};

export default RoomEdit;
