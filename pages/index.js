import { Box, Container, Grid } from "@mui/material";
import { HeroInfo } from "@/components/landingpage/HeroInfo";
import Head from "next/head";

import { HeroImage } from "@/components/landingpage/HeroImage";
import { AboutInfo } from "@/components/landingpage/AboutInfo";

import { Team } from "@/components/landingpage/Team";

export default function Home() {
  return (
    <>
      <Head>
        <title>VoltWise</title>

        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Container maxWidth="xl">
        <Box
          sx={{
            mt: {
              xs: "1rem",
              sm: "2rem",
              md: "4rem",
            },
          }}
        >
          <Grid
            container
            direction={{
              xs: "column-reverse",
              sm: "row",
            }}
          >
            <Grid
              item
              xs={12}
              sm={6}
              sx={{
                // border: "1px solid red",
                display: "flex",
                alignItems: "center !important",
                justifyContent: "center",
              }}
            >
              <HeroInfo />
            </Grid>
            <Grid
              item
              xs={12}
              sm={6}
              // sx={{
              //   border: "1px solid blue",
              // }}
            >
              <HeroImage />
            </Grid>
          </Grid>
          <Container maxWidth="lg">
            <AboutInfo />
          </Container>
        </Box>
        <Container maxWidth="lg">
          <Team />
        </Container>
      </Container>
    </>
  );
}
