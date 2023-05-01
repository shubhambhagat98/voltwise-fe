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
} from "@mui/material";
import { useState } from "react";
import { useCompareStore } from "@/store/compareStore";
import { tokens } from "@/theme/colorTokens";

const customStyles = (theme, colors) => ({
  labelText: {
    typography: {
      xs: "body1",
      sm: "h6",
    },
    display: {
      xs: "none",
      sm: "block",
    },
    whiteSpace: "nowrap",
  },

  selectPaperprops: {
    boxShadow: `${
      theme.palette.mode === "dark" ? theme.shadows[13] : theme.shadows[10]
    }`,

    "& .MuiList-root": {
      //   width: "76%",
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
    width: {
      xs: "100%",

      md: "75%",
    },
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
  const colors = tokens(theme);

  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const styles = customStyles(theme, colors);

  const region1 = useCompareStore((state) => state.region1);
  const region2 = useCompareStore((state) => state.region2);
  const setRegion1 = useCompareStore((state) => state.setRegion1);
  const setRegion2 = useCompareStore((state) => state.setRegion2);

  const frequency = useCompareStore((state) => state.frequency);
  const setFrequency = useCompareStore((state) => state.setFrequency);

  const timePeriod = useCompareStore((state) => state.timePeriod);
  const setTimePeriod = useCompareStore((state) => state.setTimePeriod);

  const model = useCompareStore((state) => state.model);
  const setModel = useCompareStore((state) => state.setModel);

  const handleRegion1Change = (e) => {
    setRegion1(e.target.value);
  };

  const handleRegion2Change = (e) => {
    setRegion2(e.target.value);
  };

  const handleFrequencyChange = (e) => {
    setFrequency(e.target.value);
  };

  const handleTimePeriodChange = (e) => {
    setTimePeriod(e.target.value);
  };

  const handleModelChange = (e) => {
    setModel(e.target.value);
  };

  return (
    <Grid
      container
      sx={{
        marginTop: {
          xs: "1rem",
          sm: "2rem",
          md: "3rem",
        },
        // display: "flex",
        // alignItems: "center",
        // justifyContent: "center",
      }}
      rowGap={1}
    >
      {region1 !== undefined && (
        <Grid
          item
          xs={6}
          sm={4}
          md={3}
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "0.5rem",
          }}
        >
          <Typography sx={styles.labelText} mr={2}>
            Region 1:
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
                  sm: "none",
                },
              }}
              id="region1-label"
            >
              Region 1
            </InputLabel>
            <Select
              labelId="region1-label"
              value={region1}
              onChange={handleRegion1Change}
              label={isMobile ? "Region 1" : null}
              MenuProps={{
                PaperProps: {
                  sx: styles.selectPaperprops,
                },
              }}
            >
              <MenuItem value="" disabled>
                Select
              </MenuItem>
              <MenuItem value="CAL">California (CAL)</MenuItem>
              <MenuItem value="CAR">Carolinas (CAR)</MenuItem>
              <MenuItem value="CENT">Central (CENT)</MenuItem>
              <MenuItem value="FLA">Florida (FLA)</MenuItem>
              <MenuItem value="MIDA">Mid-Atlantic (MIDA)</MenuItem>
              <MenuItem value="MIDW">Midwest (MIDW)</MenuItem>
              <MenuItem value="NE">Northeast (NE)</MenuItem>
              {/* <MenuItem value="NW">Northwest</MenuItem> */}
              <MenuItem value="NY">New York (NY)</MenuItem>
              <MenuItem value="SE">Southeast (SE)</MenuItem>
              <MenuItem value="SW">Southwest (SW)</MenuItem>
              <MenuItem value="TEX">Texas (TEX)</MenuItem>
            </Select>
          </FormControl>
        </Grid>
      )}

      {region2 !== undefined && (
        <Grid
          item
          xs={6}
          sm={4}
          md={3}
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "0.5rem",
          }}
        >
          <Typography sx={styles.labelText} mr={2}>
            Region 2:{" "}
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
                  sm: "none",
                },
              }}
              id="region2-label"
            >
              Region 2
            </InputLabel>
            <Select
              labelId="region2-label"
              value={region2}
              onChange={handleRegion2Change}
              label={isMobile ? "Region 2" : null}
              MenuProps={{
                PaperProps: {
                  sx: styles.selectPaperprops,
                },
              }}
            >
              <MenuItem value="" disabled>
                Select
              </MenuItem>
              <MenuItem value="CAL">California (CAL)</MenuItem>
              <MenuItem value="CAR">Carolinas (CAR)</MenuItem>
              <MenuItem value="CENT">Central (CENT)</MenuItem>
              <MenuItem value="FLA">Florida (FLA)</MenuItem>
              <MenuItem value="MIDA">Mid-Atlantic (MIDA)</MenuItem>
              <MenuItem value="MIDW">Midwest (MIDW)</MenuItem>
              <MenuItem value="NE">Northeast (NE)</MenuItem>
              {/* <MenuItem value="NW">Northwest</MenuItem> */}
              <MenuItem value="NY">New York (NY)</MenuItem>
              <MenuItem value="SE">Southeast (SE)</MenuItem>
              <MenuItem value="SW">Southwest (SW)</MenuItem>
              <MenuItem value="TEX">Texas (TEX)</MenuItem>
            </Select>
          </FormControl>
        </Grid>
      )}

      {frequency !== undefined && (
        <Grid
          item
          xs={6}
          sm={4}
          md={3}
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "0.5rem",
          }}
        >
          <Typography sx={styles.labelText} mr={2}>
            Frequency:{" "}
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
                  sm: "none",
                },
              }}
              id="freq-label"
            >
              Frequency
            </InputLabel>
            <Select
              labelId="freq-label"
              value={frequency}
              onChange={handleFrequencyChange}
              label={isMobile ? "Frequency" : null}
              MenuProps={{
                PaperProps: {
                  sx: styles.selectPaperprops,
                },
              }}
            >
              <MenuItem value="" disabled>
                Select
              </MenuItem>
              <MenuItem value="D">Daily</MenuItem>
              <MenuItem value="W">Weekly</MenuItem>
              <MenuItem value="M">Monthly</MenuItem>
              <MenuItem value="3M">Quaterly</MenuItem>
              <MenuItem value="6M">6 Months</MenuItem>
              <MenuItem value="1Y">Yearly</MenuItem>
            </Select>
          </FormControl>
        </Grid>
      )}

      {timePeriod !== undefined && (
        <Grid
          item
          xs={6}
          sm={4}
          md={3}
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "0.5rem",
          }}
        >
          <Typography sx={styles.labelText} mr={2}>
            Time:{" "}
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
                  sm: "none",
                },
              }}
              id="time-label"
            >
              Time
            </InputLabel>
            <Select
              labelId="time-label"
              value={timePeriod}
              onChange={handleTimePeriodChange}
              label={isMobile ? "Frequency" : null}
              MenuProps={{
                PaperProps: {
                  sx: styles.selectPaperprops,
                },
              }}
            >
              <MenuItem value="" disabled>
                Select
              </MenuItem>

              <MenuItem value="1-month">1 Month</MenuItem>
              <MenuItem value="3-months">3 Months</MenuItem>
              <MenuItem value="6-months">6 Months</MenuItem>
              <MenuItem value="1-year">1 Year</MenuItem>
            </Select>
          </FormControl>
        </Grid>
      )}

      {model !== undefined && (
        <Grid
          item
          xs={6}
          sm={4}
          md={3}
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "0.5rem",
          }}
        >
          <Typography sx={styles.labelText} mr={2}>
            Model:{" "}
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
                  sm: "none",
                },
              }}
              id="time-label"
            >
              Model
            </InputLabel>
            <Select
              labelId="time-label"
              value={model}
              onChange={handleModelChange}
              label={isMobile ? "Model" : null}
              MenuProps={{
                PaperProps: {
                  sx: styles.selectPaperprops,
                },
              }}
            >
              <MenuItem value="" disabled>
                Select
              </MenuItem>
              <MenuItem value="arima">Arima</MenuItem>
              <MenuItem value="prophet">Prophet</MenuItem>
            </Select>
          </FormControl>
        </Grid>
      )}
    </Grid>
  );
};
