import { useTheme, Box, Typography } from "@mui/material";
import { tokens } from "@/theme/colorTokens";

export const Metrics = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <Box
      sx={{
        backgroundColor:
          theme.palette.mode === "dark"
            ? colors.primary[500]
            : colors.primary[400],
      }}
      borderRadius="10px"
      //   my={2}
      p={2}
      boxShadow={theme.shadows[10]}
      width="100%"
      height="100%"
    >
      <Typography
        variant="h5"
        sx={{
          mb: {
            xs: 1,
          },
        }}
      >
        Some Metrics
      </Typography>
    </Box>
  );
};
