import {
  HomeOutlined,
  InfoOutlined,
  QueryStatsOutlined,
  CompareOutlined,
  HelpOutlineOutlined,
  DashboardOutlined,
} from "@mui/icons-material";

export const PublicLinks = [
  {
    title: "Home",
    to: "/",
    icon: <HomeOutlined />,
  },

  {
    title: "Plot",
    to: "/plot",
    icon: <QueryStatsOutlined />,
  },

  {
    title: "Compare",
    to: "/compare",
    icon: <CompareOutlined />,
  },
  // {
  //   title: "About",
  //   to: "/about",
  //   icon: <InfoOutlined />,
  // },
  {
    title: "FAQs",
    to: "/faqs",
    icon: <HelpOutlineOutlined />,
  },
  {
    title: "Architecture",
    to: "/architecture",
    icon: <DashboardOutlined />,
  },
];
