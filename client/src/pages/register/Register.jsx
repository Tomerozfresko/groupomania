import { Link } from "react-router-dom";
import { useFormik } from 'formik';
import { useState, useContext } from "react";
import { AuthContext } from "../../context/authContext";
import * as Yup from 'yup';
import "./register.scss";

const Register = () => {

  const { register } = useContext(AuthContext);
  const [error, setError] = useState(null);

  const formik = useFormik({
    initialValues: {
      username: '',
      email: '',
      password: '',
      name: '',
    }, validationSchema: Yup.object({
      username: Yup
        .string()
        .max(15, 'Username must be 15 characters or less')
        .min(4, 'Username must be more then 4 characters')
        .required('Username is required'),
      email: Yup
        .string()
        .email('Invalid email address')
        .required('Email is required'),
      password: Yup
        .string()
        .max(20, 'Password must be 20 characters or less')
        .min(4, 'Password must be more then 4 characters')
        .trim('Cannot contain spaces')
        .required('Password is required'),
      name: Yup
        .string()
        .max(15, 'Must be 15 characters or less')
        .min(4, 'Name must be more then 4 characters')
        .required('Name is required'),
    }),
    onSubmit: async (values) => {
      try {
        await register(values)
      } catch (error) {
        setError(error.response.data.message);
      }
    },
  });

  return (
    <div className="register" >
      <div className="card">
        <div className="left">
          <h1>Groupomania</h1>
          <span>Do you have an account?</span>
          <Link to="/login">
            <button>Login</button>
          </Link>
        </div>
        <div className="right">
          <h1>Register</h1>
          <form onSubmit={formik.handleSubmit}>
            <input
              id="username"
              name="username"
              type="text"
              placeholder="Username"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.username}
            />
            {formik.touched.username && formik.errors.username ? (
              <div className="err">{formik.errors.username}</div>
            ) : null}
            <input
              id="email"
              name="email"
              type="email"
              placeholder="Email"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.email}
            />
            {formik.touched.email && formik.errors.email ? (
              <div className="err">{formik.errors.email}</div>
            ) : null}
            <input
              id="password"
              name="password"
              type="password"
              placeholder="Password"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.password}
            />
            {formik.touched.password && formik.errors.password ? (
              <div className="err">{formik.errors.password}</div>
            ) : null}
            <input
              id="name"
              name="name"
              type="name"
              placeholder="Name"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.name}
            />
            {formik.touched.name && formik.errors.name ? (
              <div className="err"> {formik.errors.name}</div>
            ) : null}
            {error && error}
            <button>Register</button>
          </form>
        </div>
      </div>
    </div >
  );
};

export default Register;
