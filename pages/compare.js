import { Container } from "@mui/material";
import Head from "next/head";
import {
  useQuery,
  useQueryClient,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";
import axios from "axios";
import { useEffect } from "react";
import { Options } from "@/components/comparepage/Options";
import { Graphs } from "@/components/comparepage/Graphs";
import { useCompareStore } from "@/store/compareStore";
import ErrorBox from "@/components/common/ErrorBox";

const API_URL = process.env.NEXT_PUBLIC_BASE_URL;

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

const compare = () => {
  const region1 = useCompareStore((state) => state.region1);
  const region2 = useCompareStore((state) => state.region2);
  const model = useCompareStore((state) => state.model);
  const frequency = useCompareStore((state) => state.frequency);
  const timePeriod = useCompareStore((state) => state.timePeriod);

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
      staleTime: 20 * 60 * 2000, // 20 minutes
      cacheTime: 20 * 60 * 2000, // 20 minutes
      refetchOnMount: false,
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
      keepPreviousData: true,
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
      staleTime: 20 * 60 * 2000, // 20 minutes
      cacheTime: 20 * 60 * 2000, // 20 minutes
      refetchOnMount: false,
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
      keepPreviousData: true,
    }
  );

  useEffect(() => {
    return () => {
      if (isLoadingRegion1) {
        queryClient.cancelQueries([
          "line-graph-data",
          region1,
          model,
          frequency,
          timePeriod,
        ]);
      }
    };
  }, [isLoadingRegion1]);

  useEffect(() => {
    return () => {
      if (isLoadingRegion2) {
        queryClient.cancelQueries([
          "line-graph-data",
          region2,
          model,
          frequency,
          timePeriod,
        ]);
      }
    };
  }, [isLoadingRegion2]);

  const region1Data = {
    region1HistoricDemandData: graphDataRegion1.historic_demand_data,
    region1HistoricGenerationData: graphDataRegion1.historic_generation_data,
    region1ForecastDemandData: graphDataRegion1.forecast_demand_data,
    region1ForecastGenerationData: graphDataRegion1.forecast_generation_data,
    region1: region1,
    isLoadingRegion1: isLoadingRegion1,
    isFetchingRegion1: isFetchingRegion1,
  };

  const region2Data = {
    region2HistoricDemandData: graphDataRegion2.historic_demand_data,
    region2HistoricGenerationData: graphDataRegion2.historic_generation_data,
    region2ForecastDemandData: graphDataRegion2.forecast_demand_data,
    region2ForecastGenerationData: graphDataRegion2.forecast_generation_data,
    region2: region2,
    isLoadingRegion2: isLoadingRegion2,
    isFetchingRegion2: isFetchingRegion2,
  };

  const isQueryError = isErrorRegion1 || isErrorRegion2;

  return (
    <>
      <Head>
        <title>VoltWise</title>

        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Container maxWidth="xl">
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
  const frequency = "D";
  const timePeriod = "3-months";
  const model = "prophet";

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery(
    ["line-graph-data", region1, model, frequency, timePeriod],
    () => fetchData(region1, model, frequency, timePeriod)
  );

  await queryClient.prefetchQuery(
    ["line-graph-data", region2, model, frequency, timePeriod],
    () => fetchData(region2, model, frequency, timePeriod)
  );

  const revalidateDate = new Date().toLocaleTimeString();
  console.log("revalidate compare page at server", revalidateDate);

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
      revalidateDate: `revalidate compare page at client: ${revalidateDate}`,
    },

    // Next.js will attempt to re-generate the page every 60 seconds:
    revalidate: 6 * 60 * 60,
  };
};

export default compare;
