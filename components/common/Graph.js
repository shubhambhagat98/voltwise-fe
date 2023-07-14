import {
  Box,
  useTheme,
  Stack,
  Button,
  Typography,
  CircularProgress,
} from "@mui/material";
import { tokens } from "@/theme/colorTokens";
import dynamic from "next/dynamic";

const ReactApexChart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});

import { useEffect, useState } from "react";

const chartOptions = {
  chart: {
    height: 450,
    type: "line",

    toolbar: {
      show: true,
      tools: {
        download: false,
      },
    },
    xaxis: {
      type: "datetime",
    },
  },

  dataLabels: {
    enabled: false,
  },
};

const formatDateWithDay = (val) => {
  return new Date(val).toLocaleDateString("en-US", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
};

const formatDateWithoutDay = (val) => {
  const date = new Date(val);
  const month = date.toLocaleString("default", { month: "short" });
  const year = date.getFullYear().toString().substr(-2);
  return month + ", " + year;
};

export const Graph = ({
  actualdata,
  predictedData,
  type,
  region,
  isLoading,
  isFetching,
}) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [options, setOptions] = useState(chartOptions);
  const [minDate, setMinDate] = useState(
    actualdata.length !== 0 ? actualdata[0][0] : null
  );

  const [series, setSeries] = useState([]);
  const [duration, setDuration] = useState("6months");
  const current = new Date(
    actualdata.length !== 0 ? actualdata[actualdata.length - 1][0] : null
  );

  useEffect(() => {
    setSeries([
      {
        name: "Actual " + type,
        data: actualdata,
      },

      {
        name: "Predicted " + type,
        data: predictedData,
      },
    ]);
  }, [actualdata, predictedData]);

  useEffect(() => {
    if (duration === "3months") {
      const threeMonthsAgo = new Date(
        current.getFullYear(),
        current.getMonth() - 3,
        current.getDate()
      );
      setMinDate(threeMonthsAgo.getTime());
    } else if (duration === "6months") {
      const sixMonthsAgo = new Date(
        current.getFullYear(),
        current.getMonth() - 6,
        current.getDate()
      );
      setMinDate(sixMonthsAgo.getTime());
    } else if (duration === "1year") {
      const oneYearAgo = new Date(
        current.getFullYear(),
        current.getMonth() - 12,
        current.getDate()
      );
      setMinDate(oneYearAgo.getTime());
    } else if (duration === "all") {
      setMinDate(
        actualdata.length !== 0 ? new Date(actualdata[0][0]).getTime() : null
      );
    }
  }, [duration, actualdata]);

  useEffect(() => {
    setOptions((prevState) => ({
      ...prevState,
      annotations: {
        xaxis: [
          !isLoading && {
            x:
              actualdata.length !== 0
                ? new Date(actualdata[actualdata.length - 1][0]).getTime()
                : null,
            borderColor: theme.palette.secondary.main,
            strokeDashArray: 0,
            label: {
              text: "Forecast begin",
              borderColor: theme.palette.secondary.main,
              style: {
                color: colors.primary[400],
                background: theme.palette.secondary.main,
                fontSize: "10px",
              },
              position: "top",
              offsetY: -5,
            },
          },
        ],
      },
    }));
  }, [isLoading, actualdata]);

  useEffect(() => {
    setOptions((prevState) => ({
      ...prevState,
      chart: {
        ...prevState.chart,

        events: {
          beforeResetZoom: function (chartContext, opts) {
            setDuration("1year");
          },
        },
      },
      stroke: {
        curve: "smooth",
        width: 2,
        lineCap: "round",
        dashArray: [0, 4],
      },

      colors: [colors.greenAccent[500], colors.redAccent[500]],
      xaxis: {
        min: minDate,

        type: "datetime",
        tickAmount: 12,
        tickPlacement: "on",
        tooltip: {
          enabled: false,
        },

        labels: {
          show: !isLoading,
          style: {
            colors: theme.palette.neutral.light,
          },
          formatter: formatDateWithoutDay,
        },
        axisBorder: {
          show: true,
          color: theme.palette.neutral.main,
        },
      },
      yaxis: {
        labels: {
          style: {
            colors: theme.palette.neutral.light,
          },
          formatter: function (val) {
            return (val / 1000).toFixed(0) + "GW";
          },
        },
        title: {
          text: `${type} (GW)`,
          style: {
            color: theme.palette.neutral.light,
          },
        },
      },
      grid: {
        strokeDashArray: 0,
        borderColor: theme.palette.neutral.main,
      },
      tooltip: {
        theme: theme.palette.mode === "dark" ? "dark" : "light",
        x: {
          formatter: formatDateWithDay,
        },
        y: {
          formatter: function (val) {
            return (val / 1000).toFixed(2) + "GW";
          },
        },
      },
      legend: {
        labels: {
          colors: theme.palette.neutral.light,
        },
      },
    }));
  }, [theme, minDate, isLoading]);

  return (
    <Box
      backgroundColor={
        theme.palette.mode === "dark"
          ? colors.primary[500]
          : colors.primary[400]
      }
      borderRadius="10px"
      //   my={2}
      p={2}
      m={1}
      boxShadow={theme.shadows[10]}
    >
      <Stack
        direction={{ xs: "column", sm: "row" }}
        justifyContent="space-between"
        alignItems="center"
      >
        <Typography
          variant="h5"
          sx={{
            mb: {
              xs: 1,
            },
          }}
        >
          {type} Report - {region}
        </Typography>
        <Stack direction="row" spacing={1}>
          <Button
            size="small"
            sx={{ textTransform: "none" }}
            variant={duration === "3months" ? "outlined" : "text"}
            color={duration === "3months" ? "secondary" : "inherit"}
            onClick={() => setDuration("3months")}
          >
            Quarter
          </Button>
          <Button
            size="small"
            sx={{ textTransform: "none" }}
            variant={duration === "6months" ? "outlined" : "text"}
            color={duration === "6months" ? "secondary" : "inherit"}
            onClick={() => setDuration("6months")}
          >
            6 Months
          </Button>
          <Button
            size="small"
            sx={{ textTransform: "none" }}
            variant={duration === "1year" ? "outlined" : "text"}
            color={duration === "1year" ? "secondary" : "inherit"}
            onClick={() => setDuration("1year")}
          >
            1 Year
          </Button>
          <Button
            size="small"
            sx={{ textTransform: "none" }}
            variant={duration === "all" ? "outlined" : "text"}
            color={duration === "all" ? "secondary" : "inherit"}
            onClick={() => setDuration("all")}
          >
            All
          </Button>
        </Stack>
      </Stack>

      <Box
        sx={{
          mt: 2.5,
          mr: 1,
          position: "relative",
        }}
        overflow={"hidden"}
      >
        {(isLoading || isFetching) && (
          <CircularProgress
            sx={{
              position: "absolute",
              top: "40%",
              left: "45%",
              transform: "translate(-50%, -50%)",
              color: theme.palette.secondary.main,
              zIndex: 100,
            }}
            size={80}
          />
        )}
        <ReactApexChart
          options={options}
          series={series}
          type="line"
          height={400}
          width={"100%"}
          fontFamily={theme.typography.fontFamily}
        />
      </Box>
    </Box>
  );
};
