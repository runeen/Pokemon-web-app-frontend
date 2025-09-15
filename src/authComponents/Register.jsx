import React from 'react';
import { get_token_from_api, set_liked_pokemon } from '../scripts/REST_api_calls';

async function register(url, username, password) {
    await get_token_from_api(url, username, password);
    set_liked_pokemon([]);
}


function Register() {
    if(sessionStorage.token != null) {
        window.location.replace('/');
    }

    const [username, setUsername] = React.useState();
    const [password, setPassword] = React.useState();

    const handleSubmit = async e => {
        e.preventDefault();
        await register(`http://localhost:3000/api/auth/register`, username, password);
        window.history.go(-2);
    }


    return(
        <>
        <form onSubmit = {handleSubmit}>
            <h1 className='on-black'>Register:</h1>
            <label>
                <h2 className='on-black'>Username:</h2>
                <input type="text" onChange={e => setUsername(e.target.value)}></input>
            </label>
            <label>
                <h2 className='on-black'>Password:</h2>
                <input type="password" onChange={e => setPassword(e.target.value)}></input>
            </label>
            <button type="submit">Register new account</button>
        </form>
        <a href="/login"><h2 className='on-black'>Already have an account? Log in.</h2></a>
        </>
    );

}

export default Register;
