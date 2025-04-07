import { Stack } from "@mui/material";
import { GetMessages } from "@redux/actions/chat.actions";
import { RootState } from "@redux/store";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ConversationHeader from "./conversationSubElements/ConversationHeader";
import { getOtherUser } from "@utils/getOtherUsers";

type Props = {}

function Conversation({ }: Props) {
    const {
        activeConversation,
        activeConvoFriendship,
        sendMsgLoading,
        isOptimistic,
    } = useSelector((state: RootState) => state.chat);
    const { user, onlineFriends } = useSelector((state: RootState) => state.auth);


    const dispatch = useDispatch();


    useEffect(() => {
        dispatch(GetMessages(activeConversation?._id));

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [activeConversation?._id]);

    const otherUser = getOtherUser(
        activeConversation?.users,
        user._id,
        onlineFriends
      );

    return (
        <Stack height={"100%"} maxHeight={"100vh"} width={"auto"}>
            <ConversationHeader otherUser={otherUser} />

            {/* <ConversationMain /> */}

            {/* {
                activeConvoFriendship && activeConvoFriendship ?
                    (
                        <ConversationFooter
                            convo_id={activeConversation._id}
                            sendMsgLoading={sendMsgLoading}
                            // --------- Optimistic Approach ---------
                            isOptimistic={isOptimistic}
                            currentUser={user}
                            otherUser={otherUser}
                            activeConversation={activeConversation}
                        // ---------------------------------------
                        />
                    ) : (
                        <Stack
                            py={2}
                            px={3}
                            width={"100%"}
                            sx={{
                                position: "sticky",
                                backgroundColor: theme.palette.background.default,
                                boxShadow: "0px 0px 2px rgba(0, 0, 0, 0.25)",
                            }}
                            alignItems={"center"}
                        >
                            You are no longer friends with this user!
                        </Stack>
                    )
            } */}
        </Stack>
    )
}

export default Conversation