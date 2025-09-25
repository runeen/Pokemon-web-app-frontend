import React from 'react';
import { get_token_from_api, set_liked_pokemon } from '../scripts/REST_api_calls';

async function register(url, username, password) {
    const retVal = await get_token_from_api(url, username, password);
    set_liked_pokemon([]);
    return retVal;
}


function Register() {
    if(sessionStorage.token != null) {
        window.location.replace('/');
    }

    const [username, setUsername] = React.useState();
    const [password, setPassword] = React.useState();


    const handleSubmit = async e => {
        e.preventDefault();
        const retVal = await register(`/auth/register`, username, password);
        console.log(retVal);
        if(retVal == 0) {
            window.location.replace('/');
        }
    }


    return(
        <div className={"text-center"}>
        <form className={"flex flex-col items-center text-center"} onSubmit = {handleSubmit}>
            <h1 className='text-2xl my-5 font-bold'>Register:</h1>
            <label>
                <h2 className='text-xl my-4 font-medium'>Username:</h2> {//TODO: Verifica regex si cand este editat textul din input 
                }
                <p className="mb-2 text-sm">Usernames must contain at least one non-digit character.</p>
                <p className="mb-3 text-sm">Usernames can only contain letters, digits, '_' and  '-'.</p>
                <input className={"bg-gray-600"} type="text" pattern={"[A-Za-z0-9_\\-]*[A-Za-z_\\-][A-Za-z0-9_\\-]*"} onChange={e => setUsername(e.target.value)}></input> </label>
            <label>
                <h2 className='text-xl my-5 font-medium'>Password:</h2>
                <input className={"bg-gray-600"} type="password" onChange={e => setPassword(e.target.value)}></input>
            </label>
            <button className={"text-xl hover:text-blue-100 my-5"} type="submit">Register</button>
        </form>
        <p>Already have an account?</p>
        <a href="/#/login"><h2 className='hover:text-blue-100'>Log in.</h2></a>
        <a href="/"><h2 className='hover:text-blue-100 my-4'>Home</h2></a>
        </div>
    );

}

export default Register;
