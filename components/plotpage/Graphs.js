import { Grid } from "@mui/material";
import { Graph } from "../common/Graph";

export const Graphs = ({
  historicData: { historicDemandData, historicGenerationData },
  forecastData: { forecastDemandData, forecastGenerationData },
  region,
  isLoading,
  isFetching,
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
