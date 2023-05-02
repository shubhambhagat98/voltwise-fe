import React, { useState } from "react";
import {
  Accordion,
  AccordionDetails,
  Box,
  Stack,
  Typography,
  useTheme,
  AccordionSummary,
  Grid,
} from "@mui/material";

import { tokens } from "@/theme/colorTokens";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import FaqData from "./FaqData.json";

export const Faqs = () => {
  const theme = useTheme();

  const colors = tokens(theme.palette.mode);

  const [expanded, setExpanded] = useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <Box
      sx={{
        mt: 1.5,

        // height: "100%",
        // width: "100%",
        // display: "flex",
        // flexDirection: "column",
        // justifyContent: "center",
        // alignItems: "center",
        // border: "1px solid red",
        // alignSelf: "center",
      }}
    >
      <Box
        backgroundColor={colors.primary[400]}
        borderRadius="10px"
        // height={300}
        // p={2}
        // boxShadow={theme.shadows[10]}
        sx={{
          marginY: 5,

          "& .MuiPaper-root": {
            backgroundColor: "transparent !important",
            backgroundImage: "none !important",
            boxShadow: "none !important",
            // margin: "0 !important",
            "&:before": {
              backgroundColor: "transparent !important",
            },
            "&:not(:last-child)": {
              borderBottom: `1px solid ${colors.primary[500]}`,
            },
          },
          "& .MuiAccordian-root": {
            backgroundColor: "transparent !important",
            backgroundImage: "none !important",
            boxShadow: "none !important",
          },
        }}
      >
        {FaqData.map((faq, idx) => (
          <Accordion
            key={idx}
            expanded={expanded === `panel${idx + 1}`}
            onChange={handleChange(`panel${idx + 1}`)}
            sx={{
              paddingY: "1rem",
            }}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id={`panel${idx + 1}a-header`}
              sx={{
                "& .MuiAccordionSummary-expandIconWrapper": {
                  color:
                    theme.palette.mode === "dark"
                      ? theme.palette.neutral.main
                      : theme.palette.neutral.dark,
                },
              }}
            >
              <Typography
                color={theme.palette.secondary.main}
                variant="h4"
                sx={{ fontWeight: 500 }}
              >
                {faq.question}
              </Typography>
            </AccordionSummary>

            <AccordionDetails>
              <Typography variant="h5" sx={{ fontWeight: 400 }}>
                {faq.answer}
              </Typography>
            </AccordionDetails>
          </Accordion>
        ))}
      </Box>
    </Box>
  );
};
