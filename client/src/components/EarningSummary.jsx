import React from "react";
import { Card, CardContent, Typography, Box } from "@mui/material";

const EarningSummary = () => {
  return (
    <Card>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Earning Summary
        </Typography>
        <Box sx={{ height: 200 }}>
          {/* Insert a line chart here */}
          <Typography variant="body2" color="textSecondary">
            Line Chart
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};

export default EarningSummary;
