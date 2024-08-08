import { Grid, Box } from "@mui/material";
import Sidebar from "../components/Sidebar";
import Statistics from "../components/Statistics";
import BookStatus from "../components/BookStatus";
import EarningSummary from "../components/EarningSummary";
import DashboardHeader from "../components/DashboardHeader";

export default function Dashboard() {
  return (
    <>
      <DashboardHeader role="Owner" />
      <Box sx={{ display: "flex" }}>
        <Sidebar />
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Statistics />
            </Grid>
            <Grid item xs={12} md={6}>
              <BookStatus />
            </Grid>
            <Grid item xs={12}>
              <EarningSummary />
            </Grid>
          </Grid>
        </Box>
      </Box>
    </>
  );
}
