import { Alert, Box, Button, Typography, useTheme } from "@mui/material";
import { tokens } from "@/theme/colorTokens";

const ErrorBox = ({ error, refetch }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return (
    <Box
      sx={{
        mt: 20,
        display: "flex",
        flexDirection: "column",
        //only occupy width according to content
        width: "fit-content",
        // center horizontally
        mx: "auto",
      }}
      backgroundColor={
        theme.palette.mode === "dark"
          ? colors.primary[500]
          : colors.primary[400]
      }
      borderRadius="10px"
      //   my={2}
      p={3}
      boxShadow={theme.shadows[10]}
    >
      <Alert
        sx={{
          backgroundColor: colors.redAccent[800] + "85",
          mb: 3,
          alignItems: "center",
        }}
        severity="error"
      >
        Error occurred while fetching data.
      </Alert>
      <Typography
        sx={{
          mb: 3,
        }}
      >
        Error message: {error.message}
      </Typography>
      <Button
        sx={{
          background: theme.palette.secondary.main,
          color: "inherit",
          width: "fit-content",
          alignSelf: "center",
          "&:hover": {
            background: theme.palette.secondary.dark,
          },
        }}
        onClick={() => refetch()}
      >
        Retry
      </Button>
    </Box>
  );
};

export default ErrorBox;
