import { useEffect } from "react"
import {useParams} from 'react-router-dom';
import { usePartiesContext } from "../hooks/usePartiesContext"
import formatDistanceToNow from 'date-fns/formatDistanceToNow'
import { format, parseISO } from 'date-fns'
import {Link} from 'react-router-dom'

const PartyWebsite = () =>{
    const id = useParams().id
    const URL = '/goParty/'+id
    const {parties, dispatch } = usePartiesContext()
    
    useEffect(()=>{
        const fetchParty= async()=>{
            const response = await fetch(URL)
            const json = await response.json()
            console.log(json)
            if (response.ok){
               dispatch({type:'SET_PARTIES', payload: json})
            }
        }
        fetchParty()
    }, [dispatch])
//  <h3><strong>Date: </strong>{format(parseISO(parties.date), 'MM/dd/yyyy')}</h3> 
//    <h3>Posted: {formatDistanceToNow(new Date(parties.createdAt), {addSuffix:true})}</h3>
    return(
        <div className="party-details">
            <h4>{parties.title}</h4>
            <h3><strong>School: </strong>{parties.school}</h3>
            <h3><strong>Date: </strong>{parties.date}</h3> 
            <h3><strong>Max Occupancy: </strong>{parties.max_occupancy}</h3>
            <h3><strong>Current_occupancy </strong>{parties.current_occupancy}</h3>
            <h3><strong>Address: </strong>{parties.address}</h3>
            <h3><strong>Theme: </strong>{parties.theme}</h3>
            <div className="host">
            <h3>Host:</h3>
            <Link to={"/user/"+ parties.host}>
              <h3> {parties.host}</h3>
            </Link>
            </div>
        
            <p><strong>Description: </strong> {parties.description} </p>
            <img style={{ width: '100%', height: 300 }} src={parties.picture} alt=""/>
        </div>
    )
}

export default PartyWebsite