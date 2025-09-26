import axios from "axios";
import { ErrorMessage, Field, Form, Formik } from "formik";
import AutoCompleteCenter from "../../../AutoCompleteCenter/AutoCompleteCenter";

const CenterEdit = ({ cities, onClose }) => {
  let formData = {
    name: "",
    adress: "",
    id_city: "",
    phone: "",
    city_name: "",
    city_cp: "",
  };
  let info = {};

  const validate = (values) => {
    const errors = {};

    if (!values.name) {
      errors.name = "Le nom du centre est requis";
    }

    return errors;
  };

  const handleCitySelect = (selectedPlace) => {
    const selectedCity = cities.find(
      (city) => city.name.toLowerCase() === selectedPlace.name.toLowerCase()
    );

    if (selectedCity) {
      info.id_city = selectedCity.id;
    }
    info.city_name = selectedPlace.name;
    info.city_cp = selectedPlace.cp;
  };

  const onSubmit = async (values) => {
    values = {
      ...values,
      id_city: info?.id_city,
      city_name: info?.city_name,
      city_cp: info?.city_cp,
    };
    if (!values.id_city) {
      const newCity = { name: values.city_name, cp: values.city_cp };
      const res = await axios.post(
        `http://localhost:3002/cities/city/`,
        newCity
      );
      values.id_city = res.data.id;
    }
    axios.post(`http://localhost:3002/centers/center/`, values);
    onClose();
  };

  return (
    <div className="modal p-4 bg-white rounded-lg shadow-md w-80 mx-auto mt-20">
      <h2 className="text-xl font-semibold mb-4">Ajout d&apos;un centre</h2>
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
            <AutoCompleteCenter onSelect={handleCitySelect} />
          </div>
          <Field type="hidden" name="id_city"></Field>
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
