import { Avatar, Box, Grow } from "@mui/material";
import Image from "next/image";

export const TeamMemberImage = ({ image }) => {
  return (
    <Grow in timeout={700}>
      <Box
        sx={{
          position: "relative",

          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Avatar
          sx={{
            width: "auto",
            height: "auto",
          }}
        >
          <Image
            style={{
              objectFit: "cover",
            }}
            src={image}
            height={200}
            width={200}
            alt={image}
          />
        </Avatar>
      </Box>
    </Grow>
  );
};
