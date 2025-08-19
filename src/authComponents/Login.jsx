import React from 'react';

function Login( {setToken} ){

    if(sessionStorage.token != null) {
        window.location.replace('/');
    }

    const [username, setUsername] = React.useState();
    const [password, setPassword] = React.useState();


    const handleSubmit = async e => {
        e.preventDefault();
        try {
            const response = await fetch(`http://localhost:3000/api/auth/login`, {method: `POST`, headers: {'Content-type': 'application/json'}, body: JSON.stringify({username, password})});
            console.log(response);
            if(response.status == 200){
                const body = await response.json();
                console.log(body);
                setToken(body, username);
                window.location.replace('/');
            }
            else {
                alert(`${response.status}, ${await response.text()}`)
            }
        } catch (error){
            console.log(error);
            alert(error);
        }
    }


    return(
        <>
        <form onSubmit = {handleSubmit}>
            <h1 className='on-black'>Login:</h1>
            <label>
                <h2 className='on-black'>Username:</h2>
                <input type="text" onChange={e => setUsername(e.target.value)}></input>
            </label>
            <label>
                <h2 className='on-black'>Password:</h2>
                <input type="password" onChange={e => setPassword(e.target.value)}></input>
            </label>
            <button type="submit">Log In</button>
        </form>
        <a href="/register"><h2 className='on-black'>Don't have an account? Register one now.</h2></a>
        </>
    );
}

export default Login;

