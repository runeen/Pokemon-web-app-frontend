
function MoveCard ({pokedex, moveName}) {
    return (<a href={`/move/${moveName}`}><div className="move-card"><h4 className="title">{moveName}</h4></div></a>);
}

export default MoveCard;