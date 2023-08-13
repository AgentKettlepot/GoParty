import { useEffect } from "react"
import {useParams} from 'react-router-dom';
import { usePartiesContext } from "../hooks/usePartiesContext"
import formatDistanceToNow from 'date-fns/formatDistanceToNow'
import { format, parseISO } from 'date-fns'
import {Link} from 'react-router-dom'
import { useAuthContext } from '../hooks/useAuthContext'
const PartyWebsite = () =>{
    const { user } = useAuthContext()

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

    const deleteClick = async() =>{
        const response = await fetch('/goParty/' + parties._id, {
            method:'DELETE'
        })
        window.location.reload();
        const json = await response.json()
        if (response.ok){
            dispatch({type: 'DELETE_PARTY', payload : json})
        }
    }


return(
        <div className="party-details">
            <h3><strong>School: </strong>{parties.school}</h3>
            <h3><strong>Date: </strong>{String(parties.date).substring(0, String(parties.date).indexOf("T"))}</h3> 
            <h3><strong>Max Occupancy: </strong>{parties.max_occupancy}</h3>
            <h3><strong>Address: </strong>{parties.address}</h3>
            <h3><strong>Theme: </strong>{parties.theme}</h3>
            <div className="host">  
            <h3>Host:</h3>
            <Link to={"/user/"+ parties.host}>
              <h3> {parties.host}</h3>
            </Link>
            </div>
        
            <p><strong>Description: </strong> {parties.description} </p>
            <img style={{width: 500, height:"auto"}} src={parties.picture} alt=""/>

            <h3>Want More Information?</h3>
            <p>Send an email!</p> <a href="mailto:{parties.host}">{parties.host}</a>

            <span id="deleteParty" className={parties.host === user.email  ? 'material-symbols-outlined' : 'hidden'} onClick={deleteClick}>delete</span> 
        </div>
    )
}

export default PartyWebsite