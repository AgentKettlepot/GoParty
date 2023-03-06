import {usePartiesContext} from '../hooks/usePartiesContext'
const PartyDetails = ({party}) => {
    const {dispatch} = usePartiesContext()
    const handleClick = async() =>{
        const response = await fetch('/goParty/' + party._id, {
            method:'DELETE'
        })
        const json = await response.json()

        if (response.ok){
            dispatch({type: 'DELETE_PARTY', payload : json})
        }
    }
    return (
        <div className="party-details">
            <h4>{party.title}</h4>
            <h3><strong>School: </strong>{party.score}</h3>
            <h3><strong>Date: </strong>{party.date}</h3>
            <h3><strong>Max Occupancy: </strong>{party.max_occupancy}</h3>
            <h3><strong>Current_occupancy </strong>{party.current_occupancy}</h3>
            <h3><strong>Address: </strong>{party.address}</h3>
            <h3><strong>Theme: </strong>{party.theme}</h3>
            <p>Host: {party.host}</p>

            <span onClick={handleClick}>Delete</span>
        </div>
    )
}

export default PartyDetails