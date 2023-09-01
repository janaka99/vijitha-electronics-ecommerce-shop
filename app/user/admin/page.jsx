"use client";

import EmployeesDashboard from "@components/EmployeesDashboard";
import styled from "styled-components";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { useState } from "react";
import WholePageLoading from "../../../components/WholePageLoading";
import SalesDashboard from "@components/SalesDashboard";
import Billdashboard from "@components/Billdashboard";
import Loader from "@components/Loader";

const page = () => {
  const router = useRouter();
  const { data, status } = useSession();

  const [empDashboardView, setempDashboardView] = useState(false);
  const [salesDashboardView, setsalesDashboardView] = useState(true);
  const [billsDashboardView, setbillsDashboardView] = useState(false);

  const [loading, setloading] = useState(false);

  const handleView = (type) => {
    console.log(type);
    setloading(true);
    if (type == "Employees") {
      setempDashboardView(true);
      setsalesDashboardView(false);
      setbillsDashboardView(false);
    }
    if (type == "Sales") {
      setempDashboardView(false);
      setsalesDashboardView(true);
      setbillsDashboardView(false);
    }
    if (type == "Bills") {
      setempDashboardView(false);
      setsalesDashboardView(false);
      setbillsDashboardView(true);
    }
    setloading(false);
  };
  console.log(data);
  if (status === "loading") {
    <WholePageLoading />;
  } else if (status === "unauthenticated") {
    router.push("/user/login");
  } else {
    return (
      <Main>
        <Container>
          <Content>
            <TopBar></TopBar>
            <ContentContainer>
              <Left>
                <AdminLinks
                  onClick={() => handleView("Employees")}
                  loading={loading}
                  setloading={setloading}
                >
                  Employee
                </AdminLinks>

                <AdminLinks
                  onClick={() => handleView("Sales")}
                  loading={loading}
                  setloading={setloading}
                >
                  Sales
                </AdminLinks>
                <AdminLinks
                  onClick={() => handleView("Bills")}
                  loading={loading}
                  setloading={setloading}
                >
                  Bills
                </AdminLinks>
              </Left>
              <Right>
                {loading ? (
                  <LoadingDiv>
                    <Loader size={"50px"} border={"5px"} />
                  </LoadingDiv>
                ) : (
                  <>
                    <EmpDashboardView view={empDashboardView}>
                      <EmployeesDashboard />
                    </EmpDashboardView>

                    <SalesDashboardView view={salesDashboardView}>
                      <SalesDashboard />
                    </SalesDashboardView>

                    <BillsDashboardView view={billsDashboardView}>
                      <Billdashboard />
                    </BillsDashboardView>
                  </>
                )}
              </Right>
            </ContentContainer>
          </Content>
        </Container>
      </Main>
    );
  }
};

export default page;

const Main = styled.div`
  max-width: 1440px;
  margin: 0 auto;
  width: 100%;
`;

const Container = styled.div`
  width: 95%;
  margin: 30px auto;
  display: flex;
  gap: 30px;
`;

const Content = styled.div`
  width: 100%;
  max-height: calc(720px - 130px);
  min-height: calc(720px - 130px);
  background-color: #1f293710;
  display: flex;
  flex-direction: column;
`;

const TopBar = styled.div`
  width: 100%;
  height: 50px;
`;

const ContentContainer = styled.div`
  width: 100%;
  padding: 10px;
  height: calc(100% - 50px);
  display: flex;
`;

const Left = styled.div`
  width: 200px;
  background-color: #fff;
  height: 100%;
  padding: 5px;
  border-radius: 4px;
  overflow-x: hidden;
  margin-right: 10px;
`;

const Right = styled.div`
  flex-grow: 1;
  height: 100%;
  background-color: #fff;
  padding: 5px;
  border-radius: 4px;
  overflow-x: hidden;
`;

const EmpDashboardView = styled.div`
  height: 100%;
  width: 100%;
  display: ${(props) => (props.view ? "" : "none")};
`;
const SalesDashboardView = styled.div`
  height: 100%;
  width: 100%;
  display: ${(props) => (props.view ? "" : "none")};
`;
const BillsDashboardView = styled.div`
  height: 100%;
  width: 100%;
  display: ${(props) => (props.view ? "" : "none")};
`;

const LoadingDiv = styled.div`
  width: 100%;
  height: 100%;
  background-color: #fff;
  backdrop-filter: blur(1px);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const AdminLinks = styled.button`
  margin: 5px;
  background-color: #f3f3f353;
  width: calc(100% - 10px);
  display: flex;
  justify-content: start;
  padding: 5px;
  cursor: pointer;
  font-size: 14px;
  &:hover {
    background-color: #f3f3f3b5;
  }
`;
