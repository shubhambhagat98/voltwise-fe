import { Box, Divider, Typography, useTheme } from "@mui/material";
import { useEffect } from "react";
import "aos/dist/aos.css";
import AOS from "aos";

export const AboutInfo = () => {
  const theme = useTheme();

  useEffect(() => {
    AOS.init({
      once: true,
    });
    AOS.refresh();
  }, []);
  return (
    <div data-aos="fade-up" data-aos-duration="900" data-aos-delay="650">
      <Box
        sx={{
          marginTop: {
            xs: "6rem",
            sm: "8rem",
            md: "9rem",
          },
          alignItems: "center",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Typography
          variant="h2"
          sx={{
            alignSelf: "center",
            display: "inline-block",
          }}
        >
          About VoltWise
          <Divider
            width="100%"
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
          providers to optimize energy production and distribution, reduce
          waste, and improve overall efficiency. Stay ahead of the curve with
          our automated, data-driven insights, enabling you to make informed
          decisions in the ever-changing energy landscape.
        </Typography>

        <Typography
          variant="h5"
          sx={{
            marginTop: "2rem",
          }}
        >
          Our platform is designed with user experience in mind, providing an
          interactive and visually engaging front end built with Next.js and
          deployed on Vercel. Explore various data visualizations, such as
          graphs, charts, and tables, to gain deeper insights into historical
          and forecasted energy demand patterns. With seamless integration of
          backend services like Amazon S3, ECS, EMR, EventBridge and AWS Lambda,
          our platform offers a comprehensive and reliable solution for all your
          energy demand forecasting needs.
        </Typography>
      </Box>
    </div>
  );
};
