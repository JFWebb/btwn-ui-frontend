import {login, logout} from '../../services/firebase';
import {Link} from 'react-router-dom';



const Header = (props) => {


    return (
        <nav className = 'nav'>
            <Link to ="/">
                <div> BTWN U+I</div>
            </Link>

            <ul>
                {
                    props.user
                    ? <li onClick={logout}>Logout</li>
                    : <li onClick={login}>Login</li>
                }


                
            </ul>
        </nav>
    )
}; 
export default Header; 