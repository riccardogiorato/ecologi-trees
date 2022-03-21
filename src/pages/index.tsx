import type { GetStaticProps, InferGetStaticPropsType, NextPage } from "next";
import styled from "styled-components";
import {
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  Bar,
  BarChart,
} from "recharts";
import { useState } from "react";

const Title = styled.h1`
  font-size: 30px;
  color: ${({ theme }) => theme.colors.black};
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 20px;
`;

const Centered = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 12px;
`;

const Button = styled.button`
  font-size: 24px;
  color: ${({ theme }) => theme.colors.black};
  background-color: white;
  border: 1px solid ${({ theme }) => theme.colors.black};
  padding: 12px;
  margin: 12px;
  border-radius: 4px;
  cursor: pointer;
`;

const Home: NextPage<InferGetStaticPropsType<typeof getStaticProps>> = ({
  data,
}) => {
  const [minAgeFilter, setMinAgeFilter] = useState<Date>();
  const datesGraph = data.map((dataPoint: { x: string; y: any }) => {
    return {
      x: new Date(dataPoint.x),
      trees: dataPoint.y,
      shortDate: new Date(dataPoint.x).toISOString().split("T")[0],
    };
  });

  const filteredDatesGraph = minAgeFilter
    ? datesGraph.filter((dataPoint: { x: Date; trees: number }) => {
        return dataPoint.x > minAgeFilter;
      })
    : datesGraph;

  const daysAgo30 = new Date(new Date().valueOf() - 1000 * 60 * 60 * 24 * 30);
  const daysAgo90 = new Date(new Date().valueOf() - 1000 * 60 * 60 * 24 * 90);

  return (
    <>
      <Title>Ecologi Tree Chart</Title>
      <Centered>
        <BarChart
          width={600}
          height={400}
          data={filteredDatesGraph}
          margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
        >
          <Bar type="monotone" dataKey="trees" fill="#8884d8" />
          <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
          <XAxis dataKey="shortDate" hide />
          <YAxis dataKey="trees" scale="log" domain={["auto", "auto"]} />
          <Tooltip />
          <Legend />
        </BarChart>
      </Centered>

      <Centered>
        <Button onClick={() => setMinAgeFilter(undefined)}>
          Entire Timeframe
        </Button>
        <Button onClick={() => setMinAgeFilter(daysAgo90)}>Last 90 Days</Button>
        <Button onClick={() => setMinAgeFilter(daysAgo30)}>Last 30 Days</Button>
      </Centered>
    </>
  );
};

export const getStaticProps: GetStaticProps = async (context) => {
  const res = await fetch("https://x.api.ecologi.com/trees");
  const responseObject = await res.json();

  const dataGrouped: Record<string, number> = {};
  responseObject.data.map((item: [string, number]) => {
    const at = new Date(item[1] * 1000).toISOString().split("T")[0];
    if (at in dataGrouped) dataGrouped[at] += parseInt(item[0]);
    else dataGrouped[at] = 0 + parseInt(item[0]);
  });

  const dates = Object.keys(dataGrouped)
    .map((key) => {
      return {
        x: key,
        y: dataGrouped[key],
      };
    })
    .sort(
      (dateA, dateB) =>
        new Date(dateA.x).getTime() - new Date(dateB.x).getTime()
    );

  return {
    props: {
      data: dates,
    },
  };
};

export default Home;
