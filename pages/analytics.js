import Head from "next/head";
import { Container, Grid } from "@mui/material";
import { Options } from "@/components/analytics/Options";
import { useAnalyticsStore } from "@/store/analyticsStore";
import { QuickInfoCardGrid } from "@/components/analytics/QuickInfoCardGrid";
import { useEffect } from "react";
import { Graph } from "@/components/analytics/Graph";
import { Metrics } from "@/components/analytics/Metrics";
import { InfoTable } from "@/components/analytics/InfoTable";
import { DonutGraph } from "@/components/common/DonutGraph";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import ErrorBox from "@/components/common/ErrorBox";
import { formatDateInEasternTime } from "@/utils/FrequencyAndTime";

const API_URL = process.env.NEXT_PUBLIC_BASE_URL;
const API_URL2 = process.env.NEXT_BASE_URL;

const fetchData = async (region, year) => {
  const response = await axios.get(API_URL + `/statistics-data`, {
    params: {
      region: region,
      year: year,
    },
    headers: {
      "Content-Type": "application/json",
    },
  });

  // // log data fetched in hh:mm:ss
  // const date = new Date();
  // const time = date.toLocaleTimeString();
  // console.log(`Data fetched at ${time}`);

  return response.data;
};

const serverSideFetchData = async (region, year) => {
  const response = await axios.get(API_URL2 + `/statistics-data`, {
    params: {
      region: region,
      year: year,
    },
    headers: {
      "Content-Type": "application/json",
    },
  });

  return response.data;
};

const analytics = ({ prefetchTime, pageData }) => {
  const region = useAnalyticsStore((state) => state.region);
  const year = useAnalyticsStore((state) => state.year);

  useEffect(() => {
    console.log(
      "client side analytics time: ",
      new Date().toLocaleTimeString()
    );
    console.log("prefetch analytics time:", prefetchTime);
  }, [prefetchTime]);

  const queryClient = useQueryClient();

  const {
    data: analyticsData = {
      aggregateDemandGivenYear: {},
      aggregateGenerationGivenYear: {},
      aggregateDemandCurrentMonth: {},
      aggregateGenerationCurrentMonth: {},
      monthlyGraph: {},
      quarterlyGraph: {},
      tableData: [],
      totalEnergyImport: null,
      totalEnergyExport: null,
    },
    isLoading,
    isError,
    error,
    isFetching,
    refetch,
  } = useQuery(
    ["analytics-data", region, year],
    () => fetchData(region, year),
    {
      enabled: region !== undefined && year !== undefined,

      refetchOnMount: false,
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
      keepPreviousData: false,
      initialData: region === "CAL" && year === 2023 ? pageData : undefined,
    }
  );

  useEffect(() => {
    // console.log("Analytics page isFetching: ", isFetching);
    return () => {
      if (isLoading || isFetching) {
        queryClient.cancelQueries(["analytics-data", region, year]);
      }
    };
  }, [isLoading, isFetching]);

  const aggregateDemandGivenYear = analyticsData.aggregateDemandGivenYear;
  const aggregateGenerationGivenYear =
    analyticsData.aggregateGenerationGivenYear;
  const aggregateDemandCurrentMonth = analyticsData.aggregateDemandCurrentMonth;
  const aggregateGenerationCurrentMonth =
    analyticsData.aggregateGenerationCurrentMonth;
  const monthlyGraphData = analyticsData.monthlyGraph;
  const quarterlyGraphData = analyticsData.quarterlyGraph;
  const tableData = analyticsData.tableData;

  return (
    <>
      <Head>
        <title>VoltWise</title>

        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Container maxWidth="xl">
        {/* <h1>Analytics prefetch time {prefetchTime}</h1> */}
        <Options />

        {isError ? (
          <ErrorBox error={error} refetch={refetch} />
        ) : (
          <>
            <QuickInfoCardGrid
              isLoading={isFetching}
              aggregateDemandGivenYear={aggregateDemandGivenYear}
              aggregateGenerationGivenYear={aggregateGenerationGivenYear}
              aggregateDemandCurrentMonth={aggregateDemandCurrentMonth}
              aggregateGenerationCurrentMonth={aggregateGenerationCurrentMonth}
            />

            <Grid container spacing={3} mt={0.5} mb={3}>
              <Grid item xs={12} md={9} display="flex">
                <Graph graphData={monthlyGraphData} isLoading={isFetching} />
              </Grid>
              <Grid item xs={12} md={3}>
                <Metrics
                  totalEnergyExport={analyticsData.totalEnergyExport}
                  totalEnergyImport={analyticsData.totalEnergyImport}
                  isLoading={isFetching}
                  region={region}
                  year={year}
                />
              </Grid>
              <Grid item xs={12}>
                <InfoTable isLoading={isFetching} tableData={tableData} />
              </Grid>
              <Grid item xs={12} sm={6}>
                <DonutGraph
                  isLoading={isFetching}
                  donutSeries={quarterlyGraphData.aggregateDemand || []}
                  title="Aggregate Demand"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <DonutGraph
                  isLoading={isFetching}
                  donutSeries={quarterlyGraphData.aggregateGeneration || []}
                  title="Aggregate Generation"
                />
              </Grid>
            </Grid>
          </>
        )}
      </Container>
    </>
  );
};

export const getStaticProps = async () => {
  const region = "CAL";
  const year = 2023;

  let pageData = {};
  let prefetchCompleteTime = null;

  try {
    console.log(
      "analytics: prefetch start time:",
      formatDateInEasternTime(new Date())
    );
    pageData = await serverSideFetchData(region, year);

    prefetchCompleteTime = formatDateInEasternTime(new Date());

    console.log("analytics: prefetch end time:", prefetchCompleteTime);
  } catch (error) {
    // Handle the error here, you can log it or return a fallback value if needed.
    console.error("Error prefetching data:", error);
  }

  return {
    props: {
      prefetchTime: prefetchCompleteTime,
      pageData,
    },
  };
};
export default analytics;
