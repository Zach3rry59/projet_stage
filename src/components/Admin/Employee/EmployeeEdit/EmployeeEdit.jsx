import axios from "axios";
import { Formik, Form, Field, ErrorMessage } from "formik";

const EmployeeEdit = ({ employee, onClose }) => {
  const formData = {
    firstname: employee.firstname || "",
    lastname: employee.lastname || "",
    formation: employee.formation || "",
    phone: employee.phone || "",
    email: employee.email || "",
  };
  const validate = (values) => {
    const errors = {};

    if (!values.firstname) {
      errors.name = "Le prénom du formateur est requis";
    }
    if (!values.lastname) {
      errors.name = "Le nom du formateur est requis";
    }
    if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
      errors.email = "Email non valide";
    }
    if (!/^\d{10}$/.test(values.phone)) {
      errors.phone = "Numéro de téléphone invalide";
    }
    return errors;
  };
  const onSubmit = (values) => {
    values.firstname =
      values.firstname.charAt(0).toUpperCase() + values.firstname.slice(1);
    values.lastname =
      values.lastname.charAt(0).toUpperCase() + values.lastname.slice(1);
    axios.put(
      `http://localhost:3002/employees/employee/${employee.id}`,
      values
    );
    onClose();
  };

  return (
    <div className="modal p-4 bg-white rounded-lg shadow-md w-80 mx-auto mt-20">
      <h2 className="text-xl font-semibold mb-4">
        Édition du formateur {employee.firstname} {employee.lastname}
      </h2>
      <Formik initialValues={formData} validate={validate} onSubmit={onSubmit}>
        <Form>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-600">
              Prénom :
            </label>
            <Field
              type="text"
              name="firstname"
              required
              className="mt-1 p-2 w-full border rounded focus:outline-none focus:border-blue-500"
            />

            <ErrorMessage
              name="firstname"
              autoComplete="given-name"
              component="div"
              className="text-red-500"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-600">
              Nom :
            </label>
            <Field
              type="text"
              name="lastname"
              autoComplete="family-name"
              required
              className="mt-1 p-2 w-full border rounded focus:outline-none focus:border-blue-500"
            />

            <ErrorMessage
              name="lastname"
              component="div"
              className="text-red-500"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-600">
              Formation :
            </label>
            <Field
              type="text"
              name="formation"
              required
              className="mt-1 p-2 w-full border rounded focus:outline-none focus:border-blue-500"
            />

            <ErrorMessage
              name="formation"
              component="div"
              className="text-red-500"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-600">
              N° de téléphone:
            </label>
            <Field
              type="text"
              name="phone"
              required
              className="mt-1 p-2 w-full border rounded focus:outline-none focus:border-blue-500"
            />

            <ErrorMessage
              name="phone"
              component="div"
              className="text-red-500"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-600">
              E-mail:
            </label>
            <Field
              type="text"
              name="email"
              required
              className="mt-1 p-2 w-full border rounded focus:outline-none focus:border-blue-500"
            />

            <ErrorMessage
              name="email"
              component="div"
              className="text-red-500"
            />
          </div>
          <div className="flex justify-between">
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300"
            >
              Enregistrer
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

export default EmployeeEdit;
