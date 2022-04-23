import { useHistory } from "react-router-dom";
import { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";
import { useLocation } from "react-router-dom";
import Loading from "../../components/Loading/Loading";

const Container = styled.div``;

const Wrapper = styled.div`
  display: flex;
  padding: 20px;
  justify-content: space-between;
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
`;

const Img = styled.img`
  height: 100%;
  border-radius: 15px;
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
            <Button
              className="btn btn-dark back"
              onClick={() => history.goBack()}
            >
              Regresar
            </Button>
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
