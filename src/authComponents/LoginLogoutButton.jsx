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

    const divStyles = "m-2 sm:m-0";

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
        <div className={`inline-flex flex-col items-center sm:flex-row sm:items-center ${divStyles}`}>
            <h2 className="collapse sm:visible mx-0 sm:mx-4 text-right">User: {username}</h2> 
            <p className={'sm:collapse sm:w-0 sm:h-0 text-center'}>User: {username}</p>
            <button className={"m-2 sm:m-0 bg-white p-1 text-black rounded-sm w-fit"} onClick={() => {sessionStorage.clear(); setUsername(""); window.location.reload();}}>Log out.</button>
        </div>)
    }

    if (!loggedIn){
        return(
        <div className={divStyles}>
            <button className={"m-2 sm:m-0 bg-white p-1 text-black rounded-sm"} onClick={() => {window.location.replace("/login");}}>Log in.</button>
        </div>
        )
    }
}

export default LoginLogoutButton;
