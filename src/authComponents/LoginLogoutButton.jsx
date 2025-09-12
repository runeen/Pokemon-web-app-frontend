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
        <>
        <h2 className="on-black">You are logged in as {username}</h2> 
        <button onClick={() => {sessionStorage.clear(); setUsername(""); window.location.reload();}}>Log out.</button>
        </>)
    }

    if (!loggedIn){
        return(
            <>
            <h2 className="on-black">You are not logged in.</h2> 
            <button onClick={() => {window.location.replace("/login");}}>Log in.</button>
            </>
        )
    }
}

export default LoginLogoutButton;
