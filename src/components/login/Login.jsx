import React, { useEffect } from "react";
import styled from "styled-components";
import { ToastContainer } from "react-toastify";
import { ErrorMessage, Field, Form, Formik } from "formik";
import Loading from "../Loading/Loading";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../redux/apiCalls";

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: gray;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Wrapper = styled.div`
  width: 40%;
  padding: 5% 7%;
  border-radius: 15px;
  background-color: white;
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: 300;
`;

const Input = styled.input`
  flex: 1;
  min-width: 40%;
  margin: 10px 0px;
  padding: 10px;
  min-width: -webkit-fill-available;
  max-width: -webkit-fill-available;
`;

const Button = styled.button`
  width: 100%;
  border: none;
  padding: 15px 20px;
  background-color: teal;
  color: white;
  cursor: pointer;
  margin: 10px 0px;
  &:disabled {
    color: grey;
    cursor: not-allowed;
  }
`;

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
    <Container>
      <Wrapper>
        <Title>Enter the App</Title>
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
              <Form>
                <Input type="email" name="email" placeholder="Enter an email" />
                <ErrorMessage name="email" component="p" />
                <Input
                  type="password"
                  name="password"
                  placeholder="Enter a password"
                />
                <ErrorMessage name="password" component="p" />
                <Button type="submit" disabled={!formik.isValid}>
                  LOGIN
                </Button>
              </Form>
            );
          }}
        </Formik>

        <div className="row">
          {isFetching ? (
            <div className="d-flex justify-content-center mt-5">
              <Loading />
            </div>
          ) : null}
        </div>

        <ToastContainer />
      </Wrapper>
    </Container>
  );
};

export default Login;
