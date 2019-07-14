import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { auth } from '../../firebase/firebase.utils';
import CartIcon from '../cart-icon';
import CartDropdown from '../cart-dropdown';

import { ReactComponent as Logo } from '../../assets/crown.svg';
import './styles.scss';

const Header = ({ currentUser, showCartDropdown }) => (
  <div className="header">
    <Link to="/" className="logo-container">
      <Logo className="logo" />
    </Link>
    <div className="options">
      <Link to="/shop" className="option">
        SHOP
      </Link>
      <Link to="/contact" className="option">
        CONTACT
      </Link>
      {currentUser ? (
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <div className="option" onClick={() => auth.signOut()}>
            SIGN OUT
          </div>
          <div>Hi, {currentUser.displayName}</div>
        </div>
      ) : (
        <Link to="/signin" className="option">
          SIGN IN
        </Link>
      )}
      <CartIcon />
    </div>
    {showCartDropdown && <CartDropdown />}
  </div>
);

const mapStateToProps = ({ user: { currentUser }, cart: { show } }) => ({
  currentUser,
  showCartDropdown: show,
});

export default connect(mapStateToProps)(Header);