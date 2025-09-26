import axios from "axios";
import { Formik, Form, Field, ErrorMessage } from "formik";

const CityEdit = ({ city, cities, onClose }) => {
  const formData = {
    name: city.name || "",
    cp: city.cp || "",
  };
  const validate = (values) => {
    const errors = {};

    if (!values.name) {
      errors.name = "Le nom de la ville est requis";
    }
    if (
      cities.some(
        (city) => city.name.toLowerCase() === values.name.toLowerCase()
      )
    ) {
      errors.name = "La ville est déjà dans la base de données";
    }
    if (!values.cp) {
      errors.cp = "Le code postal de la ville est requis";
    }

    if (!/^\d{5}$/.test(values.cp)) {
      errors.cp = "Code postal invalide";
    }

    return errors;
  };
  const onSubmit = (values) => {
    values.name = values.name.charAt(0).toUpperCase() + values.name.slice(1);
    axios.put(`http://localhost:3002/cities/city/${city.id}`, values);
    onClose();
  };

  return (
    <div className="modal p-4 bg-white rounded-lg shadow-md w-80 mx-auto mt-20">
      <h2 className="text-xl font-semibold mb-4">
        Édition de la Ville {city.name}
      </h2>
      <Formik initialValues={formData} validate={validate} onSubmit={onSubmit}>
        <Form>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-600">
              Nom de la Ville:
            </label>
            <Field
              type="text"
              name="name"
              required
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
              Code postal de la Ville:
            </label>
            <Field
              type="text"
              name="cp"
              required
              className="mt-1 p-2 w-full border rounded focus:outline-none focus:border-blue-500"
            />
            <ErrorMessage name="cp" component="div" className="text-red-500" />
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

export default CityEdit;
