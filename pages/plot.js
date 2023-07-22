import { Options } from "@/components/plotpage/Options";
import { Graphs } from "@/components/plotpage/Graphs";
import { Box, Container } from "@mui/material";
import Head from "next/head";
import { usePlotStore } from "@/store/plotStore";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useEffect } from "react";
import ErrorBox from "@/components/common/ErrorBox";
import { formatDateInEasternTime } from "@/utils/FrequencyAndTime";

const API_URL = process.env.NEXT_PUBLIC_BASE_URL;
const API_URL2 = process.env.NEXT_BASE_URL;

const fetchData = async (region, model, frequency, time) => {
  const response = await axios.get(API_URL + `/graph-data`, {
    params: {
      region: region,
      model: model,
      frequency: frequency,
      time: time,
    },
    headers: {
      "Content-Type": "application/json",
    },
  });

  return response.data;
};

const serverSideFetchData = async (region, model, frequency, time) => {
  const response = await axios.get(API_URL2 + `/graph-data`, {
    params: {
      region: region,
      model: model,
      frequency: frequency,
      time: time,
    },
    headers: {
      "Content-Type": "application/json",
    },
  });

  return response.data;
};

const plot = ({ prefetchTime, pageData }) => {
  const region = usePlotStore((state) => state.region);
  const model = usePlotStore((state) => state.model);
  const frequency = usePlotStore((state) => state.frequency);
  const timePeriod = usePlotStore((state) => state.timePeriod);

  useEffect(() => {
    console.log("client side plot time: ", new Date().toLocaleTimeString());
    console.log("prefetch plot time:", prefetchTime);
  }, [prefetchTime]);

  const queryClient = useQueryClient();

  const {
    data: graphData = {
      historic_demand_data: [],
      historic_generation_data: [],
      forecast_demand_data: [],
      forecast_generation_data: [],
    },
    isLoading,
    isError,
    error,
    isFetching,
    refetch,
  } = useQuery(
    ["line-graph-data", region, model, frequency, timePeriod],
    () => fetchData(region, model, frequency, timePeriod),
    {
      enabled:
        region !== undefined &&
        model !== undefined &&
        frequency !== undefined &&
        timePeriod !== null,

      refetchOnMount: false,
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
      keepPreviousData: true,
      initialData:
        region === "CAL" && frequency === "W" && timePeriod === "3-months"
          ? pageData
          : undefined,
    }
  );

  useEffect(() => {
    // console.log("plot page IsFetching: ", isFetching);
    return () => {
      if (isLoading || isFetching) {
        queryClient.cancelQueries([
          "line-graph-data",
          region,
          model,
          frequency,
          timePeriod,
        ]);
      }
    };
  }, [isLoading, isFetching]);

  const historicData = {
    historicDemandData: graphData.historic_demand_data,
    historicGenerationData: graphData.historic_generation_data,
  };

  const forecastData = {
    forecastDemandData: graphData.forecast_demand_data,
    forecastGenerationData: graphData.forecast_generation_data,
  };

  return (
    <>
      <Head>
        <title>VoltWise</title>

        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Container maxWidth="xl">
        {/* <h1>Plot prefetch time {prefetchTime}</h1> */}
        <Options />
        {isError ? (
          <ErrorBox error={error} refetch={refetch} />
        ) : (
          <Graphs
            historicData={historicData}
            forecastData={forecastData}
            isLoading={isLoading}
            isFetching={isFetching}
            region={region}
          />
        )}
      </Container>
    </>
  );
};

export const getStaticProps = async () => {
  const region = "CAL";
  const frequency = "W";
  const timePeriod = "3-months";
  const model = "prophet";

  let pageData = {};
  let prefetchCompleteTime = null;

  try {
    console.log(
      "plot: prefetch start time:",
      formatDateInEasternTime(new Date())
    );

    pageData = await serverSideFetchData(region, model, frequency, timePeriod);
    prefetchCompleteTime = formatDateInEasternTime(new Date());

    console.log("compare: prefetch end time:", prefetchCompleteTime);
  } catch (err) {
    console.log("prefetch plot error: ", err);
  }

  return {
    props: {
      prefetchTime: prefetchCompleteTime,
      pageData,
    },
  };
};

export default plot;
