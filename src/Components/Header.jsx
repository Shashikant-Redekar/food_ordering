import { Link } from 'react-router-dom';
import logo from '../logo/sukoonsagarlogo-1.png';
import name from '../logo/SukunSagarLogo2.png';
import '../styling/nameandlogo.scss';

function NameAndLogo ({ showCartButton = true, showLoginButton = false, showSignupButton = false, showLogOut = false }) {
    return(
        <div className={`nameandlogo ${showCartButton||showLoginButton||showSignupButton||showLogOut ? 'with-cart' : 'no-cart'}`}>
            <img src={logo} className="App-logo" alt="logo" />
            <div >
                <img src={name} className="App-name" alt="name" />
            </div>
            { showCartButton && (
                <Link to="/cart" className='link'>
                    <button className='cart'>Cart</button>
                </Link>
            )}
            {showLoginButton && (
                <Link to="/login" className='link'>
                    <button className='cart'>Login</button>
                </Link>
            )}
            {showSignupButton && (
                <Link to="/signup" className='link'>
                    <button className='cart'>Sign Up</button>
                </Link>
            )}
            {showLogOut && (
                <Link to="#" className='link'>
                    <button className='cart' onClick={() => handleLogOut()}>Log Out</button>
                </Link>
            )}
        </div>
    );
}

export default NameAndLogo;