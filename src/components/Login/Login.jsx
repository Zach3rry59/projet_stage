import { Formik, Form, Field, ErrorMessage } from "formik";
import { useAuth } from "../../hooks/useAuth";

const Login = () => {
  const { login } = useAuth();
  const formData = {
    username: "",
    password: "",
  };

  const validate = (values) => {
    const errors = {};

    if (!values.username) {
      errors.username = "Le nom d'utilisateur est requis.";
    }
    if (!values.password) {
      errors.password = "Le mot de passe est requis.";
    }

    return errors;
  };
  return (
    <div className={`main flex justify-center py-12 px-4 sm:px-6 lg:px-8`}>
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className={`mt-6 text-center text-3xl font-extrabold `}>
            Connexion à l&apos;application
          </h2>
        </div>
        <Formik initialValues={formData} validate={validate} onSubmit={login}>
          <Form className="mt-8 space-y-6">
            <div>
              <label htmlFor="username" className={`block text-sm font-medium`}>
                Nom d&apos;utilisateur
              </label>
              <Field
                type="text"
                name="username"
                autoComplete="username"
                required
                className="mt-1 block w-full shadow-sm sm:text-sm focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md"
              />
              <ErrorMessage
                name="username"
                component="div"
                className="text-red-500"
              />
            </div>
            <div>
              <label htmlFor="password" className={`block text-sm font-medium`}>
                Mot de passe
              </label>
              <Field
                type="password"
                name="password"
                autoComplete="current-password"
                required
                className="mt-1 block w-full shadow-sm sm:text-sm focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md"
              />
              <ErrorMessage
                name="password"
                component="div"
                className="text-red-500"
              />
            </div>
            <div>
              <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Se connecter
              </button>
            </div>
          </Form>
        </Formik>
      </div>
    </div>
  );
};

export default Login;
