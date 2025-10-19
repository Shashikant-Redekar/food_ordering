import { Link } from 'react-router-dom';
import logo from '../logo/sukoonsagarlogo-1.png';
import name from '../logo/SukunSagarLogo2.png';
import '../styling/nameandlogo.scss';

function NameAndLogo ({ showCartButton = true }) {
    return(
        <div className={`nameandlogo ${showCartButton ? 'with-cart' : 'no-cart'}`}>
            <img src={logo} className="App-logo" alt="logo" />
            <div >
                <img src={name} className="App-name" alt="name" />
            </div>
            { showCartButton && (
                <Link to="/cart" className='link'>
                    <button className='cart'>Cart</button>
                </Link>
            )}
        </div>
    );
}

export default NameAndLogo;