
function LinkToResourcePage( { resource, id, name, className } ) {
    return(
        <>
            <a href={`/${resource}/${id}`}><div className={className}><h4 className="title">{name}</h4></div></a>
        </>
    );
}

export default LinkToResourcePage;

