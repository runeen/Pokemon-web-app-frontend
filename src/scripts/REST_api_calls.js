

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
    catch (error) { return null}
}


export function check_pokemon_liked(pokemon_id) {
    const likes_session = get_liked_pokemon_from_session_storage();
    if (!likes_session) return;
    console.log(likes_session);
    return likes_session.includes(pokemon_id);
}



export async function get_token_from_api(url, username, password) {
    try {
        const response = await fetch(url, { method: `POST`, headers: { 'Content-type': 'application/json' }, body: JSON.stringify({ username, password }) });
        console.log(response);
        if (response.status == 200 || response.status == 201) {
            const body = await response.json();
            console.log(body.token);
            set_token(body.token, username);

            if (response.status == 200) { // daca am primit confirmare pentru login
                set_liked_pokemon(body.likes);
                console.log(get_liked_pokemon_from_session_storage());
            } else if (response.status == 201) { // daca am primit confirmare pentru registrare noua
                set_liked_pokemon([]);
                console.log(get_liked_pokemon_from_session_storage());
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
            console.log(get_liked_pokemon_from_session_storage());
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
            console.log(new_array);
            set_liked_pokemon(new_array);
        }
    }
}
