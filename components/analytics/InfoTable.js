import {
  useTheme,
  Box,
  Typography,
  TableHead,
  Table,
  TableRow,
  TableCell,
  TableContainer,
  TableBody,
  Stack,
  Skeleton,
} from "@mui/material";
import { tokens } from "@/theme/colorTokens";
import { useEffect, useRef } from "react";

import {
  EastOutlined,
  NorthOutlined,
  SouthOutlined,
} from "@mui/icons-material";

const months = {
  1: "January",
  2: "February",
  3: "March",
  4: "April",
  5: "May",
  6: "June",
  7: "July",
  8: "August",
  9: "September",
  10: "October",
  11: "November",
  12: "December",
};

const tableHeaders = [
  "Month",
  "Aggregate Demand",
  "Aggregate Generation",
  "% Change (Demand)",
  "% Change (Generation)",
  "Average Demand",
  "Average Generation",
  "Generation/Demand Ratio",
];

const customStyles = (theme, colors) => ({
  table: {
    overflowX: "auto",

    position: "relative",
    width: "100%",
    "& td, & th": { whiteSpace: "nowrap" },
    "&::-webkit-scrollbar": {
      height: {
        xs: 5,
        sm: 5,
        md: 7,
      },
      background:
        theme.palette.mode === "dark" ? colors.grey[700] : colors.grey[900],
      borderRadius: 2,
    },
    "&::-webkit-scrollbar-track": {
      background:
        theme.palette.mode === "dark" ? colors.grey[700] : colors.grey[900],
      borderRadius: 2,
    },
    "&::-webkit-scrollbar-thumb": {
      background:
        theme.palette.mode === "dark" ? colors.grey[400] : colors.grey[700],
      borderRadius: 2,
    },

    borderRadius: "5px",
  },
});

const PercentChange = ({
  value,
  increaseColor,
  decreaseColor,
  noChangeColor,
}) => {
  return (
    <Stack direction="row" spacing={1} alignItems="center">
      {value > 0 ? (
        <NorthOutlined
          sx={{
            color: increaseColor,
          }}
        />
      ) : value < 0 ? (
        <SouthOutlined
          sx={{
            color: decreaseColor,
          }}
        />
      ) : (
        <EastOutlined
          sx={{
            color: noChangeColor,
          }}
        />
      )}
      <Typography>{Math.abs(value.toFixed(2)) + "%"}</Typography>
    </Stack>
  );
};

const SkeletonTableBody = () =>
  [...Array(6)].map((_, index) => (
    <TableRow
      key={index}
      hover
      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
    >
      {tableHeaders.map((header, index) => (
        <TableCell key={index}>
          <Skeleton
            sx={{
              minWidth: 76,
            }}
          />
        </TableCell>
      ))}
    </TableRow>
  ));

export const InfoTable = ({ isLoading, tableData }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const styles = customStyles(theme, colors);
  const tableRef = useRef(null);

  // // make table scroll horizontally using mouse wheel
  // useEffect(() => {
  //   const handleWheel = (event) => {
  //     const { deltaY } = event;

  //     // Check if the table is scrollable horizontally
  //     if (tableRef.current.scrollWidth > tableRef.current.clientWidth) {
  //       event.preventDefault();
  //       tableRef.current.scrollLeft += deltaY;
  //     }
  //   };

  //   tableRef.current.addEventListener("wheel", handleWheel, { passive: false });

  //   return () => {
  //     if (tableRef.current) {
  //       tableRef.current.removeEventListener("wheel", handleWheel);
  //     }
  //   };
  // }, []);

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
      minHeight={300}
    >
      <Typography
        variant="h5"
        sx={{
          mb: {
            xs: 1,
          },
        }}
      >
        Monthly Statistics
      </Typography>

      <Box>
        <TableContainer ref={tableRef} sx={styles.table}>
          <Table
            sx={{
              width: "100%",
            }}
          >
            <TableHead>
              <TableRow
                sx={{
                  backgroundColor:
                    theme.palette.mode === "dark"
                      ? colors.primary[400]
                      : colors.grey[900] + "80",
                  "&:last-child td, &:last-child th": { border: 0 },
                }}
              >
                {tableHeaders.map((header, index) => (
                  <TableCell key={index}>{header}</TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {isLoading ? (
                <SkeletonTableBody />
              ) : (
                tableData.map((row, index) => (
                  <TableRow
                    key={index}
                    hover
                    sx={{
                      "&:last-child td, &:last-child th": { border: 0 },
                    }}
                  >
                    <TableCell>
                      <Typography>{months[row.Month]}</Typography>
                    </TableCell>
                    <TableCell>
                      <Typography>
                        {(row.Aggregate_Demand / 1000).toFixed(2) + " GW"}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography>
                        {(row.Aggregate_Generation / 1000).toFixed(2) + " GW"}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <PercentChange
                        value={row.Demand_pct_change}
                        increaseColor={colors.greenAccent[500]}
                        decreaseColor={colors.redAccent[500]}
                        noChangeColor={colors.yellowAccent[500]}
                      />
                    </TableCell>
                    <TableCell>
                      <PercentChange
                        value={row.Net_generation_pct_change}
                        increaseColor={colors.greenAccent[500]}
                        decreaseColor={colors.redAccent[500]}
                        noChangeColor={colors.yellowAccent[500]}
                      />
                    </TableCell>
                    <TableCell>
                      <Typography>
                        {(row.Average_Demand / 1000).toFixed(2) + " GW"}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography>
                        {(row.Average_Generation / 1000).toFixed(2) + " GW"}
                      </Typography>
                    </TableCell>
                    <TableCell align="center">
                      <Typography>
                        {row.Generation_to_demand_ratio.toFixed(3)}
                      </Typography>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Box>
  );
};
