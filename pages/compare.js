import { Container } from "@mui/material";
import Head from "next/head";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useEffect, useMemo } from "react";
import { Options } from "@/components/comparepage/Options";
import { Graphs } from "@/components/comparepage/Graphs";
import { useCompareStore } from "@/store/compareStore";
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

const compare = ({ prefetchTime, region1pageData, region2pageData }) => {
  const region1 = useCompareStore((state) => state.region1);
  const region2 = useCompareStore((state) => state.region2);
  const model = useCompareStore((state) => state.model);
  const frequency = useCompareStore((state) => state.frequency);
  const timePeriod = useCompareStore((state) => state.timePeriod);

  useEffect(() => {
    console.log("client side compare time: ", new Date().toLocaleTimeString());
    console.log("prefetch compare time:", prefetchTime);
  }, [prefetchTime]);

  const queryClient = useQueryClient();

  const {
    data: graphDataRegion1 = {
      historic_demand_data: [],
      historic_generation_data: [],
      forecast_demand_data: [],
      forecast_generation_data: [],
    },
    isLoading: isLoadingRegion1,
    isError: isErrorRegion1,
    error: errorRegion1,
    isFetching: isFetchingRegion1,
    refetch: refetchRegion1,
  } = useQuery(
    ["line-graph-data", region1, model, frequency, timePeriod],
    () => fetchData(region1, model, frequency, timePeriod),
    {
      enabled:
        region1 !== undefined &&
        model !== undefined &&
        frequency !== undefined &&
        timePeriod !== null,

      refetchOnMount: false,
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
      keepPreviousData: true,
      initialData:
        region1 === "CAL" && frequency === "M" && timePeriod === "3-months"
          ? region1pageData
          : undefined,
    }
  );

  const {
    data: graphDataRegion2 = {
      historic_demand_data: [],
      historic_generation_data: [],
      forecast_demand_data: [],
      forecast_generation_data: [],
    },
    isLoading: isLoadingRegion2,
    isError: isErrorRegion2,
    error: errorRegion2,
    isFetching: isFetchingRegion2,
    refetch: refetchRegion2,
  } = useQuery(
    ["line-graph-data", region2, model, frequency, timePeriod],
    () => fetchData(region2, model, frequency, timePeriod),
    {
      enabled:
        region2 !== undefined &&
        model !== undefined &&
        frequency !== undefined &&
        timePeriod !== null,

      refetchOnMount: false,
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
      keepPreviousData: true,
      initialData:
        region2 === "CAR" && frequency === "M" && timePeriod === "3-months"
          ? region2pageData
          : undefined,
    }
  );

  useEffect(() => {
    // console.log("compare page isFetchingRegion1: ", isFetchingRegion1);
    return () => {
      if (isLoadingRegion1 || isFetchingRegion1) {
        queryClient.cancelQueries([
          "line-graph-data",
          region1,
          model,
          frequency,
          timePeriod,
        ]);
      }
    };
  }, [isLoadingRegion1, isFetchingRegion1]);

  useEffect(() => {
    // console.log("compare page isFetchingRegion2: ", isFetchingRegion2);
    return () => {
      if (isLoadingRegion2 || isFetchingRegion2) {
        queryClient.cancelQueries([
          "line-graph-data",
          region2,
          model,
          frequency,
          timePeriod,
        ]);
      }
    };
  }, [isLoadingRegion2, isFetchingRegion2]);

  // const region1Data = {
  //   region1HistoricDemandData: graphDataRegion1.historic_demand_data,
  //   region1HistoricGenerationData: graphDataRegion1.historic_generation_data,
  //   region1ForecastDemandData: graphDataRegion1.forecast_demand_data,
  //   region1ForecastGenerationData: graphDataRegion1.forecast_generation_data,
  //   region1: region1,
  //   isLoadingRegion1: isLoadingRegion1,
  //   isFetchingRegion1: isFetchingRegion1,
  // };

  // const region2Data = {
  //   region2HistoricDemandData: graphDataRegion2.historic_demand_data,
  //   region2HistoricGenerationData: graphDataRegion2.historic_generation_data,
  //   region2ForecastDemandData: graphDataRegion2.forecast_demand_data,
  //   region2ForecastGenerationData: graphDataRegion2.forecast_generation_data,
  //   region2: region2,
  //   isLoadingRegion2: isLoadingRegion2,
  //   isFetchingRegion2: isFetchingRegion2,
  // };

  const region1Data = useMemo(() => {
    return {
      region1HistoricDemandData: graphDataRegion1.historic_demand_data,
      region1HistoricGenerationData: graphDataRegion1.historic_generation_data,
      region1ForecastDemandData: graphDataRegion1.forecast_demand_data,
      region1ForecastGenerationData: graphDataRegion1.forecast_generation_data,
      region1: region1,
      isLoadingRegion1: isLoadingRegion1,
      isFetchingRegion1: isFetchingRegion1,
      region1GenerationId:
        region1 +
        "region1-generation" +
        Math.floor(100000 + Math.random() * 900000),
      region1DemandId:
        region1 +
        "region1-demand" +
        Math.floor(100000 + Math.random() * 900000),
    };
  }, [graphDataRegion1, region1, isLoadingRegion1, isFetchingRegion1]);

  const region2Data = useMemo(() => {
    return {
      region2HistoricDemandData: graphDataRegion2.historic_demand_data,
      region2HistoricGenerationData: graphDataRegion2.historic_generation_data,
      region2ForecastDemandData: graphDataRegion2.forecast_demand_data,
      region2ForecastGenerationData: graphDataRegion2.forecast_generation_data,
      region2: region2,
      isLoadingRegion2: isLoadingRegion2,
      isFetchingRegion2: isFetchingRegion2,
      region2GenerationId:
        region2 +
        "region2-generation" +
        Math.floor(100000 + Math.random() * 900000),
      region2DemandId:
        region2 +
        "region2-demand" +
        Math.floor(100000 + Math.random() * 900000),
    };
  }, [graphDataRegion2, region2, isLoadingRegion2, isFetchingRegion2]);

  const isQueryError = isErrorRegion1 || isErrorRegion2;

  return (
    <>
      <Head>
        <title>VoltWise</title>

        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Container maxWidth="xl">
        {/* <h1>Compare prefetch time {prefetchTime}</h1> */}
        <Options />
        {isQueryError ? (
          <ErrorBox
            error={errorRegion1 || errorRegion2}
            refetch={() => {
              refetchRegion1();
              refetchRegion2();
            }}
          />
        ) : (
          <Graphs region1Data={region1Data} region2Data={region2Data} />
        )}
      </Container>
    </>
  );
};

export const getStaticProps = async () => {
  const region1 = "CAL";
  const region2 = "CAR";
  const frequency = "M";
  const timePeriod = "3-months";
  const model = "prophet";

  let region1pageData = {};
  let region2pageData = {};
  let prefetchCompleteTime = null;

  try {
    console.log(
      "compare: prefetch start time:",
      formatDateInEasternTime(new Date())
    );

    region1pageData = await serverSideFetchData(
      region1,
      model,
      frequency,
      timePeriod
    );

    region2pageData = await serverSideFetchData(
      region2,
      model,
      frequency,
      timePeriod
    );

    prefetchCompleteTime = formatDateInEasternTime(new Date());

    console.log("compare: prefetch end time:", prefetchCompleteTime);
  } catch (err) {
    console.log("prefetch compare error:", err);
  }

  return {
    props: {
      prefetchTime: prefetchCompleteTime,
      region1pageData,
      region2pageData,
    },
  };
};

export default compare;
