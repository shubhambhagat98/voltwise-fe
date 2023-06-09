import {
  analyticsData,
  monthlyGraph2,
} from "@/components/common/data/sampleData";
import Head from "next/head";
import { Container, Grid, Typography } from "@mui/material";
import { Options } from "@/components/analytics/Options";
import { useAnalyticsStore } from "@/store/analyticsStore";
import { QuickInfoCardGrid } from "@/components/analytics/QuickInfoCardGrid";
import { useEffect, useState } from "react";
import { Graph } from "@/components/analytics/Graph";
import { Metrics } from "@/components/analytics/Metrics";
import { InfoTable } from "@/components/analytics/InfoTable";
import { DonutGraph } from "@/components/common/DonutGraph";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_BASE_URL;

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

  return response.data;
};

const analytics = () => {
  const region = useAnalyticsStore((state) => state.region);
  const year = useAnalyticsStore((state) => state.year);

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
    },
    isLoading,
    isError,
    error,
    isFetching,
  } = useQuery(
    ["analytics-data", region, year],
    () => fetchData(region, year),
    {
      enabled: region !== undefined && year !== undefined,
      staleTime: 5 * 60 * 1000, // 5 minutes
      refetchOnMount: false,
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
      keepPreviousData: false,
    }
  );

  useEffect(() => {
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
        <Options />

        <QuickInfoCardGrid
          isLoading={isLoading || isFetching}
          aggregateDemandGivenYear={aggregateDemandGivenYear}
          aggregateGenerationGivenYear={aggregateGenerationGivenYear}
          aggregateDemandCurrentMonth={aggregateDemandCurrentMonth}
          aggregateGenerationCurrentMonth={aggregateGenerationCurrentMonth}
        />

        <Grid container spacing={3} mt={0.5} mb={3}>
          <Grid item xs={12} display="flex">
            <Graph
              graphData={monthlyGraphData}
              isLoading={isLoading || isFetching}
            />
          </Grid>
          {/* <Grid item xs={12} md={4}>
            <Metrics />
          </Grid> */}
          <Grid item xs={12}>
            <InfoTable
              isLoading={isLoading || isFetching}
              tableData={tableData}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <DonutGraph
              isLoading={isLoading || isFetching}
              donutSeries={quarterlyGraphData.aggregateDemand || []}
              title="Aggregate Demand"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <DonutGraph
              isLoading={isLoading || isFetching}
              donutSeries={quarterlyGraphData.aggregateGeneration || []}
              title="Aggregate Generation"
            />
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default analytics;
