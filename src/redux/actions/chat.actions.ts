import { ConversationApi, MessageApi } from "@api/api";
import { ShowSnackbar } from "@redux/slices/authSlice";
import { closeActiveConversation, setLoading } from "@redux/slices/chat.slice";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { socket } from "@utils/socket";
// import axios from "axios";

export const GetConversations = createAsyncThunk("conversations/get-conversation", async (arg, { rejectWithValue, dispatch }) => {
    try {
        // set user loading to true
        dispatch(setLoading(true));
        const { data } = await ConversationApi.getConversation()
        // console.log(data)
        // set user loading to false
        dispatch(setLoading(false));

        return data;
    } catch (error) {
        console.log(" error:", error)
        dispatch(
            ShowSnackbar({
                severity: 'error',
                message: error.response.data.data,
            })
        );
        return rejectWithValue(error.error);
    }
})

// ------------- Create or Open Conversation -------------
export const CreateOpenConversation = createAsyncThunk(
    "conversation/create-open-conversation",
    async (value, { rejectWithValue, dispatch }) => {
        try {

            const { data } = await ConversationApi.createOrOpenConversation({ receiver_id: value })

            dispatch(closeActiveConversation());

            // emit join conversation to socket
            socket.emit("join_conversation", data.conversation._id);

            return data;
        } catch (error) {
            dispatch(
                ShowSnackbar({
                    severity: 'error',
                    message: error.response.data.data,
                })
            );
            return rejectWithValue(error.error);
        }
    }
);

// ------------- Get Messages -------------
export const GetMessages = createAsyncThunk(
    "message/get-messages",
    async (convoId: string, { rejectWithValue, dispatch }) => {
        try {

            const { data } = await MessageApi.getMessages(convoId)

            return data.data;
        } catch (error) {
            console.log(" error:", error)
            // show snackbar
            dispatch(
                ShowSnackbar({
                    severity: 'error',
                    message: error.response.data.data,
                })
            );
            return rejectWithValue(error.error);
        }
    }
);

// ------------- Get Messages -------------
export const SendMessage = createAsyncThunk(
    "message/send-message",
    async (messageData, { rejectWithValue, dispatch, getState }) => {
        try {
            const { data } = await MessageApi.sendMessage(messageData)

            // Approach check
            if (!getState().chat.isOptimistic) {
                // emit send message to socket
                socket.emit("send_message", data.message);
            }
            return data;
        } catch (error) {
            console.log(" error:", error)
            // show snackbar
            dispatch(
                ShowSnackbar({
                    severity: 'error',
                    message: error.response.data.data,
                })
            );
            return rejectWithValue(error.error);
        }
    }
);
