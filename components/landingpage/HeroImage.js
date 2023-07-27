import { Box, Grow } from "@mui/material";
import Image from "next/image";

export const HeroImage = () => {
  return (
    <Grow in timeout={700}>
      <Box
        sx={{
          position: "relative",
          width: {
            xs: "100%",
            sm: "95%",
            md: "90%",
          },
          height: "100%",
          minHeight: {
            xs: "200px",
            sm: "300px",
            md: "400px",
          },
          mt: {
            xs: "3rem",
            sm: "0rem",
          },

          // border: "1px solid blue",
        }}
      >
        <Image
          style={{
            objectFit: "contain",
          }}
          src="/images/hero-1.png"
          fill
          alt="hero-1"
          sizes="(max-width: 768px) 100vw,
              50vw"
        />
      </Box>
    </Grow>
  );
};
