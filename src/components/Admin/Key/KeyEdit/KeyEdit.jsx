import axios from "axios";
import { Formik, Form } from "formik";
import SearchableSelect from "../../SearchableSelect/SearchableSelect";

const KeyEdit = ({ onClose, selectedKey, employees, id_center }) => {
  const formData = {
    id_employee: selectedKey?.id_employee || undefined,
    id_center: id_center,
  };

  const onSubmit = (values) => {
    let verif = parseInt(values.id_employee, 10);
    if (!Number.isInteger(verif)) {
      values.id_employee = null;
    }
    axios.put(`http://localhost:3002/keys/key/${selectedKey.id}`, values);
    onClose();
  };

  return (
    <div className="modal p-4 bg-white rounded-lg shadow-md w-80 mx-auto mt-20">
      <h2 className="text-xl font-semibold mb-4">Edition d&apos;une clé</h2>
      <Formik initialValues={formData} onSubmit={onSubmit}>
        <Form>
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

export default KeyEdit;
