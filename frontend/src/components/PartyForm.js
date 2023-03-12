import { useState } from "react"
import { usePartiesContext } from "../hooks/usePartiesContext"
import { useAuthContext } from '../hooks/useAuthContext'
const PartyForm = () => {
    const { user } = useAuthContext()
    const host = user.email

    const { dispatch } = usePartiesContext()

    const [title, setTitle] = useState('')
    const [school, setSchool] = useState('')
    const [date, setDate] = useState('')
    const [max_occupancy, setMaxOccupancy] = useState(0)
    const [current_occupancy, setCurrentOccupancy] = useState(0)
    const [address, setAddress] = useState('')
    const [theme, setTheme] = useState('')

    const [error, setError] = useState(null)
    const [emptyFields, setemptyFields] = useState([])


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
            setemptyFields(json.emptyFields)
        }
        if (response.ok){
            setTitle('')
            setSchool('')
            setDate('')
            setMaxOccupancy(0)
            setCurrentOccupancy(0)
            setAddress('')
            setTheme('')
            setError(null)
            setemptyFields([])
            console.log('New Party Added!', json)
            dispatch({type: 'CREATE_PARTY', payload: json})
        }
    }

    return (
        <form classnames="create" onSubmit={handleSubmit}>
            <h3>Add a Party!</h3>
            <label>Party Name: </label>
            <input type="text"
            onChange={(e)=> setTitle(e.target.value)}
            value={title}
            className={emptyFields.includes('title') ? 'error' : ''}
            />

            <label>School Name: </label>
            <input type="text" 
            onChange={(e)=> setSchool(e.target.value)}
            value={school}
            classnames={emptyFields.includes('school') ? 'error' : ''}
            />

            <label>Party Date: </label>
            <input type="date" 
                onChange={(e)=> setDate(e.target.value)}
                value={date}
                classnames={emptyFields.includes('date') ? 'error' : ''}
            />

            <label>Max Occupancy: </label>
            <input type="number" 
                onChange={(e)=> setMaxOccupancy(e.target.value)}
                value={max_occupancy}
                classnames={emptyFields.includes('max_occupancy') ? 'error' : ''}
            />

            <label>Current Occupancy: </label>
            <input type="number" 
                onChange={(e)=> setCurrentOccupancy(e.target.value)}
                value={current_occupancy}
                classnames={emptyFields.includes('current_occupancy') ? 'error' : ''}
            />

            <label>Address </label>
            <input type="text" 
                onChange={(e)=> setAddress(e.target.value)}
                value={address}
                classnames={emptyFields.includes('address') ? 'error' : ''}
            />

            <label>Party Theme: </label>
            <input type="text" 
                onChange={(e)=> setTheme(e.target.value)}
                value={theme}
                classnames={emptyFields.includes('theme') ? 'error' : ''}
            />


            <button>Add Party</button>
            {error && <div classnames="error">{error}</div>}
        </form>

    )
}

export default PartyForm