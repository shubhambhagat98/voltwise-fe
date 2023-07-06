import { Box, Divider, Grid, Typography, useTheme } from "@mui/material";
import Image from "next/image";
import train_predict_light from "/public/images/architecture/train_predict_light.png";
import train_predict_dark from "/public/images/architecture/train_predict_dark.png";
import { useEffect } from "react";
import "aos/dist/aos.css";
import AOS from "aos";

export const RetrainAndPredict = () => {
  const theme = useTheme();

  const image =
    theme.palette.mode === "dark" ? train_predict_dark : train_predict_light;

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
              sm: "2.5rem",
            },
            fontSize: {
              xs: "1.2rem",
              sm: "2rem",
            },
          }}
        >
          Model Retraining & Prediction
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
        direction={{
          xs: "column-reverse",
          lg: "row",
        }}
      >
        <Grid item xs={12} lg={5}>
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
              Our automated ML modeling process consists of two main tasks:
              model retraining and generating predictions. This process runs
              weekly when new data for the entire week becomes available
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
              To achieve this, we utilize AWS Step Functions as our
              orchestration tool. Using Step Functions, we create a simple
              workflow. The workflow begins with the retraining task, which
              involves running a Docker container in an ECS cluster. This
              container retrieves updated data from S3, performs model
              retraining, and stores the updated model files in S3 as pickle
              files.
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
              Once the model is trained on the new data, the next step is to
              generate a 1-year forecast. Step Functions triggers another task
              in ECS to run a Docker container in the ECS cluster. This
              container generates the new predictions and saves them in the
              designated S3 bucket.
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
              The entire workflow is scheduled to run automatically every week
              using Amazon EventBridge.
            </Typography>
          </div>
        </Grid>

        <Grid item xs={12} lg={7}>
          <div data-aos="zoom-in" data-aos-duration="700" data-aos-delay="100">
            <Box
              sx={{
                position: "relative",
                width: {
                  xs: "100%",
                  //   lg: "95%",
                },
                minHeight: {
                  xs: "250px",
                  sm: "350px",
                  md: "400px",
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
      </Grid>
    </>
  );
};
