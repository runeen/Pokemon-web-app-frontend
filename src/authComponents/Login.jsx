import React from 'react';
import { get_token_from_api } from '../scripts/REST_api_calls';

async function login(url, username, password) {
    return await get_token_from_api(url, username, password);
}


function Login(){

    if(sessionStorage.token != null) {
        window.location.replace('/');
    }

    const [username, setUsername] = React.useState();
    const [password, setPassword] = React.useState();


    const handleSubmit = async e => {
        e.preventDefault();
        const retVal = await login(`/auth/login`, username, password);
        if(retVal == 0) window.location.replace('/');
    }


    return(
        <div className={"text-center"}>
        <form className={"flex flex-col items-center text-center"} onSubmit = {handleSubmit}>
            <h1 className='text-2xl my-5 font-bold'>Login:</h1>
            <label>
                <h2 className='text-xl my-5 font-medium'>Username:</h2>
                <input className={"bg-gray-600"}type="text" onChange={e => setUsername(e.target.value)}></input>
            </label>
            <label>
                <h2 className='text-xl my-5 font-medium'>Password:</h2>
                <input className={"bg-gray-600"} type="password" onChange={e => setPassword(e.target.value)}></input>
            </label>
            <button className={"text-xl hover:text-blue-100 my-5"} type="submit">Log In</button>
        </form>
        <p>Don't have an account?</p>
        <a href="/#/register"><h2 className={"hover:text-blue-100"} >Register one now.</h2></a>
        <a href="/"><h2 className='hover:text-blue-100 my-4'>Home</h2></a>
        </div>
    );
}

export default Login;

