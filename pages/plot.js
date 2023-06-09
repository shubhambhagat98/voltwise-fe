import { Options } from "@/components/plotpage/Options";
import { Graphs } from "@/components/plotpage/Graphs";
import { Container } from "@mui/material";
import Head from "next/head";

const plot = () => {
  return (
    <>
      <Head>
        <title>VoltWise</title>

        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Container maxWidth="xl">
        <Options />
        <Graphs />
      </Container>
    </>
  );
};

export default plot;
