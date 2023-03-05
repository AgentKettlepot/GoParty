import { useState } from "react"

const PartyForm = () => {
    const [title, setTitle] = useState('')
    const [school, setSchool] = useState('')
    const [date, setDate] = useState('')
    const [max_occupancy, setMaxOccupancy] = useState(0)
    const [current_occupancy, setCurrentOccupancy] = useState(0)
    const [address, setAddress] = useState('')
    const [theme, setTheme] = useState('')
    const [host, setHost] = useState('')

    const [error, setError] = useState(null)

    const handleSubmit =async (e) =>{
        e.preventDefault()
        const party = {title, school, date, max_occupancy, current_occupancy, address, theme, host}

        const response = await fetch('/goParty', {
            method: 'POST',
            body: JSON.stringify(party),
            headers:{
                'Content-Type': 'application/json'
            }
        })
        const json = await response.json()

        if (!response.ok){
            setError(json.error)
        }
        if (response.ok){
            setTitle('')
            setSchool('')
            setDate('')
            setMaxOccupancy(0)
            setCurrentOccupancy(0)
            setAddress('')
            setTheme('')
            setHost('')
            setError(null)
            console.log('New Party Added!', json)
        }
    }

    return (
        <form className="create" onSubmit={handleSubmit}>
            <h3>Add a Party!</h3>
            <label>Party Name: </label>
            <input type="text"
            onChange={(e)=> setTitle(e.target.value)}
            value={title}
            />

            <label>School Name: </label>
            <input type="text" 
            onChange={(e)=> setSchool(e.target.value)}
            value={school}
            />

            <label>Party Date: </label>
            <input type="date" 
                onChange={(e)=> setDate(e.target.value)}
                value={date}
            />

            <label>Max Occupancy: </label>
            <input type="number" 
                onChange={(e)=> setMaxOccupancy(e.target.value)}
                value={max_occupancy}
            />

            <label>Current Occupancy: </label>
            <input type="number" 
                onChange={(e)=> setCurrentOccupancy(e.target.value)}
                value={current_occupancy}
            />

            <label>Address </label>
            <input type="text" 
                onChange={(e)=> setAddress(e.target.value)}
                value={address}
            />

            <label>Party Theme: </label>
            <input type="text" 
                onChange={(e)=> setTheme(e.target.value)}
                value={theme}
            />

            <label>Host: </label>
            <input type="text" 
                onChange={(e)=> setHost(e.target.value)}
                value={host}
            />

            <button>Add Party</button>
            {error && <div className="error">{error}</div>}
        </form>

    )
}

export default PartyForm