import React from "react";
import {
    AppBar,
    Toolbar,
    Typography,
    Box,
    IconButton,
    Avatar,
    Badge,
} from "@mui/material";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";

interface DashboardHeaderProps {
    name: string;
    subtitle?: string;
}

const DashboardHeader: React.FC<DashboardHeaderProps> = ({
    name,
    subtitle = "Manage and monitor teacher performance and profiles.",
}) => {
    const initials = name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase();

    return (
        <Box>
            <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
                {/* Left Section */}
                <Box>
                    <Typography variant="h6" fontWeight={600}>
                        Welcome, {name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {subtitle}
                    </Typography>
                </Box>

                {/* Right Section */}
                <Box display="flex" alignItems="center" gap={2} >
                    <IconButton>
                        <Badge color="error" variant="dot">
                            <NotificationsNoneIcon />
                        </Badge>
                    </IconButton>

                    <Box display="flex" alignItems="center" gap={1}>
                        <Avatar
                            sx={{
                                bgcolor: "#2ecc71",
                                width: 36,
                                height: 36,
                                fontSize: 14,
                            }}
                        >
                            {initials}
                        </Avatar>
                        <Typography variant="body2" fontWeight={500}>
                            {name}
                        </Typography>
                    </Box>
                </Box>
            </Toolbar>
        </Box>
    );
};

export default DashboardHeader;
