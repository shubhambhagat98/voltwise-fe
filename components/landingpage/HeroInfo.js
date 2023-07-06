import { Box, Typography, useTheme } from "@mui/material";
import { tokens } from "@/theme/colorTokens";
import "aos/dist/aos.css";
import AOS from "aos";
import { useEffect } from "react";

export const HeroInfo = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  useEffect(() => {
    AOS.init({
      once: true,
    });
    AOS.refresh();
  }, []);
  return (
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
          xs: "3rem",
          sm: "2rem",
          md: "1rem",
        },
      }}
    >
      <div data-aos="fade-up" data-aos-duration="700" data-aos-delay="250">
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
      </div>
      <div data-aos="fade-up" data-aos-duration="700" data-aos-delay="350">
        <Typography
          sx={{
            marginBottom: { xs: "1rem", sm: "2.5rem" },
            typography: { sm: "h3", xs: "h4", md: "h2" },
          }}
        >
          US Energy Demand and Generation Forecasting Solution
        </Typography>
      </div>
      <div data-aos="fade-up" data-aos-duration="700" data-aos-delay="450">
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
      </div>
    </Box>
  );
};
