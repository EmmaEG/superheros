import React from "react";
import { toast } from "react-toastify";

import { useDispatch, useSelector } from "react-redux";

import Loading from "../../components/Loading/Loading";

import { addHero } from "../../redux/teamSlice";

import "./searchResults.css";

const SearchResults = ({ superheroData, loading }) => {
  const dispatch = useDispatch();
  const team = useSelector((state) => state.team);

  const handleAddHero = (hero) => {
    const heroId = hero.id;
    const alignment = hero.biography.alignment;
    if (alignment === "neutral") {
      toast("You can't add neutral heroes in your team", {
        position: "bottom-center",
        style: {
          textAlign: "center",
        },
        type: "error",
        autoClose: 3000,
      });
      return;
    }
    for (let i = 0; i < team.heroes.length; i++) {
      if (team.heroes[i].id === heroId) {
        toast(
          "This hero already exist in your team, you can't add the same hero twice",
          {
            position: "bottom-center",
            style: {
              textAlign: "center",
            },
            type: "error",
            autoClose: 3000,
          }
        );
        return;
      } else {
        const alignmentArray = team.heroes.filter(
          (e) => e.biography.alignment === alignment
        );
        if (alignmentArray.length === 3) {
          toast("you can't add more heroes in this alignment", {
            position: "bottom-center",
            style: {
              textAlign: "center",
            },
            type: "error",
            autoClose: 3000,
          });
          return;
        }
      }
    }
    dispatch(addHero(hero));
  };

  return (
    <div>
      {loading ? (
        <div className="d-flex justify-content-center mt-5">
          <Loading />
        </div>
      ) : (
        <ul className="list-group">
          {superheroData.map((hero) => (
            <li
              className="list-group-item d-flex justify-content-between align-items-center m-2"
              key={hero.id}
            >
              <div className="d-flex justify-content-between align-items-center">
                <img
                  className="rounded"
                  src={hero.image.url}
                  alt={hero.name}
                  width="70"
                />
                <p className="m-2"> {hero.name} - </p>

                {hero.biography.alignment === "good" && (
                  <p className="badge bg-success my-2 text-uppercase">
                    {hero.biography.alignment}
                  </p>
                )}

                {hero.biography.alignment === "neutral" && (
                  <p className="badge bg-secondary my-2 text-uppercase">
                    {hero.biography.alignment}
                  </p>
                )}

                {hero.biography.alignment === "bad" && (
                  <p className="badge bg-danger my-2 text-uppercase">
                    {hero.biography.alignment}
                  </p>
                )}
              </div>
              {/* to pass only one hero we need ()=> function() we can't pass only one hero by this form onClick={function()} */}
              <button
                className="btn btn-dark"
                onClick={() => handleAddHero(hero)}
              >
                +
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchResults;
