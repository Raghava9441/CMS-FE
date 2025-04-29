import { CreateOpenConversation, GetConversations, GetMessages, SendMessage } from "@redux/actions/chat.actions";
import { createSlice } from "@reduxjs/toolkit";

interface initalstate {
    isOptimistic: boolean;
    isLoading: boolean;
    sendMsgLoading: boolean;
    error: boolean;
    conversations: never[];
    activeConversation: null;
    activeConvoFriendship: null;
    notifications: never[];
    messages: any[];
    typingConversation: never[];
}

const initialState: initalstate = {
    isOptimistic: true, // default approach set to optimistic
    isLoading: false,
    sendMsgLoading: false,
    error: false,

    conversations: [],
    activeConversation: null,
    activeConvoFriendship: null,
    notifications: [],

    messages: [],
    typingConversation: [],
}


const slice = createSlice({
    name: "chat",
    initialState,
    reducers: {
        setLoading: (state, action) => {
            state.isLoading = action.payload;
        },
        setIsOptimistic: (state, action) => {
            state.isOptimistic = action.payload.isOptimistic;
        },

        closeActiveConversation: (state) => {
            state.activeConversation = null;
            state.activeConvoFriendship = null;
            state.messages = [];
        },

        updateMsgConvo: (state, action) => {
            const currentConvo = state.activeConversation;
            // console.log(action.payload.conversation._id)
            // updating messages
            if (currentConvo?._id === action.payload.conversation._id) {
                console.log(state)
                state.messages = [...state.messages, action.payload];
            }
            // update conversations
            const conversation = {
                ...action.payload.conversation,
            };
            let newConvos = [...state.conversations].filter(
                (e) => e._id !== conversation._id
            );
            newConvos.unshift(conversation);

            state.conversations = newConvos;
        },
        updateTypingConvo: (state, action) => {
            const { typing, conversation_id } = action.payload;

            const index = state.typingConversation.findIndex(
                (convo) => convo.conversation_id === conversation_id
            );

            if (index !== -1) {
                // If typing data is present for that convo
                state.typingConversation[index].typing = typing;
            } else {
                // If typing data doesn't exist
                state.typingConversation.push({
                    typing,
                    conversation_id,
                });
            }
        },
    },
    extraReducers(builder) {
        builder
            .addCase(GetConversations.pending, (state, action) => {
                state.isLoading = true;
                state.error = false;
            })
            .addCase(GetConversations.fulfilled, (state, action) => {
                console.log(action.payload.data)
                state.conversations = action.payload.data;
                state.isLoading = false;
                state.error = false;
            })
            .addCase(GetConversations.rejected, (state, action) => {
                state.isLoading = false;
                state.error = true;
            })

            // --------- Get Messages Builder ---------
            .addCase(GetMessages.pending, (state, action) => {
                state.error = false;
            })
            .addCase(GetMessages.fulfilled, (state, action) => {
                // console.log(action.payload)
                state.messages = action.payload || [];
                state.isLoading = false;
                state.error = false;
            })
            .addCase(GetMessages.rejected, (state, action) => {
                state.isLoading = false;
                state.error = true;
            })

            // --------- Send Message Builder ---------
            .addCase(SendMessage.pending, (state, action) => {
                state.error = false;
                state.sendMsgLoading = state.isOptimistic ? false : true; //change to true for Pessimistic Approach
            })
            .addCase(SendMessage.fulfilled, (state, action) => {
                // Uncomment for Pessimistic Approach

                if (!state.isOptimistic) {
                    // updating messages list
                    state.messages = [...state.messages, action.payload.message];

                    // updating conversations
                    const conversation = {
                        ...action.payload.message.conversation,
                    };
                    let newConvos = [...state.conversations].filter(
                        (e) => e._id !== conversation._id
                    );
                    newConvos.unshift(conversation);

                    state.conversations = newConvos;
                }

                state.sendMsgLoading = false;
                state.isLoading = false;
                state.error = false;
            })
            .addCase(SendMessage.rejected, (state, action) => {
                state.sendMsgLoading = false;
                state.isLoading = false;
                state.error = true;
            })

            // --------- Create Open Conversation Builder ---------
            .addCase(CreateOpenConversation.pending, (state, action) => {
                state.isLoading = true;
                state.error = false;
            })
            .addCase(CreateOpenConversation.fulfilled, (state, action) => {
                // console.log(action.payload.conversation)
                state.activeConversation = action.payload.conversation;
                state.activeConvoFriendship = action.payload.isValidFriendShip;
                state.isLoading = false;
                state.error = false;
            })
            .addCase(CreateOpenConversation.rejected, (state, action) => {
                state.isLoading = false;
                state.error = true;
            })
    }
})

// snackbar functions
export function clearChat() {
    return async (dispatch, getState) => {
        dispatch(slice.actions.clearConversation());
    };
}

export const {
    closeActiveConversation,
    updateMsgConvo,
    updateTypingConvo,
    // --------- Optimistic Approach ---------
    setIsOptimistic,
    // ---------------------------------------
    setLoading
} = slice.actions;

export default slice.reducer;