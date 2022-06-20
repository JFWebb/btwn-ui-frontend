import {login, logout} from '../../services/firebase';
import {Link} from 'react-router-dom';

const Header = (props) => {
    return (
        <nav className = 'nav'>
            <Link to ="/">
                <div> BTWN U+I</div>
            </Link>

            <ul>
                <li onClick={login}>
                    Login
                </li>
                <li onClick={logout}>
                    Login
                </li>
            </ul>
        </nav>
    )
}; 
export default Header; 