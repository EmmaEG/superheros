import React, { useState } from "react";
import styled from "styled-components";
import { ErrorMessage, Field, Form, Formik } from "formik";

import SearchResults from "../searchResults/SearchResults";

import axios from "axios";
import { toast } from "react-toastify";

const Container = styled.div`
  display: flex;
  width: 100%;
`;

const Wrapper = styled.div`
  width: inherit;
`;

// .styleInput {
//   border: 1px solid #000000;
// }

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
                <div className="input-group my-3">
                  <Field
                    className="form-control"
                    style={{ border: "1px solid #000000" }}
                    type="text"
                    name="searchHero"
                    placeholder="Search a hero"
                  />
                  <button
                    className="btn btn-outline-dark"
                    type="submit"
                    id="button-addon2"
                    disabled={!formik.isValid}
                  >
                    Search
                  </button>
                </div>
                <ErrorMessage
                  style={{
                    backgroundColor: "#4b8ead",
                    color: "#0a3f58",
                    width: "100%",
                    height: "35px",
                    textAlign: "center",
                    alignItems: "center",
                    margin: 0,
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
