import { useEffect } from "react"
import { usePartiesContext } from "../hooks/usePartiesContext"

import PartyDetails from '../components/PartyDetails'
import PartyForm from '../components/PartyForm'
import Fade from 'react-reveal/Fade';

const Home= () =>{
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

    return(
        <div className="home">
            <Fade left>
            <div classNames="parties">
                
                {parties && parties.length>0 && parties.map((party)=>(
                    <PartyDetails key={party._id} party={party}/>
                ))}
            </div>
            </Fade>
            <PartyForm />
        </div>
    )
}

export default Home