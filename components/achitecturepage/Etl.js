import { Box, Divider, Grid, Typography, useTheme } from "@mui/material";
import Image from "next/image";
import etl_light from "/public/images/architecture/etl_light.png";
import etl_dark from "/public/images/architecture/etl_dark.png";
import { useEffect } from "react";
import "aos/dist/aos.css";
import AOS from "aos";

export const Etl = () => {
  const theme = useTheme();

  const image = theme.palette.mode === "dark" ? etl_dark : etl_light;

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
          marginTop: "4rem",
          textAlign: "center",
          //   border: "1px solid red",
        }}
      >
        <Typography
          variant="h2"
          sx={{
            display: "inline-block",
            marginBottom: {
              sm: "2.5rem",
            },
            fontSize: {
              xs: "1.2rem",
              sm: "2rem",
            },
          }}
        >
          Data Ingestion and Updation
          <Divider
            width="100%"
            sx={{
              alignSelf: "center",

              backgroundColor: theme.palette.secondary.main,
            }}
          />
        </Typography>
      </div>

      <Grid container spacing={2}>
        <Grid item xs={12} lg={5}>
          <div data-aos="zoom-in" data-aos-duration="700" data-aos-delay="300">
            <Box
              sx={{
                position: "relative",
                width: "100%",
                minHeight: {
                  xs: "200px",
                  sm: "250px",
                  md: "300px",
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
              (max-width: 1200px) 50vw,
              33vw"
              />
            </Box>
          </div>
        </Grid>
        <Grid item xs={12} lg={7}>
          <div data-aos="fade-up" data-aos-duration="700" data-aos-delay="450">
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
              We have successfully implemented and deployed our Data Extraction
              logic, which involves segmenting historical data by region and
              storing it in separate parquet files. Our process begins by
              running a Python script that retrieves data from the EIA API for
              the last four days, with the fourth day being the previous day
              when the script is executed.
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
              To ensure data completeness, if any data is missing for the
              previous day, we fill in the gaps by using the median of the
              available data for that day. For the remaining three days, where
              updated values are likely to be present, we update the historical
              data with the latest information for matching dates and append new
              data for the previous day (non-matching date).
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
              Once the historical data is updated, we store the region-wise
              parquet files in our designated S3 bucket. This entire process is
              automated on AWS using a lambda function called "daily-ingestion,"
              which is triggered by Amazon EventBridge every day at 6:00 am EDT.
            </Typography>
          </div>
        </Grid>
      </Grid>
    </>
  );
};
