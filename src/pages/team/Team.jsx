import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { mobile } from "../../responsive";
import { deleteHero } from "../../redux/teamSlice";

const Container = styled.div`
  ${mobile({
    marginTop: "40px;",
  })}
`;

const Wrapper = styled.div`
  background-color: #808080;
  padding: 3px;
  display: flex;
  flex-direction: column;
  ${mobile({
    backgroundColor: "#ffffff",
  })}
`;

const CardWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 0fr);
  justify-content: center;
  padding: 50px;
  flex-wrap: wrap;

  ${mobile({
    display: "flex",
    width: "-webkit-fill-available",
    height: "100vh",
  })}
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
  ${mobile({
    backgroundColor: "#cfcbcb",
  })}
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
  cursor: pointer;
  transition: 2ms;
  &:hover {
    background-color: #c72534;
  }
`;

const DetailButton = styled.button`
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
  transition: 2ms;
  cursor: pointer;
  &:hover {
    background-color: #06b9dd;
  }
`;

const Span = styled.span``;

const EmptyWrapper = styled.div`
  background-color: #808080;
  display: flex;
  justify-content: center;
  align-items: center;
  height: calc(100vh - 60px);

  ${mobile({ textAlign: "center", height: "100vh" })}
`;

const H5 = styled.h5`
  color: #000000;
  margin: auto;
`;

const H4 = styled.h4`
  color: #ffffff;
  ${mobile({ width: "90%" })}
`;

const TitleWrapper = styled.div`
  text-align: center;
  margin-top: 40px;
`;

const Title = styled.h3`
  color: #ffffff;
  ${mobile({
    color: "#000000",
  })}
`;

const SubTitle = styled.p`
  color: #ffffff;
  ${mobile({
    color: "#000000",
  })}
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
          <H4>
            For now... Your team is empty, go home page and search your hero
          </H4>
        </EmptyWrapper>
      ) : (
        <Wrapper>
          <TitleWrapper>
            <Title>Hey buddy, here you can see your team</Title>
            <SubTitle>You can see your hero details and delete heroes</SubTitle>
          </TitleWrapper>
          <CardWrapper>
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
                      <DetailButton>
                        <Span>+</Span>
                      </DetailButton>
                    </Link>
                  </CardButtons>
                </CardInfo>
              </CardContainer>
            ))}
          </CardWrapper>
        </Wrapper>
      )}
    </Container>
  );
};

export default Team;
