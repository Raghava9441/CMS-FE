import { RootState } from "@redux/store";
import { useDispatch, useSelector } from "react-redux";

type Props = {}

function Conversation({ }: Props) {
    const {
        activeConversation,
        activeConvoFriendship,
        sendMsgLoading,
        isOptimistic,
    } = useSelector((state: RootState) => state.chat);
    
    const dispatch = useDispatch();


    return (
        <div>Conversation</div>
    )
}

export default Conversation