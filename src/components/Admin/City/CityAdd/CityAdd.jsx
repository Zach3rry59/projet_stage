import axios from "axios";
import { Formik, Form, Field, ErrorMessage } from "formik";
import AutoCompleteCity from "../../../AutoCompleteCity/AutoCompleteCity";
import { useState } from "react";

const CityAdd = ({ onClose, cities }) => {
  const [selectedCity, setSelectedCity] = useState({
    name: "",
    cp: "",
  });

  const handleCitySelect = (selectedPlace) => {
    setSelectedCity(selectedPlace);
  };

  const validate = () => {
    const errors = {};

    if (!selectedCity.name) {
      errors.name = "Le nom de la ville est requis";
    }
    if (
      cities.some(
        (city) => city.name.toLowerCase() === selectedCity.name.toLowerCase()
      )
    ) {
      errors.name = "La ville est déjà dans la base de données";
    }
    return errors;
  };

  const onSubmit = () => {
    selectedCity.name =
      selectedCity.name.charAt(0).toUpperCase() + selectedCity.name.slice(1);
    axios.post(`http://localhost:3002/cities/city/`, selectedCity);
    onClose();
  };

  return (
    <div className="modal p-4 bg-white rounded-lg shadow-md w-80 mx-auto mt-20">
      <h2 className="text-xl font-semibold mb-4">Ajout d&apos;une ville</h2>
      <Formik
        initialValues={selectedCity}
        validate={validate}
        onSubmit={onSubmit}
      >
        <Form>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-600">
              Nom de la Ville:
            </label>
            <AutoCompleteCity onSelect={handleCitySelect} validate={validate} />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-600">
              Code postal de la Ville:
            </label>
            <Field
              type="text"
              name="cp"
              readOnly
              value={selectedCity.cp}
              className="mt-1 p-2 w-full border rounded focus:outline-none focus:border-blue-500"
            />
            <ErrorMessage name="cp" component="div" className="text-red-500" />
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

export default CityAdd;
