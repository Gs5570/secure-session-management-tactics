import '../styles/login.css';
import { useNavigate } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import axios from '../api/axios';
import { useState } from 'react';
import { DevTool } from '@hookform/devtools';
import { Link } from 'react-router-dom';

import AdminPage from './AdminPage';

const registerURL = '/register/admin';

export default function RegisterAdmin() {
  const [registerSuccess, setRegisterSuccess] = useState(false);
  const [errMsg, setErrMsg] = useState('');
  const [registeredAdmin, setRegisteredAdmin] = useState({
    username: null,
    firstName: null,
    lastName: null,
    email: null,
    password: null,
    confPassword: null,
  });

  const navigate = useNavigate();

  function redirectToLogin() {
    navigate('/');
  }

  /**
   * code related to form submission
   */

  //useFrom

  //input validation(schema validation)
  const registerSchema = yup.object().shape({
    username: yup
      .string()
      .required('Username is required')
      .min(5, 'username is too short - should be 5 chars minimum.'),
    password: yup
      .string()
      .min(5, 'Password is too short - should be 5 chars minimum.')
      .required('password is required')
      .matches(/[a-z]+/, 'One lowercase character')
      .matches(/[A-Z]+/, 'One uppercase character')
      .matches(/[@$!%*#?&]+/, 'One special character')
      .matches(/\d+/, 'One number'),
    confirmedPassword: yup
      .string()
      .oneOf([yup.ref('password'), null])
      .required('confirm password is required'),
  });

  //useFrom
  const { register, handleSubmit, formState, reset, control } = useForm({
    resolver: yupResolver(registerSchema),
  });

  const { errors, isDirty, isValid } = formState;

  /**
   * Form submission
   * will automatically receive access to the form data through the parameter "registeredAdmin"*/
  const onSubmit = async (registeredData) => {
    console.log('formsubmitted');
    await setRegisteredAdmin((prevState) => {
      return {
        ...prevState,
        username: registeredData.username,
        password: registeredData.password,
        confPassword: registeredData.confirmedPassword,
      };
    });

    // reset();
    // redirectToLogin();

    //connect to back-end & submit form data to back-end need
    try {
      //expected response from back end
      const response = await axios.post(
        registerURL,
        JSON.stringify({
          username: registeredAdmin.username,
          password: registeredAdmin.password,
          // firstName: registeredAdmin.firstName,
          // lastName: registeredAdmin.lastName,
          // email: registeredAdmin.email,
          // confPassword: registeredAdmin.confPassword
        }),
        {
          headers: { 'Content-Type': 'application/json' },
          // withCredentials: true
        }
      );

      //   setRegisterSuccess(true);
      if ((registeredData.password && registeredData.username) !== null) {
        setRegisterSuccess(true);
      }

      // response from the server saved  in the data property
      console.log(response.data);
      // full json object response
      console.log(JSON.stringify(response));

      // clear input from registration fields.
      reset();
    } catch (err) {
      if (!err?.response) {
        console.log('No server response');
      } else if (err.response?.status === 409) {
        setErrMsg('Username Taken');
      } else {
        setErrMsg('Registration Failed');
      }
      console.log(err);
    }
  };

  console.log(registeredAdmin);

  return (
    <>
      {registerSuccess ? (
        <AdminPage />
      ) : (
        <div>
          <form>
            <h1>Welcome</h1>
            <span>
              <p>Register as an Admin</p>
            </span>
            <section className="labels-container">
              <label>
                Username: <input type="text" {...register('username')} />
              </label>
              <span className="error">{errors.username?.message}</span>

              <label>
                Password: <input type="text" {...register('password')} />
              </label>
              <span className="error">{errors.password?.message}</span>
              <label>
                confirmPassword:{' '}
                <input type="text" {...register('confirmedPassword')} />
              </label>
              <span className="error">{errors.confirmedPassword?.message}</span>
            </section>

            <div className="buttons-container">
              <button
                type="button"
                // disabled={!isDirty || !isValid}
                onClick={handleSubmit(onSubmit)}
              >
                Register
              </button>
            </div>
          </form>
        </div>
      )}
    </>
  );
}
