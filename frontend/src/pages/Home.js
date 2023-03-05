import { useEffect, useState } from "react"

import PartyDetails from '../components/PartyDetails'
import PartyForm from '../components/PartyForm'
const Home= () =>{

    const [parties, setParties] = useState(null)
    useEffect(()=>{
        const fetchParties= async()=>{
            const response = await fetch('/goParty')
            const json = await response.json()

            if (response.ok){
                setParties(json)
            }
        }

        fetchParties()
    }, [])

    return(
        <div className="home">
            <div classNames="parties">
                {parties && parties.map((party)=>(
                    <PartyDetails key={party._id} party={party}/>
                ))}
            </div>
            <PartyForm />
        </div>
    )
}

export default Home