import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { deleteHero } from "../../redux/teamSlice";

const Container = styled.div`
  display: flex;
  width: 100vw;
  height: calc(100vh - 60px);
`;

const Wrapper = styled.div`
  padding: 20px 150px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  background-color: #cbcfd1;
`;

const CardContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin: 10px;
  min-width: 280px;
  max-width: 280px;
  height: 350px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #ffffff;
  position: relative;
  border-radius: 10px;
`;

const CardImg = styled.img`
  height: 89%;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
`;

const CardInfo = styled.div`
  width: 100%;
  padding: 10px 10px;
  display: flex;
  justify-content: space-between;
`;

const EmptyWrapper = styled.div`
  margin: auto;
`;

const P = styled.p`
  color: #ff0000;
`;

const Team = () => {
  const team = useSelector((state) => state.team);
  const dispatch = useDispatch();

  const handleDeleteHero = (hero) => {
    // console.log(hero.biography.alignment)
    dispatch(deleteHero({ id: hero.id }));
  };

  return (
    <Container>
      {team.heroes.length === 0 ? (
        <EmptyWrapper>
          <P>For now... Your team is empty</P>
        </EmptyWrapper>
      ) : (
        <Wrapper>
          {team.heroes.map((hero) => (
            <CardContainer key={hero.id}>
              <CardImg
                src={hero.image.url}
                className="card-img-top"
                alt={hero.name}
              />
              <CardInfo>
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
              </CardInfo>
            </CardContainer>
          ))}
        </Wrapper>
      )}
    </Container>
  );
};

export default Team;
