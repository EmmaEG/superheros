import React, { useState } from "react";
import styled from "styled-components";
import { ErrorMessage, Field, Form, Formik } from "formik";

import SearchResults from "../searchResults/SearchResults";

import axios from "axios";
import { toast } from "react-toastify";

const Container = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
`;

const Wrapper = styled.div`
  width: 40vw;
  justify-content: center;
  align-items: center;
`;

const Button = styled.button`
  width: 15%;
  margin-left: -1px;
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
  border-top-right-radius: 5px;
  border-bottom-right-radius: 5px;
  border: 1px solid #000000;
  color: #212529;
  padding: 5px 10px;
  transition: 2ms;
  background-color: #ffffff;
  cursor: pointer;
  &:hover {
    background-color: #212529;
  }
  &:hover {
    color: #ffffff;
  }
`;

const FomrWrapper = styled.div`
  width: 100%;
  margin-bottom: 10px;
`;

const SearchForm = () => {
  const [superheroData, setSuperheroData] = useState([]);
  const [loading, setLoading] = useState(false);

  const initialValues = {
    searchHero: "",
  };

  const onSubmit = async (values, { resetForm }) => {
    setLoading(true);
    try {
      const res = await axios.get(
        `https:////superheroapi.com/api.php/112308064467853/search/${values.searchHero}`
      );
      resetForm({});
      const data = res.data;
      // console.log("data: ", data);
      // setSuperheroData(data.results);
      if (data.response.includes("error")) {
        setLoading(false);
        toast("Superhero not exist, please try again", {
          position: "bottom-center",
          type: "error",
          autoClose: 2000,
        });
        return;
      }
      setSuperheroData(data.results);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Container>
      <Wrapper>
        <Formik
          initialValues={initialValues}
          onSubmit={onSubmit}
          validate={(values) => {
            const errors = {};
            if (!values.searchHero) {
              errors.searchHero = "Value is required";
            }
            return errors;
          }}
        >
          {(formik) => {
            return (
              <Form className="search-form">
                <FomrWrapper>
                  <Field
                    style={{
                      border: "1px solid #000000",
                      width: "85%",
                      marginInline: "0px",
                      padding: "5px",
                      borderTopLeftRadius: "5px",
                      borderBottomLeftRadius: "5px",
                      borderTopRightRadius: "0px",
                      borderBottomRightRadius: "0px",
                    }}
                    type="text"
                    name="searchHero"
                    placeholder="Search a hero"
                  />
                  <Button type="submit" disabled={!formik.isValid}>
                    Search
                  </Button>
                </FomrWrapper>
                <ErrorMessage
                  style={{
                    backgroundColor: "#4b8ead",
                    color: "#0a3f58",
                    width: "100%",
                    textAlign: "center",
                    padding: "8px",
                  }}
                  name="searchHero"
                  component="p"
                />
              </Form>
            );
          }}
        </Formik>
        <SearchResults
          superheroData={superheroData}
          setSuperheroData={setSuperheroData}
          loading={loading}
          setLoading={setLoading}
        />
      </Wrapper>
    </Container>
  );
};

export default SearchForm;
