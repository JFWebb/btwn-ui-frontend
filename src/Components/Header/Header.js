import { login, logout } from '../../services/firebase';
import { Link } from 'react-router-dom';
import './Header.styles.css';


const Header = (props) => {


    return (
        <nav className='nav-top'>
            <div className='title'> BTWN U+I</div>
            <ul>
                {
                    props.user
                        ? <li className='authent' onClick={logout}>Logout</li>
                        : <li className='authent' onClick={login}>Login</li>
                }



            </ul>
        </nav>
    )
};
export default Header; 