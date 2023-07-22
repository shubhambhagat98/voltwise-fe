import {
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
import { usePlotStore } from "@/store/plotStore";
import { tokens } from "@/theme/colorTokens";

import { AlertModal } from "../common/AlertModal";

import {
  getTimePeriodInMonths,
  getFrequencyInMonths,
} from "@/utils/FrequencyAndTime";

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
  const colors = tokens(theme);

  const region = usePlotStore((state) => state.region);
  const setRegion = usePlotStore((state) => state.setRegion);

  const frequency = usePlotStore((state) => state.frequency);
  const setFrequency = usePlotStore((state) => state.setFrequency);

  const timePeriod = usePlotStore((state) => state.timePeriod);
  const setTimePeriod = usePlotStore((state) => state.setTimePeriod);

  const model = usePlotStore((state) => state.model);
  const setModel = usePlotStore((state) => state.setModel);

  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const styles = customStyles(theme, colors);

  const [openModal, setOpenModal] = useState({
    open: false,
    message: "",
  });

  const closeModalHandler = () => {
    setOpenModal({
      open: false,
      message: "",
    });
  };

  const handleRegionChange = (e) => {
    setRegion(e.target.value);
  };

  const handleFrequencyChange = (event) => {
    const selectedFrequency = event.target.value;

    // Check if selected frequency is greater than time period
    const timePeriodInMonths = getTimePeriodInMonths(timePeriod);
    const frequencyInMonths = getFrequencyInMonths(selectedFrequency);
    if (frequencyInMonths >= timePeriodInMonths) {
      setOpenModal({
        open: true,
        message: "Please select a frequency that is less than the time period.",
      });
      return;
    }

    setFrequency(selectedFrequency);
  };

  const handleTimePeriodChange = (event) => {
    const selectedTimePeriod = event.target.value;

    // Check if selected time period is less than frequency
    const timePeriodInMonths = getTimePeriodInMonths(selectedTimePeriod);
    const frequencyInMonths = getFrequencyInMonths(frequency);
    if (timePeriodInMonths <= frequencyInMonths) {
      setOpenModal({
        open: true,
        message:
          "Please select a time period that is greater than the frequency.",
      });

      return;
    }

    setTimePeriod(selectedTimePeriod);
  };

  const handleModelChange = (e) => {
    setModel(e.target.value);
  };

  return (
    <>
      <Grid
        container
        sx={{
          marginTop: {
            xs: "1rem",
            sm: "2rem",
            md: "3rem",
          },
        }}
        rowGap={1}
      >
        {region !== undefined && (
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
              Region:{" "}
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
                id="region-label"
              >
                Region
              </InputLabel>
              <Select
                labelId="region-label"
                value={region}
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
                <MenuItem value="3M">Quarterly</MenuItem>
                <MenuItem value="6M">6 Months</MenuItem>
                {/* <MenuItem value="1Y">Yearly</MenuItem> */}
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
                {/* <MenuItem value="1-month">1 Month</MenuItem> */}
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

      {openModal.open && (
        <AlertModal
          isOpen={openModal.open}
          message={openModal.message}
          closeModalHandler={closeModalHandler}
        />
      )}
    </>
  );
};
