import {Link} from 'react-router-dom'
import './Nav.css'

export default function Nav(props){
    return (
      <div className="Nav">
          <Link to="/">
            Home
          </Link>
    <Link to="/pokemon-search" onClick={()=> props.setCurrentPage('Pokemon Search')}>Pokemon Search</Link> 
        
    <br />
    <a href="Favorites">Favorites</a>


    </div>
    )
}