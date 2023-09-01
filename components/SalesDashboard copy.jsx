"use client";
import styled from "styled-components";

const SalesDashboard = () => {
  return (
    <Main>
      <Container>
        <Title>Sales Summary</Title>
        <Dashboard></Dashboard>
      </Container>
    </Main>
  );
};

export default SalesDashboard;

const Main = styled.div`
  height: 100%;
  width: 100%;
`;

const Container = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
`;
const Title = styled.div`
  background-color: #1f293710;
  padding: 5px;
  width: 100%;
  text-align: center;
`;

const Dashboard = styled.div`
  flex-grow: 1;
  display: flex;
  width: 100%;
  overflow-x: hidden;
`;
