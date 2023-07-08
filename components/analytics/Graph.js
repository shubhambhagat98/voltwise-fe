import { useTheme, Box, Typography, CircularProgress } from "@mui/material";
import dynamic from "next/dynamic";
import { tokens } from "@/theme/colorTokens";
import { useEffect, useState } from "react";

const ReactApexChart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});

const columnChartOptions = {
  chart: {
    type: "bar",

    toolbar: {
      show: true,

      offsetX: 0,
      tools: {
        download: true,
        selection: false,
        zoom: false,
        zoomin: false,
        zoomout: false,
        pan: false,
        reset: false,
      },
      export: {
        csv: {
          filename: "Total_Demand_and_Generation.csv",
          columnDelimiter: ",",
          headerCategory: "category",
          headerValue: "value",
        },
        svg: {
          filename: "Total_Demand_and_Generation.svg",
        },
        png: {
          filename: "Total_Demand_and_Generation.png",
        },
      },
    },
    animations: {
      enabled: true,
      easing: "easeinout",
      speed: 400,
      animateGradually: {
        enabled: false,
        // delay: 150,
      },
      dynamicAnimation: {
        enabled: true,
        speed: 350,
      },
    },
  },
  grid: {
    strokeDashArray: 0,
  },
};

const categories = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

export const Graph = ({ graphData, isLoading }) => {
  const [series, setSeries] = useState([]);
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [options, setOptions] = useState(columnChartOptions);

  useEffect(() => {
    setSeries([
      {
        name: "Total Demand",
        data:
          graphData?.aggregateDemand !== undefined
            ? graphData.aggregateDemand
            : [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      },
      {
        name: "Total Generation",
        data:
          graphData?.aggregateGeneration !== undefined
            ? graphData.aggregateGeneration
            : [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      },
    ]);
  }, [graphData]);

  useEffect(() => {
    setOptions((prevState) => ({
      ...prevState,
      chart: {
        type: "bar",

        toolbar: {
          show: true,

          offsetX: 0,
          offsetY: -300,
          tools: {
            download: true,
            selection: false,
            zoom: false,
            zoomin: false,
            zoomout: false,
            pan: false,
            reset: false,
          },
        },
        ...prevState.chart,
      },

      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: "55%",
          endingShape: "rounded",
        },
      },
      colors: [colors.greenAccent[500], colors.blueAccent[500]],
      dataLabels: {
        enabled: false,
      },
      stroke: {
        show: true,
        width: 2,
        colors: ["transparent"],
      },
      fill: {
        opacity: 0.9,
      },
      xaxis: {
        tickPlacement: "on",
        tooltip: {
          enabled: false,
        },
        categories: categories,
        labels: {
          style: {
            colors: theme.palette.neutral.light,
          },
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
            fontSize: "8px",
          },
          formatter: function (val) {
            return (val / 1000).toFixed(0) + "GW";
          },
        },
        title: {
          text: `(GW)`,
          style: {
            color: theme.palette.neutral.light,
          },
        },
      },
      grid: {
        borderColor: theme.palette.neutral.dark,
        strokeDashArray: 0,
      },
      tooltip: {
        theme: theme.palette.mode === "dark" ? "dark" : "light",
        // x: {
        //   format: "dd MMM yyyy",
        // },
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
  }, [theme]);

  return (
    <Box
      width="100%"
      sx={{
        position: "relative",
      }}
    >
      <Box
        sx={{
          backgroundColor:
            theme.palette.mode === "dark"
              ? colors.primary[500]
              : colors.primary[400],
          opacity: isLoading ? 0.5 : 1,
        }}
        borderRadius="10px"
        //   my={2}
        p={2}
        boxShadow={theme.shadows[10]}
        width="100%"
      >
        <Typography
          variant="h5"
          sx={{
            mb: {
              xs: 1,
            },
          }}
        >
          Monthly Demand vs Generation
        </Typography>
        <Box
          sx={{
            mt: 2.5,
            mr: 1,

            height: {
              xs: "280px",

              md: "300px",
              lg: "400px",
            },
            ".apexcharts-menu": {
              background:
                theme.palette.mode === "dark"
                  ? colors.primary[500]
                  : colors.primary[400],
              border: `1px solid ${theme.palette.neutral.dark}`,
            },
            ".apexcharts-menu-item": {
              fontSize: "11px",
            },

            ".apexcharts-theme-light .apexcharts-menu-item:hover": {
              background:
                theme.palette.mode === "dark"
                  ? colors.primary[400]
                  : colors.blueAccent[800],
            },
          }}
          overflow={"hidden"}
        >
          <ReactApexChart
            options={options}
            series={series}
            type="bar"
            height={"100%"}
            width={"100%"}
            fontFamily={theme.typography.fontFamily}
          />
        </Box>
      </Box>

      {isLoading && (
        <CircularProgress
          sx={{
            position: "absolute",
            top: "30%",
            left: "45%",
            transform: "translate(-50%, -50%)",
            color: theme.palette.secondary.main,
            zIndex: 100,
          }}
          size={80}
        />
      )}
    </Box>
  );
};
