import { Stack, Box, useTheme, Typography, Avatar } from "@mui/material";
import BeatLoader from "react-spinners/BeatLoader";


const MessageContainer = ({
    message,
    me,
    isStartOfSequence,
    isEndOfSequence,
    msgType,
    isLastMessage,
    isTyping,
}) => {
    const theme = useTheme();

    let borderRadiusStyle;

    if (isStartOfSequence && isEndOfSequence) {
        borderRadiusStyle = "20px";
    } else if (me && isStartOfSequence) {
        borderRadiusStyle = "20px 20px 5px 20px";
    } else if (me && isEndOfSequence) {
        borderRadiusStyle = "20px 5px 20px 20px";
    } else if (me) {
        borderRadiusStyle = "20px 5px 5px 20px";
    } else if (!me && isStartOfSequence) {
        borderRadiusStyle = "20px 20px 20px 5px";
    } else if (!me && isEndOfSequence) {
        borderRadiusStyle = "5px 20px 20px 20px";
    } else {
        borderRadiusStyle = "5px 20px 20px 5px";
    }

    const commonPadding = msgType === "text" ? 1.5 : "3px 0px";

    return (
        <Stack
            direction="row"
            justifyContent={me ? "flex-end" : "flex-start"}
            alignItems="center"
            sx={{ position: "relative" }}
        >
            {!me && isEndOfSequence && !isTyping && (
                <Box
                    sx={{
                        position: "absolute",
                        top: msgType === "text" ? 10 : 18,
                        left: -25,
                    }}
                >
                    <Avatar sx={{ width: 24, height: 24 }} />
                </Box>
            )}
            <Box
                p={commonPadding}
                sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    width: "max-content",
                    minWidth: 40,
                    maxWidth: { xs: "12em", md: "30em" },
                    minHeight: 40,
                    backgroundColor:
                        msgType === "text"
                            ? me
                                ? theme.palette.primary.main
                                : theme.palette.primary.light
                            : msgType === "emoji"
                                ? ""
                                : theme.palette.background.default,
                    borderRadius: borderRadiusStyle,
                }}
            >
                {msgType === "typing" && isTyping ? (
                    <BeatLoader
                        size={5}
                        height={0.5}
                        width={1}
                        color={theme.palette.primary.main}
                        speedMultiplier={0.5}
                        margin={2}
                    />
                ) : (
                    <Typography
                        variant={msgType === "text" ? "body2" : "h3"}
                        color={me ? "#fff" : theme.palette.text}
                        sx={{ whiteSpace: "preserve", wordBreak: "break-word" }}
                    >
                        {message.message}
                    </Typography>
                )}
            </Box>
            {me && isLastMessage && (
                <Box
                    sx={{
                        position: "absolute",
                        top: 25,
                        right: -16,
                    }}
                >

                    <Avatar sx={{ width: 24, height: 24 }} />
                </Box>
            )}
        </Stack>
    );
};

export default MessageContainer;
