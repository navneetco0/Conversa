import { createSlice } from "@reduxjs/toolkit"

interface ChatState {
    messages: any[];
}

const initialState: ChatState = {
    messages: [],
}

export const chatSlice = createSlice({
    name: "chat",
    initialState,
    reducers: {
        setMessages: (state, action: any) => {
            state.messages = action.payload;
        }
    }
})

export const { setMessages } = chatSlice.actions;

export default chatSlice.reducer;