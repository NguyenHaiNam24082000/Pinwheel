import React, { useState, useRef } from "react";
import { useHistory } from "react-router-dom";
import { auth } from "../firebase";
import Loading from "../components/Loading";
const host = "http://localhost:8000";
import { SocketContext,socket } from "../context/socket";
import { getUserInfo } from './UserProvider';

export const AuthContext = React.createContext();

export default function AuthProvider({ children }) {
    const [user, setUser] = useState({});
    const history = useHistory();
    const [isLoading, setIsLoading] = useState(true);

    React.useEffect(() => {
        const unsubscibed = auth.onAuthStateChanged((response) => {
            setIsLoading(true);
            if (response) {
                socket.connect(host);
                getUserInfo().then(res => setUser(res.data))
                setTimeout(() => {
                    setIsLoading(false);
                    history.push("/");
                }, 2500);
                console.log(user);
                return;
            }

            // reset user info
            setTimeout(() => {
                setUser({});
                socket.disconnect();
                setIsLoading(false);
                history.push("/login");
            }, 2500);
        });

        // clean function
        return () => {
            unsubscibed();
        };
    }, [history]);

    return (
        <AuthContext.Provider value={{ user }}>
            {isLoading ? (
                <Loading style={{ position: "fixed", inset: 0 }} />
            ) : (
                <SocketContext.Provider value={{socket}}>
                {children}
                </SocketContext.Provider>
            )}
        </AuthContext.Provider>
    );
}
