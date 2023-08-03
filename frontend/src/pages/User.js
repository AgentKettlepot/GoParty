import { useEffect } from "react"
import {useParams} from 'react-router-dom';
import { usePartiesContext } from "../hooks/usePartiesContext"
import PartyDetails from '../components/PartyDetails'

const UserDetails = () =>{
    const user_email = useParams()
    const email = user_email.user
    const {parties, dispatch } = usePartiesContext()
    useEffect(()=>{
        const fetchParties= async()=>{
            const response = await fetch('/goParty')
            const json = await response.json()

            if (response.ok){
               dispatch({type:'SET_PARTIES', payload: json})
            }
        }

        fetchParties()
    }, [dispatch])
    console.log("parties:" , parties)
    const userParties = parties.filter(
        (party, index) => party.host ===email
    )
    return(
        <div classNames="user">
            <h1>{email}</h1>
            <div classNames="parties">
                    {userParties && userParties.length>0 && userParties.map((party)=>(
                        
                        <PartyDetails key={party._id} party={party}/>
                    ))}
                </div>
        </div>
    )
}

export default UserDetails