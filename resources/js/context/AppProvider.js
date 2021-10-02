import React, { useEffect, useState } from "react";
import { AuthContext } from "./AuthProvider";
import axios from "axios";
export const AppContext = React.createContext();

export default function AppProvider({ children }) {
    const [conversations, setConversations] = useState([]);
    const [selectedConversationId, setSelectedConversationId] = useState('');
    const { user } = React.useContext(AuthContext);
    useEffect(() => {
        // getUserInfo().then(res => setUser(res.data));
        axios.get(`/api/getContact/?userId=${user.id}`).then((res) => {
            res.data.forEach((data) => {
                if (data.kind === "friend" && data.id != user.id)
                    setConversations((conversationList) => [
                        ...conversationList,
                        data,
                    ]);
            });
        });
        return () => {};
    }, []);
    const selectedConversation = React.useMemo(
        () => conversations.find((conversation) => conversation.conversationId === selectedConversationId) || {},
        [conversations, selectedConversationId]
    );
    console.log(selectedConversation);
    return (
        <AppContext.Provider value={{ conversations,selectedConversation,selectedConversationId,setSelectedConversationId }}>
            {children}
        </AppContext.Provider>
    );
}
