import { createSlice } from "@reduxjs/toolkit"

interface ChatState {
    messages: any[];
    chatId: string;
}

const initialState: ChatState = {
    messages: [],
    chatId: "",
}

export const messageSlice = createSlice({
    name: "message",
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

export const { setMessages, setChatId } = messageSlice.actions;

export default messageSlice.reducer;