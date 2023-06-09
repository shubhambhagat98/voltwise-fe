import { Box, Container } from "@mui/material";
import Head from "next/head";

import { Options } from "@/components/comparepage/Options";
import { Graphs } from "@/components/comparepage/Graphs";

const compare = () => {
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

export default compare;
