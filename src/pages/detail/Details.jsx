import { useHistory } from "react-router-dom";
import { useState, useEffect } from "react";
import styled from "styled-components";
import { mobile } from "../../responsive";
import axios from "axios";
import { useLocation } from "react-router-dom";
import Loading from "../../components/Loading/Loading";

const Container = styled.div`
`;

const Wrapper = styled.div`
  display: flex;
  padding: 20px;
  justify-content: space-between;
  ${mobile({ display: "flex", flexDirection: "column", marginTop: "50px" })}
`;

const Left = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Right = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const ImgContainer = styled.div`
  height: 80vh;
  ${mobile({ height: "100%" })}

`;

const Img = styled.img`
  height: 100%;
  border-radius: 15px;
  ${mobile({ height: "80%", width: "100%" })}
`;

const Button = styled.button`
  background-color: #0a3f58;
  color: #ffffff;
  font-size: 15px;
  padding: 7px 10px;
  border: none;
  border-radius: 5px;
  margin-inline: 5px;
  position: relative;
  margin-top: auto;
  transition: 2ms;
  cursor: pointer;
  &:hover {
    background-color: #052e41;
  }
`;

const LoadingWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: calc(100vh - 60px);
`;

const DetailsWrapper = styled.div``;

const H1 = styled.h1``;

const P = styled.p``;

const Strong = styled.strong``;

const Hr = styled.hr``;

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
    <Container>
      {heroDetails.response === "success" ? (
        <Wrapper>
          <Left>
            <ImgContainer>
              <Img src={heroDetails.image.url} alt={heroDetails.name} />
            </ImgContainer>
          </Left>
          <Right>
            <DetailsWrapper>
              <H1>{heroDetails.name}</H1>
              <Hr />
              <P>
                <Strong>Weight:</Strong> {heroDetails.appearance.weight[1]}
              </P>
              <P>
                <Strong>height:</Strong> {heroDetails.appearance.height[1]}
              </P>
              <P>
                <Strong>Full-name:</Strong>
                {heroDetails.biography["full-name"]}
              </P>
              <P>
                <Strong>Alias:</Strong>
                {heroDetails.biography["aliases"].join(", ")}
              </P>
              <P>
                <Strong>Eye-color:</Strong>
                {heroDetails.appearance["eye-color"]}
              </P>
              <P>
                <Strong>Hair-color:</Strong>
                {heroDetails.appearance["hair-color"]}
              </P>
              <P>
                <Strong>Workplace:</Strong> {heroDetails.work.base}
              </P>
            </DetailsWrapper>
            <Button onClick={() => history.goBack()}>Return</Button>
          </Right>
        </Wrapper>
      ) : (
        <LoadingWrapper>
          <Loading />
        </LoadingWrapper>
      )}
    </Container>
  );
};

export default Details;
