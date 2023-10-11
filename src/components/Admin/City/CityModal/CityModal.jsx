import { useFormik } from "formik";

const CityEditModal = ({ city = null, onClose }) => {
  const formik = useFormik({
    initialValues: {
      name: city?.name || "",
    },
    validate: (values) => {
      const errors = {};

      if (!values.name) {
        errors.name = "Le nom de la ville est requis";
      }

      return errors;
    },
    onSubmit: (values) => {
      console.log(city?qQ<Q<a<  .id, values);
      onClose();
    },
  });

  if (city === null) {
    return (
      <div className="modal p-4 bg-white rounded-lg shadow-md w-80 mx-auto mt-20">
        <h2 className="text-xl font-semibold mb-4">Ajout de Ville</h2>
        <form onSubmit={formik.handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-600">
              Nom de la Ville:
            </label>
            <input
              type="text"
              name="name"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.name}
              className="mt-1 p-2 w-full border rounded focus:outline-none focus:border-blue-500"
            />
            {formik.touched.name && formik.errors.name ? (
              <div className="text-red-500 text-sm mt-1">
                {formik.errors.name}
              </div>
            ) : null}
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
        </form>
      </div>
    );
  }
  return (
    <div className="modal p-4 bg-white rounded-lg shadow-md w-80 mx-auto mt-20">
      <h2 className="text-xl font-semibold mb-4">
        Édition de la Ville {city.name}
      </h2>
      <form onSubmit={formik.handleSubmit}>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-600">
            Nom de la Ville:
          </label>
          <input
            type="text"
            name="name"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.name}
            className="mt-1 p-2 w-full border rounded focus:outline-none focus:border-blue-500"
          />
          {formik.touched.name && formik.errors.name ? (
            <div className="text-red-500 text-sm mt-1">
              {formik.errors.name}
            </div>
          ) : null}
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
      </form>
    </div>
  );
};

export default CityEditModal;
