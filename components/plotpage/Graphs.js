import { Grid } from "@mui/material";
import { Graph } from "../common/Graph";
import { usePlotStore } from "@/store/plotStore";
import axios from "axios";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";

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

export const Graphs = () => {
  const region = usePlotStore((state) => state.region);
  const model = usePlotStore((state) => state.model);
  const frequency = usePlotStore((state) => state.frequency);
  const timePeriod = usePlotStore((state) => state.timePeriod);

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
  } = useQuery(
    ["plot-graph-data", region, model, frequency, timePeriod],
    () => fetchData(region, model, frequency, timePeriod),
    {
      enabled:
        region !== undefined &&
        model !== undefined &&
        frequency !== undefined &&
        timePeriod !== null,
      staleTime: 5 * 60 * 1000, // 5 minutes
      refetchOnMount: false,
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
      keepPreviousData: true,
    }
  );

  useEffect(() => {
    return () => {
      if (isLoading) {
        queryClient.cancelQueries([
          "plot-graph-data",
          region,
          model,
          frequency,
          timePeriod,
        ]);
      }
    };
  }, [isLoading]);

  const historicDemandData = graphData.historic_demand_data;
  const historicGenerationData = graphData.historic_generation_data;

  const forecastDemandData = graphData.forecast_demand_data;
  const forecastGenerationData = graphData.forecast_generation_data;

  return (
    <Grid
      container
      sx={{
        marginY: {
          xs: "1rem",
          sm: "2rem",
          md: "3rem",
        },
      }}
      rowGap={1}
    >
      <Grid item xs={12} lg={6}>
        <Graph
          actualdata={historicDemandData}
          predictedData={forecastDemandData}
          type="Net Demand"
          region={region}
          isLoading={isLoading}
          isFetching={isFetching}
          group="plot-graph"
        />
      </Grid>

      <Grid item xs={12} lg={6}>
        <Graph
          actualdata={historicGenerationData}
          predictedData={forecastGenerationData}
          type="Net Generation"
          region={region}
          isLoading={isLoading}
          isFetching={isFetching}
          group="plot-graph"
        />
      </Grid>
    </Grid>
  );
};
