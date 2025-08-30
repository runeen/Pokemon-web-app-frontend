import React from 'react';
import { get_token_from_api } from '../scripts/REST_api_calls';

async function login(url, username, password) {
    await get_token_from_api(url, username, password);
}


function Login(){

    if(sessionStorage.token != null) {
        window.location.replace('/');
    }

    const [username, setUsername] = React.useState();
    const [password, setPassword] = React.useState();


    const handleSubmit = async e => {
        e.preventDefault();
        await login(`http://localhost:3000/api/auth/login`, username, password);
        window.location.replace('/');
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

