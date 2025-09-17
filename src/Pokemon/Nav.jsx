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
        <div className="px-3 sm:fixed sm:sticky sm:top-0 w-full py-4 bg-gray-800 align-center justify-evenly md:justify-between flex flex-col sm:flex-row items-center sm:items-end font-light text-white ">
            <button className="m-2 sm:m-0 bg-white p-1 text-black rounded-sm" onClick={() => {window.location.replace('/');}}>Home</button>
            <div className="flex flex-col sm:flex-row align-text-bottom">
                <form className="flex justify-center text-bottom h-6 sm:h-min" method="post" onSubmit={handleSearchSubmit}>
                    <p className="collapse sm:visible text-bottom">Go to a specific {resource} page:</p>
                    <input className="bg-gray-200 mx-3 my-1 h-5 w-35 sm:w-40 overflow-x-hidden resize-none text-black " name="navTextArea" defaultValue={defaultValue} type="text"></input>
                    <button className="" type="submit">go</button>
                </form>
            </div>
            <div>
                <LoginLogoutButton />
            </div>
        </div>
    )

}

export default Nav;
