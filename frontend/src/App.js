import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom'
import { useAuthContext } from './hooks/useAuthContext'
import Home from './pages/Home'
import Navbar from './components/Navbar';
import Login from './pages/Login'
import Signup from './pages/SignUp'
import UserDetails from './pages/User'
import About from './pages/About'
import CollegeSearch from './pages/CollegeSearch'

import PartyWebsite from './pages/PartyWebsite'
function App() {
  const { user } = useAuthContext()
  return (
    <div className="App">
      <BrowserRouter>
      <Navbar />
        <div className="pages">
        <Routes>
            <Route 
              path="/" 
              element={user ? <Home /> : <About />} 
            />
            <Route 
              path="/login" 
              element={!user ? <Login /> : <Navigate to="/" />} 
            />
            <Route 
              path="/signup" 
              element={!user ? <Signup /> : <Navigate to="/" />} 
            />

            <Route 
              path='/user/:user' 
              element={!user ? <Navigate to="/" />: <UserDetails key={user.email} user={user} />} 
            />
            <Route 
              path="/party/:id"
              element={!user ? <Navigate to="/" />: <PartyWebsite/>}      
            />
            <Route 
              path="/college/:college"
              element={!user ? <Navigate to="/" />: <CollegeSearch/>}      
            />
            <Route 
              path='/about' 
              element={<About />} 
            />

          </Routes>
        </div>
      
      </BrowserRouter>
    </div>
  );
}

export default App;