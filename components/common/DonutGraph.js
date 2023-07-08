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

import { use, useEffect, useState } from "react";

const labelList = ["Quarter 1", "Quarter 2", "Quarter 3", "Quarter 4"];

const donoutChartOptions = {
  chart: {
    //  id: 'basic-donut'
    type: "donut",
  },

  legend: {
    show: true,
  },
  responsive: [
    {
      breakpoint: 769,
      options: {
        // chart: {
        //   width: 200,
        // },
        legend: {
          position: "bottom",
          fontSize: "10px",
        },
      },
    },
  ],
};
const seriesList = [44.5, 55, 13, 43];
export const DonutGraph = ({ isLoading, donutSeries, title }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [series, setSeries] = useState(donutSeries);
  const [options, setOptions] = useState(donoutChartOptions);

  useEffect(() => {
    setSeries(donutSeries);
  }, [donutSeries]);

  useEffect(() => {
    setOptions((prev) => ({
      ...prev,
      responsive: [
        {
          breakpoint: 800,
          options: {
            // chart: {
            //   width: 200,
            // },
            legend: {
              position: "bottom",
              fontSize: "10px",
            },
          },
        },
      ],

      stroke: {
        show: true,
        width: 1,
        colors: [colors.primary[400]],
      },
      labels: labelList,
      tooltip: {
        fillSeriesColor: false,
        theme: theme.palette.mode === "dark" ? "dark" : "light",
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
        fontSize: "15px",
      },
      colors: [
        colors.greenAccent[500],
        colors.blueAccent[500],
        colors.yellowAccent[500],
        colors.redAccent[500],
      ],
      plotOptions: {
        pie: {
          donut: {
            size: "65%",
            labels: {
              show: true,
              name: {
                show: true,
                // fontSize: "20px",
              },
              value: {
                show: true,
                // fontSize: "20px",
                fontWeight: "bold",
                color:
                  theme.palette.mode === "dark"
                    ? "#fff"
                    : theme.palette.neutral.light,
                formatter: function (w) {
                  return (parseFloat(w) / 1000).toFixed(2) + " GW";
                },
              },
              total: {
                show: true,
                showAlways: true,
                fontSize: "20px",

                color: theme.palette.neutral.light,
                formatter: function (w) {
                  return (
                    (
                      w.globals.seriesTotals.reduce((a, b) => a + b, 0) / 1000
                    ).toFixed(2) + " GW"
                  );
                },
              },
            },
          },
        },
      },
    }));
  }, [theme]);

  return (
    <Box
      sx={{
        backgroundColor:
          theme.palette.mode === "dark"
            ? colors.primary[500]
            : colors.primary[400],
        position: "relative",
      }}
      borderRadius="10px"
      //   my={2}
      p={2}
      boxShadow={theme.shadows[10]}
      width="100%"
      minHeight={400}
    >
      <Typography
        variant="h5"
        sx={{
          mb: {
            xs: 2,
          },
        }}
      >
        Quarterly - {title}
      </Typography>

      {isLoading ? (
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
      ) : (
        <ReactApexChart
          options={options}
          series={series}
          type="donut"
          height={350}
          width="100%"
          fontFamily={theme.typography.fontFamily}
          key={Math.random()}
        />
      )}
    </Box>
  );
};
