import { useNavigate, Link, useLocation } from "react-router-dom";
import { useForm } from "react-hook-form";
import { DevTool } from "@hookform/devtools";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useState } from "react";

import LoginSuccess from "./LoginSuccess";
import axios from "../api/axios";

import useAuth from "../hooks/useAuth";
// import { object, string, number, date, InferType } from 'yup';

import "../styles/login.css";

//end point for the login int back-end ( the path )
const loginURL = "/login";

export default function Login() {

  const { setAuth } = useAuth;
  const location = useLocation;
  const from = location.state?.from?.pathname || "/";

  const [user, setUser] = useState();
  const [password, setPassword] = useState();


  const [loggedInUser, setLoggedInUser] = useState({
    username: null,
    password: null,
  });
  const [successLogin, setSuccessLogin] = useState(false);
  console.log(successLogin);

  

  /**
   * navigate to registration page
   */
  const navigate = useNavigate();

  function redirectToRegister() {
    navigate("/register");
  }

  /**
   * code related to form submission
   */

  //input validation(schema validation)
  const userSchema = yup.object().shape({
    username: yup
      .string()
      .required("Username is require")
      .min(5, "username is too short - should be 5 chars minimum."),
    password: yup
      .string()
      .min(5, "Password is too short - should be 5 chars minimum.")
      .required("password is require")
      .matches(/[a-z]+/, "One lowercase character")
      .matches(/[A-Z]+/, "One uppercase character")
      .matches(/[@$!%*#?&]+/, "One special character")
      .matches(/\d+/, "One number"),
  });

  //useFrom
  const { register, handleSubmit, control, formState, reset } = useForm({
    resolver: yupResolver(userSchema),
  });

  const { errors, isDirty, isValid } = formState;

  /**
   * Form submission
   * will automatically receive access to the form data through the parameter "loginData"*/
  const onSubmit = async (loginData) => {
    await setLoggedInUser((prevState) => {
      return {
        ...prevState,
        username: loginData.username,
        password: loginData.password,
      };
    });
    console.log(loggedInUser);

    if ((loggedInUser.password && loggedInUser.username) !== null) {
      setSuccessLogin(true);
    }

    //connect to back-end & submit form data to back-end
    try {
      //expected response from back end
      const response = await axios.post(
        loginURL,
        JSON.stringify({
          username: loginData.username,
          password: loginData.password,
        }),
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true
        }
      );
      console.log(JSON.stringify(response?.data));
      //console.log(JSON.stringify(response));

      setUser(loginData.username);
      setPassword(loginData.password)
      const accessToken = response?.data?.accessToken;
      const roles = response?.data?.roles;
      setAuth({ user, password,roles, accessToken });
      navigate(from, { replace: true });

      console.log(response);

      // response from the server saved  in the data property
      console.log(response.data);
      // full json object response
      console.log(JSON.stringify(response));

      // clear input from registration fields.
      reset();
    } catch (err) {
      if (!err?.response) {
        console.log("No server response");
      }
      console.log(err);
    }
  };

  return (
    <>
      {successLogin ? (
        <LoginSuccess />
      ) : (
        <div>
          <form>
            <h1>Welcome</h1>
            <span>
              <Link to="/adminLogin">Admin</Link>
            </span>
            <section className="labels-container">
              <label>
                Username: <input type="text" {...register("username")} />
              </label>
              <span className="error">{errors.username?.message}</span>
              <label>
                Password: <input type="password" {...register("password")} />
              </label>
              <span className="error">{errors.password?.message}</span>
            </section>

            <div className="buttons-container">
              <button
                type="button"
                disabled={!isDirty || !isValid} // disable prevent the from submitting if the user did not modify the fields
                onClick={handleSubmit(onSubmit)}
              >
                Login
              </button>
              <button type="button" onClick={redirectToRegister}>
                Register
              </button>
            </div>
          </form>
          <DevTool control={control} />

          <p>
            {" "}
            To use the system as guess click <Link to="/guessPage">here</Link>
          </p>
        </div>
      )}
    </>
  );
}
