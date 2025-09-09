export function set_token(token, username) {
    sessionStorage.setItem("token", token);
    sessionStorage.setItem("username", JSON.stringify(username));
}

export function set_liked_pokemon(liked_pokemon) {
    sessionStorage.setItem("liked_pokemon", JSON.stringify(liked_pokemon));
}

export function get_token_from_session_storage() {
    try { return sessionStorage.token; }
    catch {
        window.location.replace('/login');
        return null
    };
}



export function get_liked_pokemon_from_session_storage() {
    try { return JSON.parse(sessionStorage.liked_pokemon); }
    catch (error) { return [];}
}

export function check_pokemon_liked(pokemon_id) {
    const likes_session = get_liked_pokemon_from_session_storage();
    if (!likes_session) return;
    return likes_session.includes(pokemon_id);
}

export async function get_user_teams() {
    const authToken = get_token_from_session_storage();
    const username = JSON.parse(sessionStorage.getItem("username"));
    if(!authToken) {
        window.location.replace('./login');
        return -1;
    }
    const response = await fetch(`http://localhost:3000/api/profile/users/${username}/teams`);

    if (response.status == 200)   {
        const body = await response.json();
        return body;
    }
    return -1;
}

export async function get_username_teams(username) {
    
    const response = await fetch(`http://localhost:3000/api/profile/users/${username}/teams`);
    if (response.status == 200){
        const body = await response.json();
        console.log(body);
        return body;
    }
    return -1;
}

export async function edit_team(name, description, team_id) {
    const authToken = get_token_from_session_storage();
    if (!authToken) {
        window.location.replace('./login');
        return -1;
    }

    let bodyStr = "{ ";
    if (name) bodyStr = bodyStr + `"name": "${name}" `;
    if (name && description) bodyStr = bodyStr + `, `;
    if (description) bodyStr = bodyStr + `"description": "${description}" `;
    bodyStr = bodyStr + `}`;
    console.log(bodyStr)

    try {
        const response = await fetch(
            `http://localhost:3000/api/team/${team_id}`,
            {
                method: `PUT`,
                headers: {'Content-type': 'application/json',
                          'Authorization': authToken
                },
                body: bodyStr
            }
        );
        if (response.status == 200) {
            return 0;
        }
        if (response.status == 401) {
            console.log(`NOT AUTHORIZED ERROR!`);
            window.location.replace("./login");
            return -1;
        }
        //TODO: make sure all codes are handled properly

        console.log(`ERROR CREATING TEAM`);
        return -1;
    } catch (error){
        console.log(error);
        return -1;
    }
}
// functia asta returneaza desi altele nu, ar trebui sa returneze si celelalte?
export async function add_team(name, description){
    const authToken = get_token_from_session_storage();
    if (!authToken) {
        window.location.replace('./login');
        return -1;
    }

    try {
        const response = await fetch(
            "http://localhost:3000/api/team",
            {
                method: `POST`,
                headers: {'Content-type': 'application/json',
                          'Authorization': get_token_from_session_storage()
                },
                body:   `{ "name": "${name}", "description": "${description}" }`
            }
        );
        if (response.status == 201) {
            const body = await response.json();
            return body;
        }
        if (response.status == 401) {
            console.log(`NOT AUTHORIZED ERROR!`);
            window.location.replace("./login");
            return -1;
        }

        console.log(`ERROR CREATING TEAM`);
        return -1;
    } catch (error){
        console.log(error);
        return -1;
    }
}

export async function remove_team(teamID) {
    const authToken = get_token_from_session_storage();
    if (!authToken) {
        window.location.replace('./login');
        return -1;
    }

    try {
       const response = await fetch(
            `http://localhost:3000/api/team/${teamID}`,
           {
                method: `DELETE`,
                headers: {"Content-type": "application/json",
                          "Authorization": authToken},
           }
       ); 
       if (response.status == 200) {
           return 0;
       }
       console.log(response);  
       return -1;
    }
    catch (error){ 
        console.log(error);
        return -1;
    }

}

export async function get_team(teamID) {
    try {
        const response = await fetch(
            `http://localhost:3000/api/team/${teamID}`
        );
        if (response.status == 200) {
            const body = await response.json();
            return body;
        }
    }
    catch (error) {
        console.log(error);
    }
}

export async function get_token_from_api(url, username, password) {
    try {
        const response = await fetch(url, { 
            method: `POST`, 
            headers: { 'Content-type': 'application/json' }, 
            body: JSON.stringify({ username, password }) 
        });

        if (response.status == 200 || response.status == 201) {
            const body = await response.json();

            set_token(body.token, username);
            
            if (response.status == 200)    set_liked_pokemon(body.likes);  // daca am primit confirmare pentru login
            else if (response.status == 201)   set_liked_pokemon([]);      // daca am primit confirmare pentru registrare noua
        }
    } catch (error) {
        console.log(error);
        alert(error);
    }
}

export async function like_pokemon(pokemon_id) {
    const token = get_token_from_session_storage();
    
    if (!token) {
        window.location.replace("/login");
        return [];

    }

    if (!isNaN(pokemon_id)) {
        const response = await fetch(`http://localhost:3000/api/pokemon/${pokemon_id}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": token
            }
        });
        if (response.status == 401) {
            sessionStorage.clear();
            window.location.replace("/login");
            return [];
        }

        if (response.status == 200) { // Am adaugat like cu success
            const likes_array = get_liked_pokemon_from_session_storage();
            likes_array.push(pokemon_id);
            set_liked_pokemon(likes_array);
            return likes_array;
        }

    }
    return get_liked_pokemon_from_session_storage();
};

export async function remove_like_pokemon(pokemon_id) {

    const token = get_token_from_session_storage();
    
    if (!token) {
        window.location.replace("/login");
        return [];
    }

    if (!isNaN(pokemon_id)) {
        const response = await fetch(`http://localhost:3000/api/pokemon/${pokemon_id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "Authorization": token
            }
        });
        if (response.status == 401) {
            sessionStorage.clear();
            window.location.replace("/login");
            return [];
        }

        if (response.status == 200) { // Daca am sters cu succes like-ul
            const likes_array = get_liked_pokemon_from_session_storage();
            const new_array = likes_array.filter((entry) => {return entry != pokemon_id});
            set_liked_pokemon(new_array);
            return(new_array); 
       }
    }

    return get_liked_pokemon_from_session_storage(); 
}
