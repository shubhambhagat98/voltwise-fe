import { useTheme, Box, Typography, Divider } from "@mui/material";
import { tokens } from "@/theme/colorTokens";
import { MetricBox } from "./MetricBox";

export const Metrics = ({
  totalEnergyImport,
  totalEnergyExport,
  isLoading,
  region,
  year,
}) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <Box
      sx={{
        backgroundColor:
          theme.palette.mode === "dark"
            ? colors.primary[500]
            : colors.primary[400],
      }}
      borderRadius="10px"
      //   my={2}
      p={2}
      boxShadow={theme.shadows[10]}
      width="100%"
      height="100%"
    >
      <Typography
        variant="h5"
        sx={{
          mb: {
            md: 1,
            lg: 2,
          },
        }}
      >
        {`Energy Exchange Insights`}
      </Typography>

      <Box
        sx={{
          display: "flex",
          flexDirection: {
            xs: "column",
            sm: "row",
            md: "column",
          },
          height: "100%",
          // space between elements vertically
          justifyContent: {
            sm: "space-evenly",
            md: "flex-start",
          },
        }}
      >
        <MetricBox
          title="Total Energy Import this year"
          value={totalEnergyImport}
          isLoading={isLoading}
        />
        <Divider
          sx={{
            display: {
              xs: "flex",
              sm: "none",
              md: "flex",
            },
            marginBottom: {
              xs: 1,
              md: 2,
            },
            marginTop: {
              xs: 1,
              md: 2,
            },
          }}
        />
        <MetricBox
          title="Total Energy Export this year"
          value={totalEnergyExport}
          isLoading={isLoading}
        />
        <Divider
          sx={{
            display: {
              xs: "flex",
              sm: "none",
              md: "flex",
            },
            marginBottom: {
              xs: 1,
              md: 2,
            },
            marginTop: {
              xs: 1,
              md: 2,
            },
          }}
        />

        <MetricBox
          title="Energy Trade Balance this year"
          value={
            totalEnergyImport === null
              ? null
              : totalEnergyImport - totalEnergyExport
          }
          isLoading={isLoading}
        />
      </Box>
    </Box>
  );
};
