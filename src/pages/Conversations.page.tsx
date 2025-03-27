
//general app
import NoChat from "@assets/animations/NoChat";
import ChatsList from "@components/conversation/ChatList";
import Conversation from "@components/conversation/Conversation";
import LoadingScreen from "@components/LoadingScreen";
import { Box, Stack, Typography, useMediaQuery, useTheme } from "@mui/material"
import { GetConversations } from "@redux/actions/chat.actions";
import { GetOnlineFriends } from "@redux/actions/userActions";
import { RootState } from "@redux/store";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
function Conversations() {

    const theme = useTheme()

    const { activeConversation, isLoading } = useSelector((state: RootState) => state.chat);

    const isSmallScreen = useMediaQuery((theme) => theme.breakpoints.down("md"));
    const dispatch = useDispatch()

    useEffect(() => {
        // if (user.token) {
        // get all conversations
        dispatch(GetConversations());

        // get online friends
          dispatch(GetOnlineFriends());
        // }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <Stack
            direction={"row"}
            sx={{
                width: "100%",
                height: {
                    xs: activeConversation ? "100vh" : "calc(100vh - 65px)",
                    md: "100vh",
                },
            }}
        >
            <Box
                sx={{
                    display: {
                        xs: activeConversation ? "none" : "block",
                        md: "block",
                    },
                    position: "relative",
                    height: "100%",
                    width: { xs: "100%", md: 320 },
                    backgroundColor: theme.palette.background.default,
                    boxShadow: "0px 0px 2px #00000040",
                    overflow: "hidden",
                }}
            >
                {isLoading && isSmallScreen ? <LoadingScreen fromChat={false} /> : <ChatsList />}
            </Box>

            <Box
                sx={{
                    display: {
                        xs: activeConversation ? "block" : "none",
                        md: "block",
                    },
                    height: "100%",
                    width: { xs: "100%", md: "calc(100vw - 400px)" },
                    transition: "width 0.1s ease-in-out",
                    backgroundColor: theme.palette.background.paper,
                }}
            >
                {isLoading ? (
                    <LoadingScreen fromChat={true} />
                ) : activeConversation ? (
                    <Conversation />
                ) : (
                    // No Chat
                    <Stack
                        sx={{ height: "100%", width: "100%" }}
                        alignItems={"center"}
                        justifyContent={"center"}
                    >
                        <NoChat />
                        <Typography variant="subtitle2" sx={{ mt: { xs: -5, md: -10 } }}>
                            Select or Start a new Conversation
                        </Typography>
                    </Stack>
                )}
            </Box>
        </Stack>
    )
}

export default Conversations