import React from 'react';

function Register( {setToken} ) {
    if(sessionStorage.token != null) {
        window.location.replace('/');
    }

    const [username, setUsername] = React.useState();
    const [password, setPassword] = React.useState();

    const handleSubmit = async e => {
        e.preventDefault();
        try {
            const response = await fetch(`http://localhost:3000/api/auth/register`, {method: `POST`, headers: {'Content-type': 'application/json'}, body: JSON.stringify({username, password})});
            console.log(response);
            if(response.status == 201){
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
        }
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