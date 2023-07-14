import { Box, Grid } from "@mui/material";
import { Graph } from "../common/Graph";

import { useCompareStore } from "@/store/compareStore";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import axios from "axios";

export const Graphs = ({
  region1Data: {
    region1HistoricDemandData,
    region1HistoricGenerationData,
    region1ForecastDemandData,
    region1ForecastGenerationData,
    region1,
    isLoadingRegion1,
    isFetchingRegion1,
  },
  region2Data: {
    region2HistoricDemandData,
    region2HistoricGenerationData,
    region2ForecastDemandData,
    region2ForecastGenerationData,
    region2,
    isLoadingRegion2,
    isFetchingRegion2,
  },
}) => {
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
          actualdata={region1HistoricGenerationData}
          predictedData={region1ForecastGenerationData}
          type="Net Generation"
          region={region1}
          isLoading={isLoadingRegion1}
          isFetching={isFetchingRegion1}
        />
      </Grid>

      <Grid item xs={12} lg={6}>
        <Graph
          actualdata={region2HistoricGenerationData}
          predictedData={region2ForecastGenerationData}
          type="Net Generation"
          region={region2}
          isLoading={isLoadingRegion2}
          isFetching={isFetchingRegion2}
        />
      </Grid>

      <Grid item xs={12} lg={6}>
        <Graph
          actualdata={region1HistoricDemandData}
          predictedData={region1ForecastDemandData}
          type="Net Demand"
          region={region1}
          isLoading={isLoadingRegion1}
          isFetching={isFetchingRegion1}
        />
      </Grid>

      <Grid item xs={12} lg={6}>
        <Graph
          actualdata={region2HistoricDemandData}
          predictedData={region2ForecastDemandData}
          type="Net Demand"
          region={region2}
          isLoading={isLoadingRegion2}
          isFetching={isFetchingRegion2}
        />
      </Grid>
    </Grid>
  );
};
