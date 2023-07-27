import { Box, Divider, Grid, Typography, useTheme } from "@mui/material";
import Image from "next/image";
import frontend_api_light from "/public/images/architecture/frontend_api_light.png";
import frontend_api_dark from "/public/images/architecture/frontend_api_dark.png";
import { useEffect } from "react";
import "aos/dist/aos.css";
import AOS from "aos";

export const FrontendIntegration = () => {
  const theme = useTheme();

  const image =
    theme.palette.mode === "dark" ? frontend_api_dark : frontend_api_light;

  useEffect(() => {
    AOS.init({
      once: true,
    });
    AOS.refresh();
  }, []);

  return (
    <>
      <div
        data-aos="zoom-in"
        data-aos-duration="700"
        style={{
          marginTop: "6rem",
          textAlign: "center",
          //   border: "1px solid red",
        }}
      >
        <Typography
          variant="h2"
          sx={{
            display: "inline-block",
            marginBottom: {
              sm: "0.5rem",
              md: "2.5rem",
            },
            fontSize: {
              xs: "1.2rem",
              sm: "2rem",
            },
          }}
        >
          Frontend Integration
          <Divider
            width="100%"
            sx={{
              alignSelf: "center",

              backgroundColor: theme.palette.secondary.main,
            }}
          />
        </Typography>
      </div>

      <Grid
        container
        spacing={2}
        sx={{
          marginBottom: "4rem",
        }}
      >
        <Grid item xs={12} lg={5}>
          <div data-aos="zoom-in" data-aos-duration="700" data-aos-delay="100">
            <Box
              sx={{
                position: "relative",
                width: "100%",
                minHeight: {
                  xs: "150px",
                  sm: "250px",
                  md: "350px",
                },
              }}
            >
              <Image
                style={{
                  objectFit: "contain",
                  filter: `drop-shadow(0px 2px 2px rgba(0, 0, 0, 0.2))`,
                }}
                fill
                src={image}
                alt="etl"
                sizes="(max-width: 768px) 100vw,
              50vw"
              />
            </Box>
          </div>
        </Grid>
        <Grid item xs={12} lg={7}>
          <div data-aos="fade-up" data-aos-duration="700" data-aos-delay="150">
            <Typography
              sx={{
                fontSize: {
                  xs: "0.86rem",
                  sm: "1rem",
                },
                paddingX: {
                  lg: "1rem",
                },
              }}
            >
              We utilize a combination of technologies for our frontend
              development. Next.js serves as our frontend framework,
              ApexCharts.js handles interactive data visualization components,
              and Material UI is used for CSS styling.
            </Typography>

            <Typography
              sx={{
                marginTop: "1rem",
                fontSize: {
                  xs: "0.86rem",
                  sm: "1rem",
                },
                paddingX: {
                  lg: "1rem",
                },
              }}
            >
              To communicate with our backend, the frontend makes API calls to
              our AWS API Gateway endpoint. These calls are in the form of HTTP
              GET requests, accompanied by query parameters. For forecasting
              purposes, additional parameters such as region, model, frequency,
              and time are also included.
            </Typography>

            <Typography
              sx={{
                marginTop: "1rem",
                fontSize: {
                  xs: "0.86rem",
                  sm: "1rem",
                },
                paddingX: {
                  lg: "1rem",
                },
              }}
            >
              Upon receiving the request, the API Gateway routes it to the
              associated Lambda function. The query parameters are proxied to
              the Lambda function, which fetches the relevant data from the S3
              buckets. The Lambda function performs aggregation and filtering
              based on parameters like region, frequency, time, and model.
            </Typography>

            <Typography
              sx={{
                marginTop: "1rem",
                fontSize: {
                  xs: "0.86rem",
                  sm: "1rem",
                },
                paddingX: {
                  lg: "1rem",
                },
              }}
            >
              The retrieved data is then visualized using ApexCharts.js, which
              provides chart components with interactive functionalities such as
              zooming, panning, and data resetting. To optimize performance, we
              incorporated ReactQuery to cache API responses for 5 minutes,
              reducing unnecessary API calls when data remains unchanged. The
              frontend of the project is deployed on Vercel, a cloud platform.
            </Typography>
          </div>
        </Grid>
      </Grid>
    </>
  );
};
