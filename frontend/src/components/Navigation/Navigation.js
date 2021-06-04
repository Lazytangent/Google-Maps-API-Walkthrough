import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';

import styles from './Navigation.module.css';
import ProfileButton from './ProfileButton';
import LoginFormModal from '../LoginFormModal';

const Navigation = ({ isLoaded }) => {
  const sessionUser = useSelector((state) => state.session.user);

  let sessionLinks;

  if (sessionUser) {
    sessionLinks = (
      <ProfileButton user={sessionUser} />
    );
  } else {
    sessionLinks = (
      <>
        <LoginFormModal />
        <NavLink to="/signup" className={styles.navLink}>Sign Up</NavLink>
      </>
    );
  }

  return (
    <nav className={styles.nav}>
      <ul className={styles.ul}>
        <li className={styles.li}>
          <NavLink exact to="/" className={styles.navLink}>Home</NavLink>
          {isLoaded && sessionLinks}
          <NavLink to="/maps" className={styles.navLink}>Maps</NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default Navigation;
