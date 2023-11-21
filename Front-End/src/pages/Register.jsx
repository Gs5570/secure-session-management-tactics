import "../styles/login.css";
import { useNavigate } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import axios from "../api/axios";
import { useState } from "react";
import { DevTool } from "@hookform/devtools";
import { Link } from "react-router-dom";

const registerURL = "/register";


export default function Register(){

    const [registerSuccess, setRegisterSuccess] = useState(false)
    const [errMsg, setErrMsg] = useState("");
    const[registeredUser, setRegisteredUser] = useState(
        {
            username: null,
            firstName: null,
            lastName: null,
            email: null,
            password: null,
            confPassword: null
        })

  //end point for the login int back-end ( the path )
 

  const navigate = useNavigate();

  function redirectToLogin() {
    navigate("/");
  }

  /**
   * code related to form submission
   */

  //useFrom

  //input validation(schema validation)
  const registerSchema = yup.object().shape({
    username: yup
      .string()
      .required("Username is required")
      .min(5, "username is too short - should be 5 chars minimum."),
    password: yup
      .string()
      .min(5, "Password is too short - should be 5 chars minimum.")
      .required("password is required")
      .matches(/[a-z]+/, "One lowercase character")
      .matches(/[A-Z]+/, "One uppercase character")
      .matches(/[@$!%*#?&]+/, "One special character")
      .matches(/\d+/, "One number"),
    confirmedPassword: yup
      .string()
      .oneOf([yup.ref("password"), null])
      .required("confirm password is required"),
  });

  //useFrom
  const { register, handleSubmit, formState, reset, control } = useForm({
    resolver: yupResolver(registerSchema),
  });

  const { errors, isDirty, isValid } = formState;

  /**
   * Form submission
   * will automatically receive access to the form data through the parameter "registeredUser"*/
  const onSubmit = async (registeredData) => {
    console.log("formsubmitted");
    await setRegisteredUser((prevState) => {
      return {
        ...prevState,
        username: registeredData.username,
        firstName: registeredData.firstName,
        lastName: registeredData.lastName,
        email: registeredData.username,
        password: registeredData.password,
        confPassword: registeredData.confirmedPassword,
      };
    });

    // reset();
    // redirectToLogin();

         //connect to back-end & submit form data to back-end need 
        try{
            //expected response from back end
            const response = await axios.post(registerURL, 
                JSON.stringify(
                    {
                        username: registeredUser.username, 
                        password: registeredUser.password,
                        // firstName: registeredUser.firstName,
                        // lastName: registeredUser.lastName,
                        // email: registeredUser.email,
                        // confPassword: registeredUser.confPassword  
                
                    }),
                {
                    Headers: { 'Content-Type': 'application/json'},
                    withCredentials: true
                }
            )

            setRegisterSuccess(true)
            
            // response from the server saved  in the data property
            console.log(response.data)
            // full json object response
            console.log(JSON.stringify(response));
            
            // clear input from registration fields.
            reset();

        }catch(err){

            if(!err?.response){
                console.log('No server response');
            }else if (err.response?.status === 409) {
                setErrMsg("Username Taken");
              } else {
                setErrMsg("Registration Failed");
              }
            console.log(err);
        }

    }

  console.log(registeredUser);

  return (
    <div>
      <form>
        <h1>Welcome</h1>
        <span>
          <p>Please Register</p>
        </span>
        <section className="labels-container">
          <label>
            Username: <input type="text" {...register("username")} />
          </label>
          <span className="error">{errors.username?.message}</span>
          <label>
            First Name: <input type="text" {...register("firstName")} />
          </label>
          <span className="error">{errors.firstName?.message}</span>
          <label>
            Last Name: <input type="text" {...register("lastName")} />
          </label>
          <span className="error">{errors.lastName?.message}</span>
          <label>
            email: <input type="text" {...register("email")} />
          </label>
          <span className="error">{errors.email?.message}</span>
          <label>
            Password: <input type="text" {...register("password")} />
          </label>
          <span className="error">{errors.password?.message}</span>
          <label>
            confirmPassword:{" "}
            <input type="text" {...register("confirmedPassword")} />
          </label>
          <span className="error">{errors.confirmedPassword?.message}</span>
        </section>

        <div className="buttons-container">
          <button
            type="button"
            // disabled={!isDirty || !isValid}
            onClick={handleSubmit(onSubmit)}
          >
            {" "}
            Register{" "}
          </button>
        </div>
      </form>
      <DevTool control={control} />
    </div>
  );
}
