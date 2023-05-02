import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  Typography,
  useTheme,
} from "@mui/material";
import { useState } from "react";
import { tokens } from "@/theme/colorTokens";

export const AlertModal = ({ isOpen, closeModalHandler, message }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [open, setOpen] = useState(isOpen);

  const handleClose = () => {
    setOpen(false);
    closeModalHandler();
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      scroll="paper"
      disablePortal
      sx={{
        "& .MuiDialog-paper": {
          backgroundColor: `${colors.primary[400]}`,
          backgroundImage: "none",
        },
      }}
    >
      <DialogContent px={2}>
        <Typography
          sx={{
            marginBottom: "1rem",
            typography: {
              xs: "h4",
              sm: "h3",
            },
          }}
        >
          Alert!
        </Typography>
        <Typography
          sx={{
            typography: {
              xs: "h6",
              sm: "h5",
            },
          }}
        >
          {message}
        </Typography>
      </DialogContent>
      <DialogActions
        sx={{
          marginBottom: ".7rem",
        }}
      >
        <Button
          color="secondary"
          sx={{
            backgroundColor: `${theme.palette.secondary.main}`,
            color: `${theme.palette.secondary.contrastText}`,
            marginRight: "0.7rem",
            "&:hover": {
              backgroundColor: `${theme.palette.secondary.main}`,
            },
          }}
          variant="filled"
          onClick={handleClose}
        >
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};
