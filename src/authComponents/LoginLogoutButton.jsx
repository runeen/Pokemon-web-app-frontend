import React from "react";

function get_username() {
    try {
        const usernameStr = sessionStorage.getItem("username");
        if(usernameStr) setUsername(usernameStr.replaceAll('"', ''));
        console.log(usernameStr);
    }
    catch {
        ;
    }
}

function LoginLogoutButton() {

    const [username, setUsername] = React.useState(null);
    const [loggedIn, setLoggedIn] = React.useState(false);

    const divStyles = "";

    if (!loggedIn) {
        try {
            if(sessionStorage.getItem("token"))  setLoggedIn(true);
        }
        catch (error){
            setLoggedIn(false);
            setUsername(null);
            console.log(error);
        }
    }

    if (loggedIn && !username) {
        try{
            const usernameStr = sessionStorage.getItem("username");
            if(usernameStr) setUsername(usernameStr.replaceAll('"', ''));
            console.log(usernameStr);
        }
        catch (error) {
            console.log(error);
        }

        return(<h1>GETTING USERNAME</h1>);
    }

    if(username && loggedIn) {
        return(
        <div className={`overflow-clip sm:inline-flex sm:flex-row items-center ${divStyles}`}>
            <h2 className="hidden sm:inline mx-0 sm:mx-4 text-right">User: {username}</h2> 
            <button className={"bg-white p-1 text-black rounded-sm text-xs"} onClick={() => {sessionStorage.clear(); setUsername(""); window.location.reload();}}>Log out.</button>
        </div>)
    }

    if (!loggedIn){
        return(
        <div className={divStyles}>
            <button className={"m-0 sm:m-0 bg-white p-1 text-black rounded-sm text-xs"} onClick={() => {window.location.replace("/login");}}>Log in.</button>
        </div>
        )
    }
}

export default LoginLogoutButton;
