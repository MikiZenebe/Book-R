import { AppBar, Toolbar, Typography } from "@mui/material";

export default function DashboardHeader({ role }) {
  return (
    <AppBar
      position="static"
      sx={{
        backgroundColor: "white",
        color: "black",
        boxShadow: "none",
        borderBottom: "1px solid #e0e0e0",
        padding: "0 240px",
        margin: "0 auto",
      }}
    >
      <Toolbar>
        <Typography
          variant="h6"
          component="div"
          sx={{ flexGrow: 1, color: "black" }}
        >
          {role} /Dashboard
        </Typography>
      </Toolbar>
    </AppBar>
  );
}
