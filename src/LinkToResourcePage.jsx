
function LinkToResourcePage( { resource, id, name, className } ) {
    return(
        <>
            <button onClick={() => {window.location.replace(`/#/${resource}/${id}`); window.location.reload();}} ><div className={className}><h4> {name}</h4></div></button>
        </>
    );
}

export default LinkToResourcePage;

