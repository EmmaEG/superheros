import React from "react";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  justify-content: center;
`;

const Spinner = styled.div`
  display: inline-block;
  width: 4rem;
  height: 4rem;
  vertical-align: -0.125em;
  background-color: #063653ab;
  border: 0.55em solid #000000;
  border-right-color: transparent;
  border-radius: 50%;
  animation: 0.75s linear infinite spinner-border;
`;

const Loading = () => {
  return (
    <Container>
      <Spinner></Spinner>
    </Container>
  );
};

export default Loading;
