import React, {useState} from "react";
import Sidebar from "./Sidebar";
import ChatArea from "./ChatArea";
import { Route, Switch, BrowserRouter } from "react-router-dom";
import Login from "./Login";
import Avatar from "./Avatar";


function Index() {
    const [theme, setTheme]= useState(localStorage.getItem('theme'));

    const setThemeMode = ()=>{
        setTheme(localStorage.getItem('theme'));
    }

    return (
        <BrowserRouter>
            <Switch>
                <Route component={Login} path='/login' />
                <Route component={Avatar} path='/avatar'/>
                <Route path='/' >
                    <div className="w-full flex h-full bg-base-100 text-base-content" data-theme={theme}>
                        <Sidebar setThemeMode={setThemeMode} theme={theme}/>
                        <ChatArea />
                    </div>
                </Route>
            </Switch>
        </BrowserRouter>
    );
}

export default Index;
