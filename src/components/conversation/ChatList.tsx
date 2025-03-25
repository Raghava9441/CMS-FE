import { useTheme } from "@mui/material";
import { RootState } from "@redux/store";
import { useDispatch, useSelector } from "react-redux";




function ChatsList() {
    const theme = useTheme();
    const dispatch = useDispatch();
    const { conversations, activeConversation } = useSelector((state: RootState) => state.chat);

    return (
        <div>ChatList</div>
    )
}

export default ChatsList