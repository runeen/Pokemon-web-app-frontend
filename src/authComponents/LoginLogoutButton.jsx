import React from "react";


function LoginLogoutButton() {

    const [username, setUsername] = React.useState();

    React.useEffect(() => {
        try {
            const usernameStr = sessionStorage.getItem("username");
            if(usernameStr) setUsername(usernameStr.replaceAll('"', ''));
        }
        catch {
            ;
        }
    }, []);

    console.log(username);


    if(username) {
        return(
        <>
        <h2 className="on-black">You are logged in as {username}</h2> <button onClick={() => {sessionStorage.clear(); setUsername("");}}>Log out.</button>
        </>)
    }
    else {
        return(
            <>
            <h2 className="on-black">You are not logged in.</h2> <button onClick={() => {window.location.replace("/login");}}>Log in.</button>
            </>
        )
    }
}

export default LoginLogoutButton;
