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
        <div className="px-3 h-15 sm:sticky sm:top-0 max-w-screen py-4 bg-gray-800 justify-between sm:justify-between flex flex-row items-end font-light text-white ">
            <button className="bg-white p-1 text-black rounded-sm text-xs" onClick={() => {window.location.replace('/');}}>Home</button>
            <div className="flex flex-col sm:flex-row align-text-bottom">
                <form className="text-bottom w-full h-full sm:h-min p-0" method="post" onSubmit={handleSearchSubmit}>
                    <input className="bg-gray-200 align-self-end mx-4 h-5 w-25 sm:w-40 overflow-x-hidden resize-none text-black " name="navTextArea" defaultValue={"go to " + resource} type="text"></input>
                </form>
            </div>
            <div>
                <LoginLogoutButton />
            </div>
        </div>
    )

}

export default Nav;
