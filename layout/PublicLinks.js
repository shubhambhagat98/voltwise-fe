import {
  HomeOutlined,
  QueryStatsOutlined,
  CompareOutlined,
  HelpOutlineOutlined,
  DashboardOutlined,
  AnalyticsOutlined,
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
  {
    title: "Analytics",
    to: "/analytics",
    icon: <AnalyticsOutlined />,
  },
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
