import type { NextPage } from "next";
import styled from "styled-components";

const Title = styled.h1`
  font-size: 30px;
  color: ${({ theme }) => theme.colors.black};
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 20px;
`;

const Text = styled.p`
  font-size: 24px;
  color: ${({ theme }) => theme.colors.grey};
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 12px;
`;

const Home: NextPage = () => {
  return (
    <>
      <Title>template-nextjs-styled-components</Title>
      <Text>
        Template with Next.js 12 and Typescript and Styled Components using SWR
      </Text>
    </>
  );
};

export default Home;
