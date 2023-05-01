import { Box, Fade, Slide, Typography, useTheme } from "@mui/material";
import { tokens } from "@/theme/colorTokens";

export const HeroInfo = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return (
    <Slide in direction="right" timeout={600}>
      <Box
        sx={{
          paddingLeft: {
            xs: "0",
            sm: "1.5rem",
            md: "3rem",
          },
          // border: "1px solid green",
          textAlign: {
            xs: "center",
            sm: "left",
          },
          marginTop: {
            xs: "1rem",
          },
        }}
      >
        <Typography
          sx={{
            color: `${colors.blueAccent[500]} `,
            fontSize: {
              xs: "2.5rem",
              sm: "3rem",
              md: "3.5rem",
            },
            fontWeight: "bold",
            marginBottom: { xs: "0.5rem", sm: "0.7rem" },
          }}
        >
          VoltWise
        </Typography>
        <Typography
          sx={{
            marginBottom: { xs: "1rem", sm: "2.5rem" },
            typography: { sm: "h3", xs: "h4", md: "h2" },
          }}
        >
          US Energy Demand and Generation Forecasting Solution
        </Typography>
        <Typography
          variant="h6"
          sx={{
            fontWeight: "400 !important",
          }}
        >
          VoltWise is a cloud-based web application that forecasts the energy
          demand and net generation for different regions within the United
          States
        </Typography>
      </Box>
    </Slide>
  );
};
