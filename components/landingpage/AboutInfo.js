import { Box, Divider, Typography, useTheme } from "@mui/material";

export const AboutInfo = () => {
  const theme = useTheme();
  return (
    <Box
      sx={{
        marginTop: {
          xs: "5rem",
          sm: "7rem",
          md: "8rem",
        },
      }}
    >
      <Typography
        variant="h2"
        sx={{
          textAlign: "center",

          justifyContent: "center",
          display: "flex",
          flexDirection: "column",
        }}
      >
        About VoltWise
        <Divider
          width="21%"
          sx={{
            alignSelf: "center",

            backgroundColor: theme.palette.secondary.main,
          }}
        />
      </Typography>
      <Typography
        variant="h5"
        sx={{
          marginTop: "2rem",
        }}
      >
        Welcome to VoltWise, your one-stop solution for visualiziing energy
        electricity demand and net generations predictions across the United
        States. By leveraging cutting-edge AWS services and advanced machine
        learning algorithms, our platform empowers utilities and energy
        providers to optimize energy production and distribution, reduce waste,
        and improve overall efficiency. Stay ahead of the curve with our
        automated, data-driven insights, enabling you to make informed decisions
        in the ever-changing energy landscape.
      </Typography>
      <Typography
        variant="h5"
        sx={{
          marginTop: "2rem",
        }}
      >
        Our platform is designed with user experience in mind, providing an
        interactive and visually engaging front end built with Next.js and
        deployed on Vercel. Explore various data visualizations, such as graphs,
        charts, and tables, to gain deeper insights into historical and
        forecasted energy demand patterns. With seamless integration of backend
        services like Amazon S3, Amazon SageMaker, and AWS Lambda, our platform
        offers a comprehensive and reliable solution for all your energy demand
        forecasting needs.
      </Typography>
    </Box>
  );
};
