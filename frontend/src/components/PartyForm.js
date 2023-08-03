import { useState } from "react"
import { usePartiesContext } from "../hooks/usePartiesContext"
import { useAuthContext } from '../hooks/useAuthContext'
import FileBase64 from 'react-file-base64';
import { ReactSearchAutocomplete } from 'react-search-autocomplete'


const PartyForm = () => {
    const college_list = require('./colleges.json')
    
    const { user } = useAuthContext()
    const host = user.email
    const { dispatch } = usePartiesContext()

    const [title, setTitle] = useState('')
    const [school, setSchool] = useState('')
    const [date, setDate] = useState('')
    const [max_occupancy, setMaxOccupancy] = useState(0)
    const [address, setAddress] = useState('')
    const [theme, setTheme] = useState('')
    const [description, setDescription] = useState('')
    const [error, setError] = useState(null)
    const [picture, setPicture] = useState('')
    const [emptyFields, setemptyFields] = useState([])


    const handleSubmit =async (e) =>{
        e.preventDefault()
        //console.log(picture)
        const party = {title, school, date, max_occupancy, address, theme, host, description, picture}
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
            setAddress('')
            setTheme('')
            setError(null)
            setemptyFields([])
            setDescription('')
            console.log('New Party Added!', json)
            dispatch({type: 'CREATE_PARTY', payload: json})
        }
    }

    const handleOnSearch = (string, results) => {
        // onSearch will have as the first callback parameter
        // the string searched and for the second the results.
        console.log(string, results)
      }
    
      const handleOnHover = (result) => {
        // the item hovered
        console.log(result)
      }
    
      const handleOnSelect = (item) => {
        // the item selected
        console.log(item)
        setSchool(item.name)
      }
    
      const handleOnFocus = () => {
        console.log('Focused')
      }

      const formatResult = (item) => {
        return (
          <>
         
            <span style={{ display: 'block', textAlign: 'left' }}>{item.name}</span>
          </>
        )
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
           
        <div style={{ marginBottom: 20 }}>
          <ReactSearchAutocomplete
            items={college_list}
            onSearch={handleOnSearch}
            onHover={handleOnHover}
            onSelect={handleOnSelect}
            onFocus={handleOnFocus}
            autoFocus
            formatResult={formatResult}
            classnames={emptyFields.includes('school') ? 'error' : ''}
          />
        </div>


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

            <label>Party Address: </label>
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

            <label>Party Description/Contact -
            Add any other forms of contact (Instagram, Snapchat) if you prefer them! 
            </label>
            
            <textarea 
            rows="5" cols="50"
                onChange={(e)=> setDescription(e.target.value)}
                value={description}
                classnames={emptyFields.includes('description') ? 'error' : ''}>
            
            </textarea>
            <label>Add a Pic!</label>
            <FileBase64
          type="file"
          multiple={false}
          onDone={({ base64 }) =>
            setPicture(base64)
    }
        />
            <button>Add Party</button>
            {error && <div classnames="error">{error}</div>}
        </form>

    )
}

export default PartyForm