import FriendList from "@components/Friends/FriendList";
import FriendsMenu from "@components/Friends/FriendsMenu"
import LoadingScreen from "@components/LoadingScreen"
import { Box, Stack, useMediaQuery, useTheme } from "@mui/material"
import { GetFriends } from "@redux/actions/userActions";
import { RootState } from "@redux/store";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";


const Friends = () => {
    const theme = useTheme();

    const dispatch = useDispatch();

    const { user, showFriendsMenu, isLoading } = useSelector((state: RootState) => state.auth);

      
    useEffect(() => {
        dispatch(GetFriends())
    }, [])


    const isSmallScreen = useMediaQuery((theme) => theme.breakpoints.down("md"));

    return (
        <Stack
            direction={"row"}
            sx={{
                width: "100%",
                height: {
                    xs: "calc(100vh - 65px)",
                    md: "100vh",
                },
            }}>
            {/* Friends area */}
            <Box
                sx={{
                    display: {
                        xs: showFriendsMenu ? "none" : "block",
                        md: "block",
                    },
                    height: "100%",
                    width: { xs: "100%", md: 320 },
                    backgroundColor: theme.palette.background.default,
                    boxShadow: "0px 0px 2px #00000040",
                    overflow: "hidden",
                }}>
                {isLoading && isSmallScreen ? <LoadingScreen fromChat={true} /> : <FriendList />}
            </Box>

            {/* initializing height and width for conversation area */}
            <Box
                sx={{
                    display: {
                        xs: showFriendsMenu ? "block" : "none",
                        md: "block",
                    },
                    height: "100%",
                    width: { xs: "100%", md: "calc(100vw - 400px)" },
                    transition: "width 0.1s ease-in-out",
                    backgroundColor: theme.palette.background.paper,
                    overflow: "hidden",
                }}>
                <FriendsMenu />
            </Box>
        </Stack>
    )
}

export default Friends