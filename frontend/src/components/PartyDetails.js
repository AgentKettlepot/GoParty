import {usePartiesContext} from '../hooks/usePartiesContext' 
import formatDistanceToNow from 'date-fns/formatDistanceToNow'
import { format, parseISO } from 'date-fns'
import {Link} from 'react-router-dom'
import { useAuthContext } from '../hooks/useAuthContext'

const PartyDetails = ({party}) => {
    const { user } = useAuthContext()
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
            <Link to={"/party/"+ party._id}>
            <h4>{party.title}</h4>
            </Link>

            
            <h3><strong>School: </strong><Link to={"/college/"+party.school}>{party.school}</Link></h3>
            
         
            <h3><strong>Date: </strong>{format(parseISO(party.date), 'MM/dd/yyyy')}</h3> 
            <h3><strong>Max Occupancy: </strong>{party.max_occupancy}</h3>
            <h3><strong>Address: </strong>{party.address}</h3>
            <h3><strong>Theme: </strong>{party.theme}</h3>
           
            <h3>Posted: {formatDistanceToNow(new Date(party.createdAt), {addSuffix:true})}</h3>
            <div className="host">
            <h3>Host:</h3>
            <Link to={"/user/"+ party.host}>
              <h3> {party.host}</h3>
            </Link>
            </div>
            <p><strong>Description: </strong> {party.description} </p>
            </div>
    )
}

export default PartyDetails