import axios from "axios";
import { Formik, Form, Field, ErrorMessage } from "formik";

const UserEdit = ({ user, onClose }) => {
  const formData = {
    username: user.username || "",
    password: "",
    role: false,
  };
  const validate = (values) => {
    const errors = {};

    if (!values.password) {
      errors.name = "Le mot de passe est requis";
    }
    if (values.password.lenght < 3) {
      errors.password = "Mot de passe trop court";
    }
    return errors;
  };
  const onSubmit = (values) => {
    axios.put(`http://localhost:3002/users/user/${user.id}`, values);
    onClose();
  };

  return (
    <div className="modal p-4 bg-white rounded-lg shadow-md w-80 mx-auto mt-20">
      <h2 className="text-xl font-semibold mb-4">
        Édition de l&apos;utilisateur {user.username}
      </h2>
      <Formik initialValues={formData} validate={validate} onSubmit={onSubmit}>
        <Form>
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

export default UserEdit;
