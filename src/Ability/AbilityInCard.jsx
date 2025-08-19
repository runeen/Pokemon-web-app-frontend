import React from 'react';

function AbilityInCard( {abilityName, pokedex} ) {

    /*
    const [abilityData, setAbilityData] = React.useState(null);

    React.useEffect(() => {
        async function getAbilityData() {
            if (abilityData == null) {
                const response = await pokedex.getAbilityByName(abilityName);
                console.log("fetched data");
                setAbilityData(response);
            }
        }
        getAbilityData();
    }, [pokedex, abilityData, abilityName]);

    if (!abilityData) {
        return <div>Loading ability...</div>;
    }

    return (<a href={`/ability/${abilityData.name}`}><div className="ability-in-card"><h4 className="title">{abilityData.name}</h4></div></a>);
    */

    return (<a href={`/ability/${abilityName}`}><div className="ability-in-card"><h4 className="title">{abilityName}</h4></div></a>);
}




export default AbilityInCard;