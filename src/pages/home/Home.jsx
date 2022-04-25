import React from "react";
import styled from "styled-components";
import { mobile } from "../../responsive";
import SearchForm from "../../components/search/SearchForm";

const Container = styled.div`
  display: flex;
  justify-content: center;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 70vw;
  ${mobile({ width: "100vw", padding: "10px", marginTop: "50px" })}
`;

const TitleWrapper = styled.div`
  text-align: center;
  margin-top: 40px;
  ${mobile({ width: "100%" })}
`;

const SeacrhContainer = styled.div`
  display: flex;
  /* width: 100%; */
  justify-content: center;
  align-items: center;
  margin-top: 40px;
`;

const Title = styled.h3``;

const SubTitle = styled.p``;

const Home = () => {
  return (
    <Container>
      <Wrapper>
        <TitleWrapper>
          <Title>Hey buddy, here you can build your team</Title>
          <SubTitle>You must choose 3 good and 3 bad heroes</SubTitle>
        </TitleWrapper>
        <SeacrhContainer>
          <SearchForm />
        </SeacrhContainer>
      </Wrapper>
    </Container>
  );
};

export default Home;
