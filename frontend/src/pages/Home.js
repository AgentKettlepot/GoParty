import { useEffect, useState } from "react"

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
                    <p key={party._id}>{party.title}</p>
                ))}
            </div>
        </div>
    )
}

export default Home