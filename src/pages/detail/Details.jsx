import { useHistory } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import "./details.css";
import { useLocation } from "react-router-dom";
import Loading from "../../components/Loading/Loading";

const Details = () => {
  const history = useHistory();
  const [heroDetails, setHeroDetails] = useState([]);
  const location = useLocation(); // location captures current url
  const id = location.pathname.split("/")[2];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(
          `https:////superheroapi.com/api.php/112308064467853/${id}`
        );
        const data = res.data;
        setHeroDetails(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [id]);

 

  return (
    <div className="container p-4">
      <div className="row">
          {heroDetails.response === "success" ? (
            <div
              key={heroDetails.id}
              className="d-flex justify-content-between"
            >
              <img
                style={{ height: "70vh" }}
                src={heroDetails.image.url}
                alt={heroDetails.name}
                id="detailsImg"
                draggable={false}
              />
              <div id="details">
                <h1 id="heroTitle">{heroDetails.name}</h1>
                <hr />
                <p className="info">
                  <strong>Peso:</strong> {heroDetails.appearance.weight[1]}
                </p>
                <p className="info">
                  <strong>Altura:</strong> {heroDetails.appearance.height[1]}
                </p>
                <p className="info">
                  <strong>Nombre completo:</strong>{" "}
                  {heroDetails.biography["full-name"]}
                </p>
                <p className="info">
                  <strong>Alias:</strong>{" "}
                  {heroDetails.biography["aliases"].join(", ")}
                </p>
                <p className="info">
                  <strong>Color de ojos:</strong>{" "}
                  {heroDetails.appearance["eye-color"]}
                </p>
                <p className="info">
                  <strong>Color de pelo:</strong>{" "}
                  {heroDetails.appearance["hair-color"]}
                </p>
                <p className="info">
                  <strong>Lugar de trabajo:</strong> {heroDetails.work.base}
                </p>
              </div>
              <div>
                <button
                  className="btn btn-dark back"
                  onClick={() => history.goBack()}
                >
                  Regresar
                </button>
              </div>
            </div>
          ) : (
            <div className="d-flex justify-content-center">
              <Loading />
            </div>
          )}
        </div>
    </div>
  );
};

export default Details;
