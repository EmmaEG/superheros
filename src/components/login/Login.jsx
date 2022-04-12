import React, { useEffect } from "react";
import "./login.css";
import { ToastContainer } from "react-toastify";

import { ErrorMessage, Field, Form, Formik } from "formik";
import Loading from "../Loading/Loading";

import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../redux/apiCalls";

const Login = () => {
  const history = useHistory(); 
  const dispatch = useDispatch();
  const { isFetching } = useSelector((state) => state.user);

  const initialValues = {
    email: "",
    password: "",
  };

  const onSubmit = (values) => {
    login(dispatch, { email: values.email, password: values.password });
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      history.push("/home");
    }
  }, [isFetching, history]);


  return (
    <div className="container-fluid mt-5">
      <div className="row">
        <div className="col-lg-6 offset-lg-3 col-md-8 offset-md-2 col-sm-10 offset-sm-1">
          <h1 className="text-center mb-5">Enter the App</h1>

          <div className="card border-2 mt-2">
            <Formik
              initialValues={initialValues}
              onSubmit={onSubmit}
              validate={(values) => {
                const errors = {};
                if (!values.email) {
                  errors.email = "Email is required";
                } else if (
                  !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
                ) {
                  errors.email = "Invalid email address";
                }
                if (!values.password) {
                  errors.password = "Password is required";
                } else if (
                  values.password.length < 5 ||
                  values.password.length > 5
                ) {
                  errors.password = "password must be 5 characters";
                }
                return errors;
              }}
            >
              {(formik) => {
                return (
                  <Form className="p-4">
                    <div className="mb-3">
                      <label className="form-label">Email address</label>
                      <Field
                        className="form-control mb-2"
                        type="email"
                        name="email"
                        placeholder="Enter an email"
                      />
                      <ErrorMessage
                        className="mb-2 p-2 text-center fw-bold bg-info"
                        name="email"
                        component="p"
                      />
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Password</label>
                      <Field
                        className="form-control mb-2"
                        type="password"
                        name="password"
                        placeholder="Enter a password"
                      />
                      <ErrorMessage
                        className="mb-2 p-2 text-center fw-bold bg-info"
                        name="password"
                        component="div"
                      />
                    </div>
                    <button
                      type="submit"
                      className="btn"
                      disabled={!formik.isValid}
                      style={{ background: "cadetblue" }}
                    >
                      Log in
                    </button>
                  </Form>
                );
              }}
            </Formik>
          </div>
          <div className="row">
            {isFetching ? (
              <div className="d-flex justify-content-center mt-5">
                <Loading />
              </div>
            ) : null}
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Login;
