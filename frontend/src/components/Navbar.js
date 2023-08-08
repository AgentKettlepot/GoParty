import {Link} from 'react-router-dom'
import { useLogout } from '../hooks/useLogout'
import { useAuthContext } from '../hooks/useAuthContext'

const Navbar = ()=>{

    const { logout } = useLogout()
    const { user } = useAuthContext()
  
    const handleClick = () => {
      logout()
    }

    return (
        <header>
          <div className="container">
            <Link to="/">
              <div className="title-pic">
                <img src="LOGO.png" height='60'/>
                <h1>GoParty!</h1>    
              </div>
            
            </Link>
          
            <nav>
                <Link className="navbar-link" to="/about">About Us!</Link>
                <br></br>
              {user && (
                <div>
                  <Link className="navbar-link" to={"/user/"+user.email}>{user.email}</Link>
               
                  <button onClick={handleClick}>Log out</button>
                </div>
              )}
              {!user && (
                <div>
                  <Link className="navbar-link" to="/login">Login</Link>
                  <Link className="navbar-link" to="/signup">Signup</Link>
                </div>
              )}
            </nav>
          </div>
        </header>
      )
    }

export default Navbar