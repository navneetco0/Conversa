import { createSlice } from "@reduxjs/toolkit"

interface ChatState {
    messages: any[];
    chatId: string;
}

const initialState: ChatState = {
    messages: [],
    chatId: "",
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
        }
    }
})

export const { setMessages, setChatId } = chatSlice.actions;

export default chatSlice.reducer;