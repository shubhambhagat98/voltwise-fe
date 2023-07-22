import * as React from "react";
import {
  useTheme,
  AppBar,
  Box,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  ListItemIcon,
  Toolbar,
  Typography,
  Button,
  Container,
  Icon,
} from "@mui/material";
import { useColorStore } from "@/store/colorStore";
import {
  DarkModeOutlined,
  LightModeOutlined,
  Menu,
  ElectricBolt,
} from "@mui/icons-material";

import { PublicLinks } from "./PublicLinks";
import NextLink from "next/link";
import { useRouter } from "next/router";
import { tokens } from "@/theme/colorTokens";

import { useState } from "react";

const drawerWidth = 240;

export const MyAppBar = (props) => {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = useState(false);
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const toggleColorMode = useColorStore((state) => state.toggleColorMode);
  const router = useRouter();

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const drawer = (
    <Box
      onClick={handleDrawerToggle}
      sx={{
        textAlign: "center",

        "& .MuiListItemButton-root.Mui-selected": {
          color: `#fcfcfc !important`,
          backgroundColor: `${colors.blueAccent[500]} !important`,
          borderRadius: "10px",
        },

        "& .MuiListItemButton-root:hover": {
          backgroundColor: `${
            theme.palette.mode === "dark"
              ? colors.primary[400]
              : colors.blueAccent[800]
          } !important`,
          borderRadius: "10px",
        },
      }}
    >
      <Typography variant="h3" sx={{ my: 2 }}>
        VoltWise
      </Typography>
      <Divider />
      <List>
        {PublicLinks.map((item) => (
          <ListItem key={item.title}>
            <ListItemButton
              selected={router.pathname === item.to}
              component={NextLink}
              href={item.to}
            >
              <ListItemIcon sx={{ minWidth: 0, mr: 2, color: "inherit" }}>
                {item.icon}
              </ListItemIcon>
              <ListItemText
                primary={item.title}
                primaryTypographyProps={{
                  typography: "h5",
                  fontWeight: 500,
                }}
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Box
    // sx={{
    //   display: "flex",
    // }}
    >
      <AppBar
        component="nav"
        color="inherit"
        style={{
          background: `${theme.palette.background.paper}`,
          boxShadow: `${
            theme.palette.mode === "dark"
              ? theme.shadows[12]
              : theme.shadows[10]
          }`,
        }}
      >
        <Container maxWidth="xl">
          <Toolbar
            sx={{
              justifyContent: "space-between",

              paddingLeft: "0 !important",
              paddingRight: "0 !important",
            }}
          >
            <Box display="flex" flexDirection="row" alignContent="center">
              <IconButton
                color="inherit"
                aria-label="open drawer"
                edge="start"
                onClick={handleDrawerToggle}
                sx={{ mr: 1, display: { sm: "none" } }}
              >
                <Menu />
              </IconButton>
              <Icon
                sx={{
                  // color: `${colors.blueAccent[500]}`,
                  marginRight: "0.5rem",
                  marginBottom: "0.2rem",
                  alignSelf: "center",
                }}
              >
                <ElectricBolt />
              </Icon>
              <Typography
                // variant={{ xs: "h1", sm: "h3" }}

                sx={{
                  typography: { sm: "h4", xs: "h5" },
                  alignSelf: "center",
                  fontWeight: "500 !important",

                  // flexShrink: 0,
                }}
              >
                VoltWise
              </Typography>
            </Box>
            <Box
              display="flex"
              sx={{
                alignItems: "center",
              }}
            >
              <Box
                sx={{
                  display: { xs: "none", sm: "flex" },
                  "& .selected": {
                    color: `${colors.blueAccent[500]} !important`,
                  },
                }}
              >
                {PublicLinks.map((item) => (
                  <Button
                    key={item.title}
                    // color={theme.palette.neutral.light}
                    component={NextLink}
                    href={item.to}
                    className={router.pathname === item.to ? "selected" : ""}
                    sx={{
                      color: theme.palette.neutral.light,
                      mr: 2,
                      "&:hover": {
                        backgroundColor: `${
                          theme.palette.mode === "dark"
                            ? colors.primary[400]
                            : colors.blueAccent[800]
                        } !important`,
                      },
                      borderRadius: "10px",
                      fontSize: ".9rem",
                      textTransform: "none",
                    }}
                  >
                    {item.title}
                  </Button>
                ))}
              </Box>

              <IconButton onClick={toggleColorMode}>
                {theme.palette.mode === "dark" ? (
                  <LightModeOutlined />
                ) : (
                  <DarkModeOutlined />
                )}
              </IconButton>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
      <Box component="nav">
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
              backgroundImage: "none !important",
            },
          }}
        >
          {drawer}
        </Drawer>
      </Box>

      <Toolbar />
    </Box>
  );
};
