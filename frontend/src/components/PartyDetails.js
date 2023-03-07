import {usePartiesContext} from '../hooks/usePartiesContext'

import formatDistanceToNow from 'date-fns/formatDistanceToNow'

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
            <h3><strong>Date: </strong>{formatDistanceToNow(new Date(party.date))}</h3>
            <h3><strong>Max Occupancy: </strong>{party.max_occupancy}</h3>
            <h3><strong>Current_occupancy </strong>{party.current_occupancy}</h3>
            <h3><strong>Address: </strong>{party.address}</h3>
            <h3><strong>Theme: </strong>{party.theme}</h3>
            <h3>Host: {party.host}</h3>
            <h3>Posted: {formatDistanceToNow(new Date(party.createdAt), {addSuffix:true})}</h3>

            <span className="material-symbols-outlined" onClick={handleClick}>delete</span>
        </div>
    )
}

export default PartyDetails