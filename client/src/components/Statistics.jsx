import React from "react";
import { Card, CardContent, Typography, Box, Divider } from "@mui/material";

const Statistics = () => {
  return (
    <Card sx={{ marginBottom: 2 }}>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          This Month Statistics
        </Typography>
        <Typography variant="body2" color="textSecondary">
          Tue, 14 Nov, 2024, 11:30 AM
        </Typography>
        <Divider sx={{ marginY: 2 }} />
        <Typography variant="h4" gutterBottom>
          ETB 9460.00{" "}
          <span style={{ color: "red", fontSize: "1rem" }}>↓ 1.5%</span>
        </Typography>
        <Typography variant="body2" color="textSecondary">
          Compared to ETB 8941 last month
        </Typography>
        <Typography variant="body2" color="textSecondary">
          Last Month Income: ETB 25658.00
        </Typography>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: 200,
          }}
        >
          {/* Insert a chart here */}
          <Typography variant="body2" color="textSecondary">
            Pie Chart
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};

export default Statistics;
