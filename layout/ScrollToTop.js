import { KeyboardArrowUp } from "@mui/icons-material";
import { Button, useTheme } from "@mui/material";
import { useEffect, useState } from "react";

const customStyles = (theme) => ({
  scrollUp: {
    position: "fixed !important",
    right: "1rem !important",
    bottom: "-10% !important",
    backgroundColor: `${theme.palette.secondary.main} !important`,
    padding: "10px !important",
    borderRadius: "50% !important",
    zIndex: "9999 !important",
    transition: ".4s !important",
    display: "flex !important",
    alignItems: "center !important",
    cursor: "pointer !important",
    minWidth: "0 !important",
    transition: " .4s !important",
    color: "#FAFAFB",
  },

  showScroll: {
    bottom: "10% !important",
  },
});

export const ScrollToTop = () => {
  const [showScrollToTop, setShowScrollToTop] = useState(false);
  const theme = useTheme();
  const styles = customStyles(theme);
  useEffect(() => {
    window.addEventListener("scroll", showScrollToTopHandler);

    //cleanup function
    return () => {
      window.removeEventListener("scroll", showScrollToTopHandler);
    };
  }, [showScrollToTop]);

  const showScrollToTopHandler = () => {
    if (window.pageYOffset > 300) {
      setShowScrollToTop(true);
    } else {
      setShowScrollToTop(false);
    }
  };

  const scrollToTopHandler = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <Button
      onClick={scrollToTopHandler}
      sx={{
        ...styles.scrollUp,
        ...(showScrollToTop && styles.showScroll),
      }}
    >
      <KeyboardArrowUp />
    </Button>
  );
};
