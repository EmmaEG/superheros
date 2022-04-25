import React, { useEffect } from "react";
import styled from "styled-components";
import { ToastContainer } from "react-toastify";
import { ErrorMessage, Field, Form, Formik } from "formik";
import Loading from "../Loading/Loading";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../redux/apiCalls";
import { mobile } from '../../responsive'

const Container = styled.div`
  width: 100vw;
  height: calc(100vh - 60px);
  background-color: gray;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-size: cover;

  ${mobile({ height: "100vh" })}

`;

const Wrapper = styled.div`
  width: 30vw;
  padding: 20px;
  border-radius: 10px;
  background-color: white;
  position: absolute;
  ${mobile({ width: "75vw" })}
`;

const Title = styled.h1`
  font-size: 28px;
  font-weight: 300;
  text-align: center;
`;

const Button = styled.button`
  width: 100%;
  border: none;
  border-radius: 5px;
  padding: 15px 20px;
  background-color: #0a3f58;
  color: white;
  cursor: pointer;
  margin: 10px 0px;
  transition: 2ms;
  &:disabled {
    background-color: #818080;
    cursor: no-drop;
    &:hover {
      background-color: #818080;
    }
  }
  &:hover {
    background-color: #052e41;
  }
`;

const LoadingWrapper = styled.div`
  width: 100vw;
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
                <Field
                  style={{
                    width: "-webkit-fill-available",
                    margin: "10px 0px",
                    padding: "10px",
                  }}
                  type="email"
                  name="email"
                  placeholder="Enter an email"
                />
                <ErrorMessage
                  name="email"
                  component="p"
                  style={{
                    color: "#0a3f58",
                    width: "100%",
                    textAlign: "center",
                    margin: 0,
                  }}
                />
                <Field
                  style={{
                    width: "-webkit-fill-available",
                    margin: "10px 0px",
                    padding: "10px",
                  }}
                  type="password"
                  name="password"
                  placeholder="Enter a password"
                />
                <ErrorMessage
                  name="password"
                  component="p"
                  style={{
                    color: "#0a3f58",
                    width: "100%",
                    textAlign: "center",
                    margin: 0,
                  }}
                />
                <Button type="submit" disabled={!formik.isValid}>
                  LOGIN
                </Button>
              </Form>
            );
          }}
        </Formik>
      </Wrapper>
      <LoadingWrapper>{isFetching ? <Loading /> : null}</LoadingWrapper>
      <ToastContainer />
    </Container>
  );
};

export default Login;
