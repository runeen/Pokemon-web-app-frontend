import LoginLogoutButton from "../authComponents/LoginLogoutButton";

function Nav( {resource, defaultValue} ) {
    function handleSearchSubmit(e) {

        e.preventDefault();

        const form = e.target;
        const formData = new FormData(form);
        console.log(formData.get("navTextArea"));
        window.location.href = `/${resource}/${formData.get("navTextArea").replaceAll(' ', '-')}`
    }

    return(
        <div className="nav">
            <div className="go-to">
                <button onClick={() => {window.location.replace('/');}}>Go to home</button>
                <h1 className="on-black">Go to a specific {resource} page:</h1>
                <form method="post" onSubmit={handleSearchSubmit}>
                    <textarea name="navTextArea" defaultValue={defaultValue} rows={1} columns={40}></textarea>
                    <button type="submit">Go to {resource}</button>
                </form>
            </div>
            <LoginLogoutButton />
        </div>
    )

}

export default Nav;
