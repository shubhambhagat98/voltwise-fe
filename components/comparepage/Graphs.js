import { Box, Grid } from "@mui/material";
import { Graph } from "../common/Graph";

import { useCompareStore } from "@/store/compareStore";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import axios from "axios";

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
  } = useQuery(
    ["compare-graph-data-region1", region1, model, frequency, timePeriod],
    () => fetchData(region1, model, frequency, timePeriod),
    {
      enabled:
        region1 !== undefined &&
        model !== undefined &&
        frequency !== undefined &&
        timePeriod !== null,
      staleTime: 5 * 60 * 1000, // 3 minutes
      refetchOnMount: false,
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
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
  } = useQuery(
    ["compare-graph-data-region2", region2, model, frequency, timePeriod],
    () => fetchData(region2, model, frequency, timePeriod),
    {
      enabled:
        region2 !== undefined &&
        model !== undefined &&
        frequency !== undefined &&
        timePeriod !== null,
      staleTime: 5 * 60 * 1000, // 3 minutes
      refetchOnMount: false,
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
    }
  );

  useEffect(() => {
    return () => {
      if (isLoadingRegion1) {
        queryClient.cancelQueries([
          "compare-graph-data-region1",
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
          "compare-graph-data-region2",
          region2,
          model,
          frequency,
          timePeriod,
        ]);
      }
    };
  }, [isLoadingRegion2]);

  const region1HistoricDemandData = graphDataRegion1.historic_demand_data;
  const region1HistoricGenerationData =
    graphDataRegion1.historic_generation_data;

  const region1ForecastDemandData = graphDataRegion1.forecast_demand_data;
  const region1ForecastGenerationData =
    graphDataRegion1.forecast_generation_data;

  const region2HistoricDemandData = graphDataRegion2.historic_demand_data;
  const region2HistoricGenerationData =
    graphDataRegion2.historic_generation_data;

  const region2ForecastDemandData = graphDataRegion2.forecast_demand_data;
  const region2ForecastGenerationData =
    graphDataRegion2.forecast_generation_data;

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
      rowGap={4}
    >
      <Grid item xs={12} lg={6}>
        <Graph
          actualdata={isLoadingRegion1 ? [] : region1HistoricGenerationData}
          predictedData={isLoadingRegion1 ? [] : region1ForecastGenerationData}
          type="Net Generation"
          region={region1}
          isLoading={isLoadingRegion1}
        />
      </Grid>

      <Grid item xs={12} lg={6}>
        <Graph
          actualdata={isLoadingRegion2 ? [] : region2HistoricGenerationData}
          predictedData={isLoadingRegion2 ? [] : region2ForecastGenerationData}
          type="Net Generation"
          region={region2}
          isLoading={isLoadingRegion2}
        />
      </Grid>

      <Grid item xs={12} lg={6}>
        <Graph
          actualdata={isLoadingRegion1 ? [] : region1HistoricDemandData}
          predictedData={isLoadingRegion1 ? [] : region1ForecastDemandData}
          type="Net Demand"
          region={region1}
          isLoading={isLoadingRegion1}
        />
      </Grid>

      <Grid item xs={12} lg={6}>
        <Graph
          actualdata={isLoadingRegion2 ? [] : region2HistoricDemandData}
          predictedData={isLoadingRegion2 ? [] : region2ForecastDemandData}
          type="Net Demand"
          region={region2}
          isLoading={isLoadingRegion2}
        />
      </Grid>
    </Grid>
  );
};
