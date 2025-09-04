

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

    try {// CORS OPRESTE ACEST REQUEST, DAR PE ALTELE NU... ?
        const response = await fetch(
            `http://localhost:3000/api/team/${team_id}`,
            {
                method: `PUT`,
                headers: {'Content-type': 'application/json',
                          'Authorization': get_token_from_session_storage()
                },
                body: bodyStr
            }
        );
        if (response.status == 200) {
            const body = await response.json();
            window.location.reload();
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

export async function add_team(name, description){
    const authToken = get_token_from_session_storage();
    if (!authToken) {
        window.location.replace('./login');
        return -1;
    }
    try {// CORS OPRESTE ACEST REQUEST, DAR PE ALTELE NU... ?
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
            window.location.reload();
            return 0;
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

export async function get_token_from_api(url, username, password) {
    try {
        const response = await fetch(url, { method: `POST`, headers: { 'Content-type': 'application/json' }, body: JSON.stringify({ username, password }) });
        console.log(response);
        if (response.status == 200 || response.status == 201) {
            const body = await response.json();
            set_token(body.token, username);

            if (response.status == 200) { // daca am primit confirmare pentru login
                set_liked_pokemon(body.likes);
            } else if (response.status == 201) { // daca am primit confirmare pentru registrare noua
                set_liked_pokemon([]);
            }
        }
        else {
            alert(`${response.status}, ${await response.text()}`)
        }
    } catch (error) {
        console.log(error);
        alert(error);
    }
}

export async function like_pokemon(pokemon_id) {
    const token = get_token_from_session_storage();

    if (!isNaN(pokemon_id) && token) {
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
        }

        if (response.status == 200) { // Am adaugat like cu success
            const likes_array = get_liked_pokemon_from_session_storage();
            likes_array.push(pokemon_id);
            set_liked_pokemon(likes_array);
        }

    }
};

export async function remove_like_pokemon(pokemon_id) {
    const token = get_token_from_session_storage();

    if (!isNaN(pokemon_id) && token) {
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
        }

        if (response.status == 200) { // Daca am sters cu succes like-ul
            const likes_array = get_liked_pokemon_from_session_storage();
            const new_array = likes_array.filter((entry) => {return entry != pokemon_id});
            set_liked_pokemon(new_array);
        }
    }
}
