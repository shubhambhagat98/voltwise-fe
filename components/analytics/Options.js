import {
  Box,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Typography,
  useTheme,
  useMediaQuery,
  Stack,
} from "@mui/material";
import { useState } from "react";
import { useAnalyticsStore } from "@/store/analyticsStore";
import { tokens } from "@/theme/colorTokens";

const customStyles = (theme, colors) => ({
  labelText: {
    typography: {
      xs: "body1",
      sm: "h6",
    },
    display: {
      xs: "none",
      md: "block",
    },
  },

  selectPaperprops: {
    boxShadow: `${
      theme.palette.mode === "dark" ? theme.shadows[13] : theme.shadows[10]
    }`,

    "& .MuiList-root": {
      width: "100%",
      background: `${theme.palette.background.paper}`,
    },

    "& .Mui-selected": {
      background: `${theme.palette.secondary.main}`,
      backgroundColor: `${theme.palette.secondary.main} !important`,
      color: `${theme.palette.primary.dark}`,
    },
    "& .MuiMenuItem-root": {
      //   my: "0.5rem",
      "&:hover": {
        backgroundColor: `${
          theme.palette.mode === "dark"
            ? colors.blueAccent[200]
            : colors.blueAccent[700]
        }`,
      },
    },
  },

  formRoot: {
    width: "100%",
    "& label.Mui-focused": {
      color: theme.palette.secondary.main,
    },
    "& .MuiOutlinedInput-root": {
      "&.Mui-focused fieldset": {
        borderColor: theme.palette.secondary.main,
        borderWidth: "1px",
      },
    },
  },
});

export const Options = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const colors = tokens(theme);

  const region = useAnalyticsStore((state) => state.region);
  const setRegion = useAnalyticsStore((state) => state.setRegion);

  const regionName = useAnalyticsStore((state) => state.regionName);
  const setRegionName = useAnalyticsStore((state) => state.setRegionName);

  const year = useAnalyticsStore((state) => state.year);
  const setYear = useAnalyticsStore((state) => state.setYear);

  const styles = customStyles(theme, colors);

  const handleRegionChange = (e) => {
    const regionName = e.target.value.split(":")[0];
    const region = e.target.value.split(":")[1];
    setRegion(region);
    setRegionName(regionName);
  };

  const handleYearChange = (e) => {
    setYear(e.target.value);
  };

  return (
    <>
      <Stack
        direction={{ xs: "column-reverse", sm: "row" }}
        justifyContent="space-between"
        alignItems="center"
        mt={4}
      >
        <Typography
          sx={{
            fontSize: {
              xs: "1.2rem",
              sm: "1.5rem",
              md: "1.8rem",
            },

            mt: {
              xs: 3,
              sm: 0,
            },
            color: theme.palette.text.primary,
          }}
        >
          Analytics for {regionName || ""} in {year || ""}
        </Typography>
        <Stack
          direction="row"
          spacing={2}
          alignItems="center"
          sx={{
            width: {
              xs: "100%",
              sm: "auto",
            },
          }}
        >
          {region !== undefined && (
            <>
              <Typography sx={styles.labelText}>Region: </Typography>
              <FormControl
                sx={{
                  // m: 1,

                  ...styles.formRoot,
                }}
                size="small"
              >
                <InputLabel
                  sx={{
                    display: {
                      xs: "block",
                      md: "none",
                    },
                  }}
                  id="region-label"
                >
                  Region
                </InputLabel>
                <Select
                  labelId="region-label"
                  value={regionName + ":" + region}
                  onChange={handleRegionChange}
                  label={isMobile ? "Region" : null}
                  MenuProps={{
                    PaperProps: {
                      sx: styles.selectPaperprops,
                    },
                  }}
                >
                  <MenuItem value="" disabled>
                    Select
                  </MenuItem>
                  <MenuItem value="California:CAL">California (CAL)</MenuItem>
                  <MenuItem value="Carolinas:CAR">Carolinas (CAR)</MenuItem>
                  <MenuItem value="Central:CENT">Central (CENT)</MenuItem>
                  <MenuItem value="Florida:FLA">Florida (FLA)</MenuItem>
                  <MenuItem value="Mid-Atlantic:MIDA">
                    Mid-Atlantic (MIDA)
                  </MenuItem>
                  <MenuItem value="Midwest:MIDW">Midwest (MIDW)</MenuItem>
                  <MenuItem value="Northeast:NE">Northeast (NE)</MenuItem>
                  {/* <MenuItem value="NW">Northwest</MenuItem> */}
                  <MenuItem value="New York:NY">New York (NY)</MenuItem>
                  <MenuItem value="Southeast:SE">Southeast (SE)</MenuItem>
                  <MenuItem value="Southwest:SW">Southwest (SW)</MenuItem>
                  <MenuItem value="Texas:TEX">Texas (TEX)</MenuItem>
                </Select>
              </FormControl>
            </>
          )}
          {year !== undefined && (
            <>
              <Typography sx={styles.labelText} mr={2}>
                Year:{" "}
              </Typography>
              <FormControl
                sx={{
                  // m: 1,

                  ...styles.formRoot,
                }}
                size="small"
              >
                <InputLabel
                  sx={{
                    display: {
                      xs: "block",
                      md: "none",
                    },
                  }}
                  id="year-label"
                >
                  Year
                </InputLabel>
                <Select
                  labelId="year-label"
                  value={year}
                  onChange={handleYearChange}
                  label={isMobile ? "Year" : null}
                  MenuProps={{
                    PaperProps: {
                      sx: styles.selectPaperprops,
                    },
                  }}
                >
                  <MenuItem value="" disabled>
                    Select
                  </MenuItem>
                  <MenuItem value={2015}>2015</MenuItem>
                  <MenuItem value={2016}>2016</MenuItem>
                  <MenuItem value={2017}>2017</MenuItem>
                  <MenuItem value={2018}>2018</MenuItem>
                  <MenuItem value={2019}>2019</MenuItem>
                  <MenuItem value={2020}>2020</MenuItem>
                  <MenuItem value={2021}>2021</MenuItem>
                  <MenuItem value={2022}>2022</MenuItem>
                  <MenuItem value={2023}>2023</MenuItem>
                </Select>
              </FormControl>
            </>
          )}
        </Stack>
      </Stack>
    </>
  );
};
