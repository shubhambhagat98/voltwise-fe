import React from "react";
import { QuickInfoCard } from "./QuickInfoCard";
import { Grid, SvgIcon } from "@mui/material";

export const QuickInfoCardGrid = ({
  isLoading,
  aggregateDemandGivenYear,
  aggregateGenerationGivenYear,
  aggregateDemandCurrentMonth,
  aggregateGenerationCurrentMonth,
}) => {
  return (
    <Grid
      container
      spacing={{
        xs: 2,

        md: 3,
      }}
      mt={{
        xs: "0.4rem !important",
        md: "0 !important",
      }}
    >
      <Grid item xs={6} md={3} display="flex">
        <QuickInfoCard
          title="Total demand this year"
          quickInfo={aggregateDemandGivenYear}
          isLoading={isLoading}
        />
      </Grid>
      <Grid item xs={6} md={3} display="flex">
        <QuickInfoCard
          title="Total generation this year"
          quickInfo={aggregateGenerationGivenYear}
          isLoading={isLoading}
        />
      </Grid>
      <Grid item xs={6} md={3} display="flex">
        <QuickInfoCard
          title="Total demand this month"
          quickInfo={aggregateDemandCurrentMonth}
          isLoading={isLoading}
        />
      </Grid>
      <Grid item xs={6} md={3} display="flex">
        <QuickInfoCard
          title="Total generation this month"
          quickInfo={aggregateGenerationCurrentMonth}
          isLoading={isLoading}
        />
      </Grid>
    </Grid>
  );
};
