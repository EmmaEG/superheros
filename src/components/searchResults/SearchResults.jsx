import React from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { addHero } from "../../redux/teamSlice";
import Loading from "../../components/Loading/Loading";
import { toast } from "react-toastify";

const Container = styled.div``;

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const LoadingWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 50vh;
`;

const Ul = styled.ul`
  width: 100%;
  padding: 7px;
`;

const Li = styled.li`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 10px 0px;
  border: 0.5px solid #000000;
  border-radius: 5px;
  padding-right: 5px;
`;

const LiWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Img = styled.img`
  width: 80px;
  border-bottom-left-radius: 5px;
  border-top-left-radius: 5px;
`;

const Button = styled.button`
  border: none;
  height: 40px;
  width: 40px;
  color: #ffffff;
  background-color: #000000;
  border-radius: 5px;
  cursor: pointer;
  transition: 2ms;
  &:hover {
    background-color: #000000e6;
  }
`;

const P = styled.p`
  margin: 2px;
`;

const LiGoodAlignment = styled.p`
  background-color: #198754;
  margin: 2px;
  font-size: 13px;
  font-weight: bold;
  padding: 2px 5px;
  border-radius: 5px;
  text-transform: uppercase;
`;

const LiBadAlignment = styled.p`
  background-color: #dc3545;
  margin: 2px;
  font-size: 13px;
  font-weight: bold;
  padding: 2px 5px;
  border-radius: 5px;
  text-transform: uppercase;
`;

const LiNeutralAlignment = styled.p`
  background-color: #5a5657;
  margin: 2px;
  font-size: 13px;
  font-weight: bold;
  padding: 2px 5px;
  border-radius: 5px;
  text-transform: uppercase;
`;

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
    toast("Ok", {
      position: "bottom-left",
      style: {
        textAlign: "center",
        width: "20%",
        backgroundColor: "#198754",
      },
      type: "success",
      autoClose: 1000,
    });
  };

  return (
    <Container>
      {loading ? (
        <LoadingWrapper>
          <Loading />
        </LoadingWrapper>
      ) : (
        <Wrapper>
          <Ul>
            {superheroData.map((hero) => (
              <Li key={hero.id}>
                <LiWrapper>
                  <Img src={hero.image.url} alt={hero.name} />
                  <P> {hero.name} - </P>

                  {hero.biography.alignment === "good" && (
                    <LiGoodAlignment>
                      {hero.biography.alignment}
                    </LiGoodAlignment>
                  )}

                  {hero.biography.alignment === "neutral" && (
                    <LiNeutralAlignment>
                      {hero.biography.alignment}
                    </LiNeutralAlignment>
                  )}

                  {hero.biography.alignment === "bad" && (
                    <LiBadAlignment>{hero.biography.alignment}</LiBadAlignment>
                  )}
                </LiWrapper>
                {/* to pass only one hero we need ()=> function() we can't pass only one hero by this form onClick={function()} */}
                <Button
                  className="btn btn-dark"
                  onClick={() => handleAddHero(hero)}
                >
                  +
                </Button>
              </Li>
            ))}
          </Ul>
        </Wrapper>
      )}
    </Container>
  );
};

export default SearchResults;
