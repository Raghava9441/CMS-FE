import { useTheme } from "@mui/material";
import { RootState } from "@redux/store";
import { useDispatch, useSelector } from "react-redux";

interface Props {
    _id: string;
    firstName: string;
    lastName: string;
    latestMessage: string;
    activityStatus: string;
    avatar: string;
    unread: number;
    onlineStatus: boolean;
    isLoading: boolean;
    convo_id: string;
    fromContact: boolean;
    toggleDrawer: () => void;
}


const AllChatElement = ({
    _id,
    firstName,
    lastName,
    latestMessage,
    activityStatus,
    avatar,
    unread,
    onlineStatus,
    isLoading,
    convo_id,
    fromContact,
    toggleDrawer,
}: Props) => {

    const theme = useTheme();
    const dispatch = useDispatch();
    const { user, onlineFriends } = useSelector((state: RootState) => state.auth);
    const { activeConversation, typingConversation } = useSelector((state: RootState) => state.chat);


}