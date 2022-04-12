import React, { useState } from "react";
import "./searchForm.css";
import { ErrorMessage, Field, Form, Formik } from "formik";

import SearchResults from "../searchResults/SearchResults";

import axios from "axios";
import { toast } from "react-toastify";

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
    <div className="col-lg-8 offset-lg-2 col-md-8 offset-md-2">
      <div className="row justify-content-center">
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
                  className="mb-2 p-2 text-center fw-bold bg-info"
                  name="searchHero"
                  component="p"
                />
              </Form>
            );
          }}
        </Formik>
      </div>

      <div className="row">
        <SearchResults
          superheroData={superheroData}
          setSuperheroData={setSuperheroData}
          loading={loading}
          setLoading={setLoading}
        />
      </div>
    </div>
  );
};

export default SearchForm;
