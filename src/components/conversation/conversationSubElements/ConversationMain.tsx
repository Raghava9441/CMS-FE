import { Box, Stack, useTheme } from "@mui/material"
import { RootState } from "@redux/store";
import { scrollToBottom } from "@utils/scrollToBottom";
import { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import MessageContainer from "./MessageContainer";


type Props = {}


function ConversationMain({ }: Props) {
    const theme = useTheme();
    const scrollContainerRef = useRef(null);
    let currentSender = null;


    const { messages, activeConversation, typingConversation } = useSelector((state: RootState) => state.chat);
    const { user } = useSelector((state: RootState) => state.auth);

    const containsOnlyEmojis = (text) => {
        const emojiRegex =
            /[\u{1F600}-\u{1F6FF}\u{1F300}-\u{1F5FF}\u{1F680}-\u{1F6FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}]/u;
        const emojiStatus = [...text].every((char) => emojiRegex.test(char));

        if (emojiStatus) {
            currentSender = null;
        }
        return emojiStatus;
    };

    // Function to determine message type
    const getMessageType = (text) =>
        containsOnlyEmojis(text) ? "emoji" : "text";

    // Function to check if the next message only contains emojis
    const nextMessageOnlyContainsEmojis = (index) =>
        index < messages.length - 1 &&
        containsOnlyEmojis(messages[index + 1].message);


    const setTyping = () => {
        const typingObject = typingConversation?.find((obj) => obj.conversation_id === activeConversation?._id);
        return typingObject ? typingObject.typing : false;
    };

    // ------------------------------------------

    const isTyping = setTyping();
    useEffect(() => {
        // Auto-scroll to the bottom with an animation when the component mounts
        if (scrollContainerRef.current) {
            scrollToBottom(scrollContainerRef);
        }
    }, [messages, isTyping]);

    return (
        <Box
            width="100%"
            pl={4}
            pr={2.2}
            py={1}
            sx={{
                height: "100%", // Subtract padding
                flexGrow: 1,
                overflowY: "auto", // Only show scroll when needed
                backgroundColor: theme.palette.background.paper,
                scrollBehavior: "smooth",
            }}
            className="scrollbar"
            ref={scrollContainerRef}
        >
            <Stack spacing={0.5}>
                {messages?.map((e, index) => {
                    const isStartOfSequence = currentSender === null || e.sender._id !== currentSender;

                    const isEndOfSequence = index === messages.length - 1 || e.sender._id !== messages[index + 1].sender._id || containsOnlyEmojis(e.message) || nextMessageOnlyContainsEmojis(index);

                    currentSender = e.sender._id;

                    const isLastMessage = messages[messages.length - 1] === e;

                    return (
                        <MessageContainer
                            key={e._id}
                            message={e}
                            me={user._id === e.sender._id}
                            isStartOfSequence={isStartOfSequence}
                            isEndOfSequence={isEndOfSequence}
                            msgType={getMessageType(e.message)}
                            isLastMessage={isLastMessage} 
                            isTyping={isTyping}
                        />
                    );
                })}

                {isTyping && (
                    <MessageContainer
                        message={{ message: "Typing" }}
                        me={false}
                        isStartOfSequence={true}
                        isEndOfSequence={true}
                        msgType={"typing"}
                        isLastMessage={true}
                        isTyping={isTyping}
                    />
                )}
            </Stack>

        </Box>
    )
}
export default ConversationMain