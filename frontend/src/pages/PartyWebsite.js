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
        const json = await response.json()
        if (response.ok){
            dispatch({type: 'DELETE_PARTY', payload : json})
        }
    }
    const increaseOccClick= async() =>{
       const newOccCount = parties.current_occupancy+1
       console.log(newOccCount)
       const newParty = {...parties, current_occupancy:newOccCount}
       /* FIND A WAY TO AUTO REFRESH OR AUTO UPDATE CODE HERE*/
       const response = await fetch('/goParty/' + parties._id, {
        method: 'PATCH',
        body: JSON.stringify(newParty),
        headers:{
            'Content-Type': 'application/json'
        }
    })
    const json = await response.json()
    dispatch({type: 'SET_PARTIES', payload: json})
    }
//  <h3><strong>Date: </strong>{format(parseISO(parties.date), 'MM/dd/yyyy')}</h3> 
//    <h3>Posted: {formatDistanceToNow(new Date(parties.createdAt), {addSuffix:true})}</h3>
//

return(
        <div className="party-details">
            <h4 className={parties.date<new Date().getTime() ? 'pastDate' : 'error'}>{parties.title}</h4>
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
            <span id="increaseOcc" className={parties.host === user.email  ? 'material-symbols-outlined' : 'hidden'} onClick={increaseOccClick}>Add</span> 
            <span id="deleteParty" className={parties.host === user.email  ? 'material-symbols-outlined' : 'hidden'} onClick={deleteClick}>delete</span> 
            </div>
        
            <p><strong>Description: </strong> {parties.description} </p>
            <img style={{ width: '100%', height: 300 }} src={parties.picture} alt=""/>

            <h3>Want More Information?</h3>
            <p>Send an email!</p> <a href="mailto:{parties.host}">{parties.host}</a>

            <h3>I Want to Sign Up!</h3>
        </div>
    )
}

export default PartyWebsite