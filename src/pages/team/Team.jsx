import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { deleteHero } from "../../redux/teamSlice";

const Container = styled.div`
  background-color: gray;
  display: grid;
  display: flex;
  justify-content: center;
  height: calc(100vh - 60px);
`;

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 0fr);
  grid-gap: 30px;
  justify-content: center;
  align-items: center;
  padding: 50px;
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
  height: 85%;
  width: -webkit-fill-available;
  object-fit: fill;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
`;

const CardInfo = styled.div`
  width: 100%;
  padding: 10px 10px;
  display: flex;
  justify-content: space-between;
`;

const CardButtons = styled.div`
  justify-content: center;
  align-items: center;
  display: flex;
  text-align: center;
`;

const DeleteButton = styled.button`
  color: #ffffff;
  background-color: #dc3545;
  border-color: #dc3545;
  height: 35px;
  width: 35px;
  display: inline-block;
  font-size: 15px;
  padding: 7px 10px;
  border: none;
  border-radius: 5px;
  margin-inline: 5px;
  position: relative;
  transition: 2ms;
  &:hover {
    background-color: #c72534;
  }
`;

const AddButton = styled.button`
  color: #ffffff;
  background-color: #0dcaf0;
  border-color: #dc3545;
  height: 35px;
  width: 35px;
  display: inline-block;
  font-size: 15px;
  padding: 7px 10px;
  border: none;
  border-radius: 5px;
  margin-inline: 5px;
  position: relative;
  transition: 2ms;
  &:hover {
    background-color: #06b9dd;
  }
`;

const Span = styled.span``;

const EmptyWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: inherit;
`;

const H5 = styled.h5`
  color: #000000;
  margin: auto;
`;

const H4 = styled.h4`
  color: #ffffff;
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
          <H4>For now... Your team is empty</H4>
        </EmptyWrapper>
      ) : (
        <Wrapper>
          {team.heroes.map((hero) => (
            <CardContainer key={hero.id}>
              <CardImg src={hero.image.url} alt={hero.name} />
              <CardInfo>
                <H5>{hero.name}</H5>
                <CardButtons>
                  <DeleteButton onClick={() => handleDeleteHero(hero)}>
                    <Span>-</Span>
                  </DeleteButton>
                  <Link to={`/details/${hero.id}`}>
                    <AddButton>
                      <Span>+</Span>
                    </AddButton>
                  </Link>
                </CardButtons>
              </CardInfo>
            </CardContainer>
          ))}
        </Wrapper>
      )}
    </Container>
  );
};

export default Team;
