import { Box, Typography, useTheme } from "@mui/material";

export const TeamMemberInfo = ({ name, designation }) => {
  const theme = useTheme();
  return (
    <Box>
      <Typography
        sx={{
          marginY: "1rem",
          fontWeight: "600 !important",
          typography: {
            xs: "h3",
            sm: "h1",
          },
        }}
        color="secondary"
      >
        {name}
      </Typography>
      <Typography variant="h4" color={theme.palette.neutral.light}>
        {designation}
      </Typography>
    </Box>
  );
};
