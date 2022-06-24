import { Link } from 'react-router-dom';
import './Footer.styles.css';

function Footer() {
    return (
        <div className='main-footer'>
            <div className='container'>
                {/* Column 1 */}
                <div className='item'>
                    <div className='footer-left'>
                        <p>Julie Webb | <a href='https://www.linkedin.com/in/juliefwebb/' target='_blank' rel='noreferrer'>LinkedIn</a> | <a href='https://github.com/JFWebb' target='_blank' rel='noreferrer'>Github</a></p>
                    </div>
                </div>
                {/* Column 2 */}
                <div className='item'>
                    <div className='footer-center'>
                        <p>Jacky Cheng | <a href='https://www.linkedin.com/in/jackychengjc/' target='_blank' rel='noreferrer'>LinkedIn</a> | <a href='https://github.com/jcheng1022' target='_blank' rel='noreferrer'>Github</a></p>
                    </div>
                </div>
                {/* Column 3 */}
                <div className='item'>
                    <div className='footer-right'>
                        <p>Annie Ma | <a href='https://www.linkedin.com/in/anniemacode/' target='_blank' rel='noreferrer'>LinkedIn</a> | <a href='https://github.com/annnieeeema' target='_blank' rel='noreferrer'>Github</a></p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Footer; 