import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';

import styles from './ProfileButton.module.css';
import { logout } from '../../store/session';

const ProfileButton = ({ user }) => {
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);

  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = () => {
      setShowMenu(false);
    };

    document.addEventListener('click', closeMenu);
    return () => document.removeEventListener('click', closeMenu);
  }, [showMenu]);

  const logoutHandler = (e) => {
    e.preventDefault();
    dispatch(logout());
  };

  return (
    <>
      <button className={styles.button} onClick={openMenu}>
        <i className="fas fa-user-circle"></i>
      </button>
      {showMenu && (
        <ul className={styles.profileDropdown}>
          <li>{user.username}</li>
          <li>{user.email}</li>
          <li>
            <button onClick={logoutHandler} className={styles.logoutButton}>Log Out</button>
          </li>
        </ul>
      )}
    </>
  );
};

export default ProfileButton;
