import React from "react";
import "./team.css";

import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { deleteHero } from "../../redux/teamSlice";

const Team = () => {
  const team = useSelector((state) => state.team);
  const dispatch = useDispatch();

  const handleDeleteHero = (hero) => {
    // console.log(hero.biography.alignment)
    dispatch(deleteHero({ id: hero.id }));
  };

  return (
    <div>
    {team.heroes.length === 0 ? (
        <div className="d-flex justify-content-center mt-5">
                    <p className="message mt-5">For now... Your team is empty</p>
        </div>
      ) : (
      <div className="mt-4">
        <div className="row">
          {team.heroes.map((hero) => (
            <div key={hero.id} className="col-12 col-md-6 col-lg-4 mb-4">
              <div className="card" style={{ width: "18rem" }}>
                <img
                  style={{ height: "50vh" }}
                  src={hero.image.url}
                  className="card-img-top"
                  alt={hero.name}
                />
                <div className="card-body d-flex justify-content-between">
                  <h5 className="card-title">{hero.name}</h5>
                  <button
                    className="btn btn-danger"
                    onClick={() => handleDeleteHero(hero)}
                  >
                    -
                  </button>
                  <Link to={`/details/${hero.id}`}>
                    <button className="btn btn-info">+</button>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>)}
      </div>
  );
};

export default Team;
