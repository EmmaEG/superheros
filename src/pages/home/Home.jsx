import React from "react";
import SearchForm from "../../components/search/SearchForm";

const Home = () => {
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col text-center mt-4">
          <h3>Hey buddy, here you can build your team</h3>
          <p>You must choose 3 good and 3 bad heroes</p>
        </div>
      </div>
      <div className="row">
        <SearchForm />
      </div>
    </div>
  );
};

export default Home;
