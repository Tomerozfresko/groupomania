// import { useContext, useState } from "react";
// import { Link } from "react-router-dom";
// import { AuthContext } from "../../context/authContext";
// import "./login.scss";

// const Login = () => {

//   const [inputs, setInputs] = useState({
//     username: "",
//     password: "",
//   });

//   const [error, setError] = useState(null);


//   // receive the prev inputs object and return it with the new entred value/s 
//   const handleChange = (e) => {
//     setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }))
//   }

//   const { login } = useContext(AuthContext);

//   const handleLogin = async (e) => {
//     e.preventDefault();

//   try {
//     await login(inputs);
//   } catch (error) {
//     setError(error.response.data.message);
//   }
// };

// return (
//   <div className="login">
//     <div className="card">
//       <div className="left">
//         <h1>Groupomania</h1>
//         <span>Don't you have an account?</span>
//         <Link to="/register">
//           <button>Register</button>
//         </Link>
//       </div>
//       <div className="right">
//         <h1>Login</h1>
//         <form>
//           <input type="text" placeholder="Username" onChange={handleChange} name="username" />
//           <input type="password" placeholder="Password" onChange={handleChange} name="password" />
//           {error && error}
//           <button onClick={handleLogin}>Login</button>
//         </form>
//       </div>
//     </div>
//   </div>
// );
// };

// export default Login;


// !! working without yup
// import React from 'react';
// import { useFormik } from 'formik';
// import { useContext, useState } from "react";
// import { Link } from "react-router-dom";
// import { AuthContext } from "../../context/authContext";
// import "./login.scss";

// const validate = values => {
//   const errors = {};
//   if (!values.username) {
//     errors.username = 'Required';
//   } else if (values.username.length > 15) {
//     errors.username = 'Must be 15 characters or less';
//   }

//   if (!values.password) {
//     errors.password = 'Required';
//   } else if (values.password.length > 20) {
//     errors.password = 'Must be 20 characters or less';
//   }
//   return errors;
// };

// const Login = () => {

//   const { login } = useContext(AuthContext);

//   // Pass the useFormik() hook initial form values and a submit function that will
//   // be called when the form is submitted
//   const formik = useFormik({
//     initialValues: {
//       username: '',
//       password: '',
//     }, validate,
//     onSubmit: async (values) => {
//       console.log(values);
//       // try {
//       //   await login(values);
//       // } catch (error) {
//       //   setError(error.response.data.message);
//       // }
//       alert(JSON.stringify(values, null, 2));
//     },
//   });


//   return (
//     <div className="login">
//       <div className="card">
//         <div className="left">
//           <h1>Groupomania</h1>
//           <span>Don't you have an account?</span>
//           <Link to="/register">
//             <button>Register</button>
//           </Link>
//         </div>
//         <div className="right">
//           <h1>Login</h1>
//           <form onSubmit={formik.handleSubmit}>
//             <input
//               id="username"
//               name="username"
//               type="text"
//               placeholder="Username"
//               onChange={formik.handleChange}
//               onBlur={formik.handleBlur}
//               value={formik.values.username}
//             />
//             {formik.touched.username && formik.errors.username ? (
//               <div>{formik.errors.username}</div>
//             ) : null}
//             <input
//               id="password"
//               name="password"
//               type="password"
//               placeholder="Password"
//               onChange={formik.handleChange}
//               onBlur={formik.handleBlur}
//               value={formik.values.password}
//             />
//             {formik.touched.password && formik.errors.password ? (
//               <div>{formik.errors.password}</div>
//             ) : null}
//             <button type="submit">Submit</button>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// };
// export default Login;

// !! with yup


// !! working without yup

import React from 'react';
import { useFormik } from 'formik';
import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/authContext";
import "./login.scss";
import * as Yup from 'yup';

const Login = () => {

  const { login } = useContext(AuthContext);
  const [error, setError] = useState(null);

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    }, validationSchema: Yup.object({
      username: Yup.string()
        .max(15, 'Must be 15 characters or less')
        .min(1, 'Username must be more then 1 characters')
        .required('Required'),
      password: Yup.string()
        .max(20, 'Must be 20 characters or less')
        .min(4, 'Password must be more then 4 characters')
        .required('Required'),
    }),
    onSubmit: async (values) => {
      try {
        await login(values);
      } catch (error) {
        setError(error.response.data.message);
      }
    },
  });


  return (
    <div className="login">
      <div className="card">
        <div className="left">
          <h1>Groupomania</h1>
          <span>Don't you have an account?</span>
          <Link to="/register">
            <button>Register</button>
          </Link>
        </div>
        <div className="right">
          <h1>Login</h1>
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
            {error && error}
            <button type="submit">Submit</button>
          </form>
        </div>
      </div>
    </div>
  );
};
export default Login;