import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  Typography,
  Box,
  Button,
} from "@mui/material";
import DashboardIcon from "@mui/icons-material/Dashboard";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import NotificationsIcon from "@mui/icons-material/Notifications";
import SettingsIcon from "@mui/icons-material/Settings";
import LogoutIcon from "@mui/icons-material/Logout";
import PersonIcon from "@mui/icons-material/Person";

export default function Sidebar() {
  return (
    <div>
      <Drawer
        variant="permanent"
        sx={{
          width: 240,
          flexShrink: 0,

          "& .MuiDrawer-paper": {
            width: 240,
            boxSizing: "border-box",
            backgroundColor: "#0a1929",
            color: "white",
            overflow: "hidden",
          },
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            height: "auto",
            backgroundColor: "#0a1929",
            marginTop: 2,
            padding: 2,
            overflow: "hidden",
          }}
        >
          <Typography p={2} variant="h6" noWrap component="div" mb={3}>
            📚 Book Rent
          </Typography>
          <Divider />

          <List
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              gap: 1,
            }}
          >
            <ListItem sx={{ background: "#55a2f5", borderRadius: 2 }}>
              <ListItemIcon sx={{ minWidth: "30px", mr: 0 }}>
                <DashboardIcon sx={{ color: "white", fontSize: "20px" }} />
              </ListItemIcon>
              <ListItemText
                primary="Dashboard"
                sx={{
                  fontSize: "14px",
                  "& .MuiTypography-root": { fontSize: "14px" },
                }}
              />
            </ListItem>

            <ListItem button>
              <ListItemIcon sx={{ minWidth: "30px", mr: 0 }}>
                <UploadFileIcon sx={{ color: "#b4b4ca" }} />
              </ListItemIcon>
              <ListItemText
                primary="Book Upload"
                sx={{
                  fontSize: "14px",
                  color: "#b4b4ca",
                  "& .MuiTypography-root": { fontSize: "14px" },
                }}
              />
            </ListItem>

            <ListItem button>
              <ListItemIcon sx={{ minWidth: "30px", mr: 0 }}>
                <NotificationsIcon sx={{ color: "#b4b4ca" }} />
              </ListItemIcon>
              <ListItemText
                primary="Notification"
                sx={{
                  fontSize: "14px",
                  color: "#b4b4ca",
                  "& .MuiTypography-root": { fontSize: "14px" },
                }}
              />
            </ListItem>
            <ListItem button>
              <ListItemIcon sx={{ minWidth: "30px", mr: 0 }}>
                <SettingsIcon sx={{ color: "#b4b4ca" }} />
              </ListItemIcon>
              <ListItemText
                primary="Setting"
                sx={{
                  fontSize: "14px",
                  color: "#b4b4ca",
                  "& .MuiTypography-root": { fontSize: "14px" },
                }}
              />
            </ListItem>
            <ListItem button>
              <ListItemIcon sx={{ minWidth: "30px", mr: 0 }}>
                <PersonIcon sx={{ color: "#b4b4ca" }} />
              </ListItemIcon>
              <ListItemText
                primary="Login as Admin"
                sx={{
                  fontSize: "14px",
                  color: "#b4b4ca",
                  "& .MuiTypography-root": { fontSize: "14px" },
                }}
              />
            </ListItem>
          </List>

          <Divider />
          <Box sx={{ position: "absolute", bottom: 0, width: "100%" }}>
            <Button
              startIcon={<LogoutIcon />}
              sx={{
                width: "80%",
                justifyContent: "center",

                color: "white",
                backgroundColor: "#243a52",
                padding: "10px",
                margin: "13px",
              }}
            >
              Logout
            </Button>
          </Box>
        </Box>
      </Drawer>
    </div>
  );
}
