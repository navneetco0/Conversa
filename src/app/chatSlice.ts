import { createSlice } from "@reduxjs/toolkit"

interface ChatState {
    messages: any[];
    chatId: string;
    selectedChat: any;
}

const initialState: ChatState = {
    messages: [],
    chatId: "",
    selectedChat: null,
}

export const chatSlice = createSlice({
    name: "chat",
    initialState,
    reducers: {
        setMessages: (state, action: any) => {
            state.messages = action.payload;
        },
        setChatId: (state, {payload}) => {
            state.chatId = payload;
        },
        setSelectedChat: (state, {payload}) => {
            state.selectedChat = payload;
        }
    }
})

export const { setMessages, setChatId, setSelectedChat } = chatSlice.actions;

export default chatSlice.reducer;