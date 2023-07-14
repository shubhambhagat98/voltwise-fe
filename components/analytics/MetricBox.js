import { useTheme, Box, Typography, Skeleton } from "@mui/material";
import { tokens } from "@/theme/colorTokens";

export const MetricBox = ({ title, value, isLoading }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return (
    <Box
      sx={{
        py: {
          xs: 1,
          sm: 2,
        },
        display: "flex",
        flexDirection: "column",

        justifyContent: "center",
        rowGap: 1,
      }}
    >
      <Typography
        sx={{
          color: theme.palette.neutral.main,
          fontSize: {
            xs: "1rem",
            md: "1.2rem",
          },
        }}
      >
        {title}
      </Typography>

      {!isLoading ? (
        <Typography
          sx={{
            typography: {
              xs: "h5",
              sm: "h4",
              md: "h5",
              lg: "h4",
            },
            fontWeight: "600 !important",
          }}
        >
          {`${value.toFixed(2)} GW`}
        </Typography>
      ) : (
        <Skeleton
          variant="text"
          width="90%"
          sx={{
            display: "flex",
            fontSize: "1.5rem",
            margin: "0 !important",
          }}
        />
      )}
    </Box>
  );
};
