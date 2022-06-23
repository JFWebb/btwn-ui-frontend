import { Link } from 'react-router-dom';
import './Footer.styles.css';

function Footer() {
    return (
        <div className='main-footer'>
            <div className='container'>
                {/* Column 1 */}
                <div className='item'>
                    <div className='footer-left'>
                        <h4>Julie Webb</h4>
                        <a href='https://www.linkedin.com/in/juliefwebb/' target='_blank' rel='noreferrer'>LinkedIn</a>< br />
                        <a href='https://github.com/JFWebb' target='_blank' rel='noreferrer'>Github</a>
                    </div>
                </div>
                {/* Column 2 */}
                <div className='item'>
                    <div className='footer-center'>
                        <h4>Jacky Cheng</h4>
                        <a href='https://www.linkedin.com/in/jackychengjc/' target='_blank' rel='noreferrer'>LinkedIn</a>< br />
                        <a href='https://github.com/jcheng1022' target='_blank' rel='noreferrer'>Github</a>
                    </div>
                </div>
                {/* Column 3 */}
                <div className='item'>
                    <div className='footer-right'>
                        <h4>Annie Ma</h4>
                        <a href='https://www.linkedin.com/in/anniemacode/' target='_blank' rel='noreferrer'>LinkedIn</a>< br />
                        <a href='https://github.com/annnieeeema' target='_blank' rel='noreferrer'>Github</a>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Footer; 