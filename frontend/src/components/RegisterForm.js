import { useState } from "react"
import { useRegisterContext } from "../hooks/useRegisterContext"

const RegisterForm = () => {
    const { dispatch } = useRegisterContext()

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [email, setEmail] = useState('')

    const [error, setError] = useState(null)
    const [emptyFields, setemptyFields] = useState([])


    const handleSubmit =async (e) =>{
        e.preventDefault()
        const user = {username, password, email}

        const response = await fetch('/auth/register', {
            method: 'POST',
            body: JSON.stringify(user),
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
            setEmail('')
            setUsername('')
            setPassword('')
            
            setError(null)
            setemptyFields([])
            console.log('New User Created!!', json)
            dispatch({type: 'CREATE_USER', payload: json})
        }
    }

    return (
        <form className="create" onSubmit={handleSubmit}>
            <h3>Create a User!</h3>
            <label>Username: </label>
            <input type="text"
            onChange={(e)=> setUsername(e.target.value)}
            value={username}
            className={emptyFields.includes('username') ? 'error' : ''}
            />

            <label>Email: </label>
            <input type="text" 
            onChange={(e)=> setEmail(e.target.value)}
            value={email}
            className={emptyFields.includes('email') ? 'error' : ''}
            />

            <label>Password </label>
            <input type="text" 
                onChange={(e)=> setPassword(e.target.value)}
                value={password}
                className={emptyFields.includes('password') ? 'error' : ''}
            />
            <button>Add User</button>
            {error && <div className="error">{error}</div>}
        </form>
    )
}

export default RegisterForm