import { GetMessages } from "@redux/actions/chat.actions";
import { RootState } from "@redux/store";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

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


    return (
        <div>Conversation</div>
    )
}

export default Conversation