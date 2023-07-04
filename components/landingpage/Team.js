import TeamData from "./TeamInfoData.json";
import {
  Box,
  Container,
  Divider,
  Grid,
  Typography,
  useTheme,
} from "@mui/material";
import { TeamMemberImage } from "./TeamMemberImage";
import { TeamMemberInfo } from "./TeamMemberInfo";

export const Team = () => {
  const theme = useTheme();
  return (
    <Box
      sx={{
        marginTop: "5rem",
        marginBottom: "3rem",
      }}
    >
      <Typography
        variant="h2"
        sx={{
          textAlign: "center",
          marginY: { xs: "1rem", sm: "3.5rem" },
          justifyContent: "center",
          display: "flex",
          flexDirection: "column",
          marginBottom: "5rem !important",
        }}
      >
        Meet the team
        <Divider
          width="20%"
          sx={{
            alignSelf: "center",

            backgroundColor: theme.palette.secondary.main,
          }}
        />
      </Typography>
      {TeamData.map((teamMember, idx) =>
        idx % 2 === 0 ? (
          <Grid
            key={idx}
            container
            direction={{
              xs: "column",
              sm: "row",
            }}
            mt={{ xs: "1rem", sm: "3rem" }}
          >
            <Grid
              item
              xs={12}
              sm={5}
              md={4}
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                // border: "1px solid red",
                paddingLeft: {
                  xs: "0",
                  md: "4rem",
                },
              }}
            >
              <TeamMemberImage image={teamMember.image} />
            </Grid>
            <Grid
              item
              xs={12}
              sm={7}
              md={8}
              sx={{
                display: "flex",
                justifyContent: {
                  xs: "center",
                  sm: "flex-start",
                },
                alignItems: "center",
                textAlign: {
                  xs: "center",
                  sm: "left",
                },
                mb: {
                  xs: "2rem",
                },
                // border: "1px solid red",
              }}
            >
              <TeamMemberInfo
                name={teamMember.name}
                designation={teamMember.designation}
              />
            </Grid>
          </Grid>
        ) : (
          <Grid
            key={idx}
            container
            direction={{
              xs: "column-reverse",
              sm: "row",
            }}
            mt={{ xs: "1rem", sm: "3rem" }}
          >
            <Grid
              item
              xs={12}
              sm={7}
              md={8}
              sx={{
                display: "flex",
                justifyContent: {
                  xs: "center",
                  sm: "flex-end",
                },
                alignItems: "center",
                // border: "1px solid red",
                textAlign: {
                  xs: "center",
                  sm: "right",
                },
                mb: {
                  xs: "2rem",
                },
              }}
            >
              <TeamMemberInfo
                name={teamMember.name}
                designation={teamMember.designation}
              />
            </Grid>
            <Grid
              item
              xs={12}
              sm={5}
              md={4}
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                // border: "1px solid red",
                paddingRight: {
                  xs: "0",
                  md: "4rem",
                },
              }}
            >
              <TeamMemberImage image={teamMember.image} />
            </Grid>
          </Grid>
        )
      )}
    </Box>
  );
};
