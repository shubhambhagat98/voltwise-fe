import React from "react";
import {
  Avatar,
  Box,
  Stack,
  Typography,
  useTheme,
  Skeleton,
} from "@mui/material";
import { tokens } from "@/theme/colorTokens";
import {
  ElectricBoltOutlined,
  ElectricalServicesOutlined,
  TrendingDownOutlined,
  TrendingUpOutlined,
  TrendingFlatOutlined,
} from "@mui/icons-material";

const customStyles = (theme, colors, isDemand) => ({
  leftIcon: {
    color: isDemand ? colors.blueAccent[500] : colors.greenAccent[500],

    backgroundColor: isDemand
      ? colors.blueAccent[500] + "25"
      : colors.greenAccent[500] + "25",

    display: {
      xs: "none",
      sm: "flex",
      md: "none",
      lg: "flex",
    },
    width: 50,
    height: 50,
  },

  rightIcon: {
    color: isDemand ? colors.blueAccent[500] : colors.greenAccent[500],

    backgroundColor: isDemand
      ? colors.blueAccent[500] + "25"
      : colors.greenAccent[500] + "25",

    width: {
      xs: 30,
      sm: 40,
    },
    height: {
      xs: 30,
      sm: 40,
    },
    display: {
      xs: "none",
      md: "flex",
      lg: "none",
    },
  },

  metricText: {
    typography: {
      xs: "body1",
      sm: "h4",
      md: "h5",
      lg: "h4",
    },
    fontWeight: "600 !important",
  },

  title: {
    color: theme.palette.neutral.main,
    fontSize: {
      xs: "0.6rem",
      sm: "1rem",
    },
  },

  percentChange: {
    typography: {
      sm: "body1",
    },

    fontSize: {
      xs: "0.6rem",
    },

    display: "flex",
    alignItems: "center",
    columnGap: {
      xs: 0.5,
      sm: 1,
    },
  },

  percentChangeIcon: {
    fontSize: {
      xs: "0.9rem",
      sm: "1rem",
    },
  },
});

export const QuickInfoCard = ({ isLoading, title, quickInfo }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const isDemand = title.toLowerCase().includes("demand");

  const styles = customStyles(theme, colors, isDemand);

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
      boxShadow={theme.shadows[10]}
      sx={{
        width: "100%",
      }}
    >
      <Stack
        direction="row"
        spacing={{
          xs: 0,
          sm: 2,
        }}
        alignItems="center"
      >
        <Avatar sx={styles.leftIcon}>
          {!isDemand ? (
            <ElectricBoltOutlined />
          ) : (
            <ElectricalServicesOutlined />
          )}
        </Avatar>
        <Stack
          direction="column"
          spacing={{
            xs: 1,
            md: 1.5,
          }}
        >
          <Stack direction="row" spacing={1} alignItems="flex-start">
            <Typography sx={styles.title}>{title}</Typography>
            <Avatar sx={styles.rightIcon}>
              {!isDemand ? (
                <ElectricBoltOutlined />
              ) : (
                <ElectricalServicesOutlined />
              )}
            </Avatar>
          </Stack>
          {quickInfo?.value ? (
            <Typography sx={styles.metricText}>
              {/* {(quickInfo.value / 1000).toFixed(2) + " GW"} */}
              {`${(quickInfo.value / 1000).toLocaleString(undefined, {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })} GW`}
            </Typography>
          ) : (
            <Skeleton
              variant="text"
              width="90%"
              sx={{
                display: "flex",
                fontSize: "1.5rem",
                margin: "0 !important",
              }}
            />
          )}

          <Stack
            direction="row"
            spacing={{
              xs: 0.5,
              sm: 1,
            }}
            alignItems="center"
            flexWrap="wrap"
          >
            {quickInfo?.percentChange !== undefined ? (
              <Typography
                sx={{
                  ...styles.percentChange,
                  color:
                    quickInfo.percentChange > 0
                      ? colors.greenAccent[500]
                      : quickInfo.percentChange < 0
                      ? colors.redAccent[500]
                      : colors.yellowAccent[500],
                }}
              >
                {quickInfo.percentChange > 0 ? (
                  <TrendingUpOutlined sx={styles.percentChangeIcon} />
                ) : quickInfo.percentChange < 0 ? (
                  <TrendingDownOutlined sx={styles.percentChangeIcon} />
                ) : (
                  <TrendingFlatOutlined sx={styles.percentChangeIcon} />
                )}
                {quickInfo.percentChange.toFixed(2) + "%"}
              </Typography>
            ) : (
              <Skeleton variant="text" width={65} height={20} />
            )}
            <Typography
              sx={{
                typography: {
                  sm: "body1",
                },

                fontSize: {
                  xs: "0.6rem",
                },
                color: theme.palette.neutral.main,
              }}
            >
              {title.toLowerCase().includes("year")
                ? "since last year"
                : "since last month"}
            </Typography>
          </Stack>
        </Stack>
      </Stack>
    </Box>
  );
};
