import axios from "axios";
import { ErrorMessage, Field, Form, Formik } from "formik";

const CenterEdit = ({ cities, center, onClose }) => {
  const city = cities?.find((city) => city.id === parseInt(center.id_city));
  const formData = {
    name: center.name || "",
    adress: center.adress || "",
    id_city: city.id || "",
    phone: center.phone || "",
  };

  const validate = (values) => {
    const errors = {};

    if (!values.name) {
      errors.name = "Le nom du centre est requis";
    }

    return errors;
  };
  const onSubmit = (values) => {
    axios.put(`http://localhost:3002/centers/center/${center.id}`, values);
    onClose();
  };

  return (
    <div className="modal p-4 bg-white rounded-lg shadow-md w-80 mx-auto mt-20">
      <h2 className="text-xl font-semibold mb-4">
        Édition du centre {center.name}
      </h2>
      <Formik initialValues={formData} validate={validate} onSubmit={onSubmit}>
        <Form>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-600">
              Nom du centre :
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
              Adresse du centre :
            </label>
            <Field
              type="text"
              name="adress"
              required
              className="mt-1 p-2 w-full border rounded focus:outline-none focus:border-blue-500"
            />

            <ErrorMessage
              name="adress"
              component="div"
              className="text-red-500"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-600">
              Ville :
            </label>
            <Field
              as="select"
              name="id_city"
              required
              className="mt-1 p-2 w-full border rounded focus:outline-none focus:border-blue-500"
            >
              <option value="" disabled>
                Sélectionnez une ville
              </option>
              {cities
                .slice()
                .sort((a, b) => a.name.localeCompare(b.name))
                .map((city) => (
                  <option key={city.id} value={city.id}>
                    {city.name} ({city.cp})
                  </option>
                ))}
            </Field>
            <ErrorMessage
              name="id_city"
              component="div"
              className="text-red-500"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-600">
              N° de téléphone du centre :
            </label>
            <Field
              type="text"
              name="phone"
              className="mt-1 p-2 w-full border rounded focus:outline-none focus:border-blue-500"
            />

            <ErrorMessage
              name="phone"
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

export default CenterEdit;
