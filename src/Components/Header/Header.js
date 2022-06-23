import {login, logout} from '../../services/firebase';
import {Link} from 'react-router-dom';
import './Header.styles.css'; 


const Header = (props) => {


    return (
        <nav className = 'nav-top'>
            <Link to ="/">
                <div className='title'> BTWN U+I</div>
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