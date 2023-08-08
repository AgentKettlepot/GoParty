import { useEffect } from "react"
import {useParams} from 'react-router-dom';
import { usePartiesContext } from "../hooks/usePartiesContext"
import PartyDetails from '../components/PartyDetails'

const CollegeSearch = () =>{
    const collegename = useParams()
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
    const collegeParties = parties.filter(
       
        (party, index) => party.school ===collegename.college
    )
    return(
        <div classNames="user">
            <h1>{collegename.college} Parties</h1>
            <div classNames="parties">
                {collegeParties && collegeParties.length>0 && collegeParties.map((party)=>(
                    <PartyDetails key={party._id} party={party}/>
                ))}
            </div>
        </div>
    )
}

export default CollegeSearch