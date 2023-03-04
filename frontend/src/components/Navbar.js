import {Link} from 'react-router-dom'

const Navbar = ()=>{

    return (
        <header>
            <div className="conainer">
            <Link to ="/">
                <h1>GoParty!</h1>
            </Link>
            </div>
        </header>
    )
}

export default Navbar