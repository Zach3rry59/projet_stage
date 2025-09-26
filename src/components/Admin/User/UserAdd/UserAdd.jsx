import axios from "axios";
import { Formik, Form, Field, ErrorMessage } from "formik";

const UserAdd = ({ onClose, users }) => {
  const formData = {
    username: "",
    password: "",
    role: false,
  };
  const validate = (values) => {
    const errors = {};

    if (!values.username) {
      errors.username = "Le nom d'utilisateur est requis";
    }
    if (
      users.some(
        (user) => user.username.toLowerCase() === values.username.toLowerCase()
      )
    ) {
      errors.username = "Le nom d'utilisateur est déjà utilisé";
    }
    if (!values.password) {
      errors.password = "Le mot de passe est requis";
    }
    return errors;
  };
  const onSubmit = (values) => {
    values.username = values.username.toLowerCase();
    axios.post(`http://localhost:3002/users/user/`, values);
    onClose();
  };

  return (
    <div className="modal p-4 bg-white rounded-lg shadow-md w-80 mx-auto mt-20">
      <h2 className="text-xl font-semibold mb-4">
        Ajout d&apos;un utilisateur
      </h2>
      <Formik initialValues={formData} validate={validate} onSubmit={onSubmit}>
        <Form>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-600">
              Nom d&apos;utilisateur :
            </label>
            <Field
              type="text"
              name="username"
              required
              className="mt-1 p-2 w-full border rounded focus:outline-none focus:border-blue-500"
            />

            <ErrorMessage
              name="username"
              component="div"
              className="text-red-500"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-600">
              Mot de passe :
            </label>
            <Field
              type="text"
              name="password"
              required
              className="mt-1 p-2 w-full border rounded focus:outline-none focus:border-blue-500"
            />

            <ErrorMessage
              name="password"
              component="div"
              className="text-red-500"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-600">
              est un admin :
            </label>
            <Field
              type="checkbox"
              name="role"
              className="mt-1 p-2 w-full border rounded focus:outline-none focus:border-blue-500"
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

export default UserAdd;
