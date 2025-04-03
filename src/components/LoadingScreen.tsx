import { Box, Stack, useTheme } from "@mui/material";
import SchoolIcon from '@mui/icons-material/School';

const LoadingScreen = ({ fromChat }: { fromChat: boolean }) => {
    // using theme
    const theme = useTheme();

    // Check if /auth is present in the URL
    const isAuthRoute = window.location.pathname.includes("/auth");

    let height, width;

    if (isAuthRoute) {
        height = "50vh";
        width = "100%";
    } else if (fromChat) {
        height = "100%";
        width = "100%";
    } else {
        height = "100vh";
        width = "100vw";
    }

    return (
        <Stack
            height={height}
            width={width}
            direction={"row"}
            justifyContent={"center"}
            alignItems={"center"}
        >
            <Stack
                justifyContent={"center"}
                alignItems={"center"}
                position={"relative"}
                direction={"row"}
                sx={{
                    width: "100px",
                    height: "100px",
                    borderRadius: "50%",
                    backgroundColor: theme.palette.background.default,
                    boxShadow: `0px 0px 0px 2px ${theme.palette.primary.light}`,
                    animation:
                        "spin 2.5s cubic-bezier(0.75, 0, 0, 0.75) forwards infinite",
                    "&:before": {
                        content: "''",
                        display: "block",
                        position: "absoulte",
                        top: "5px",
                        right: "5px",
                        bottom: "5px",
                        left: "5px",
                        border: `1px solid ${theme.palette.primary.light}`,
                        borderRadius: "50%",
                    },
                    "&:after": {
                        content: "''",
                        display: "block",
                        position: "absolute",
                        top: "40px",
                        right: "40px",
                        bottom: "40px",
                        left: "40px",
                        backgroundColor: theme.palette.primary.light,
                        borderRadius: "50%",
                        animation: "pulse 2.5s ease-in-out alternate infinite",
                    },
                }}
            >
                <SchoolIcon 
                    sx={{
                        // fontSize: ,
                        display: "inline-block",
                        position: "relative",
                        width: "30px",
                        height: "30px",
                        transform: "rotate(45deg)",
                        animation: "spin 2.5s cubic-bezier(0.75, 0, 0, 0.75) forwards infinite",
                    }}
                />
            </Stack>
        </Stack>
    );
};

export default LoadingScreen;
