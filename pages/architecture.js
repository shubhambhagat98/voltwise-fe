import Head from "next/head";
import { Container } from "@mui/material";
import { Etl } from "@/components/achitecturepage/Etl";
import { RetrainAndPredict } from "@/components/achitecturepage/RetrainAndPredict";
import { FrontendIntegration } from "@/components/achitecturepage/FrontendIntegration";

const architecture = () => {
  return (
    <>
      <Head>
        <title>VoltWise</title>

        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Container maxWidth="xl">
        {/* <Typography
          sx={{
            // typography: { sm: "h2", xs: "h2", md: "h2" },
            textAlign: "center",

            marginTop: "2rem",
          }}
          variant="h1"
        >
          System Architecture
        </Typography> */}
        <Etl />
        <RetrainAndPredict />
        <FrontendIntegration />
      </Container>
    </>
  );
};

export default architecture;
