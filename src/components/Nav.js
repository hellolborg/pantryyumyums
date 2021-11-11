import styles from '../styles/Nav.module.css';
import logo from '../assets/pantry-yy-logo.png' 

function Nav() {
    return (
        <nav>
            <ul>
                <li><a href='./about'>About</a></li>
                <li><a href="./contact">Contact</a></li>
            </ul>
            <a href="./"><img src={logo} className={styles.logo} alt={"logo"}/></a>
        </nav>
    )
}

export default Nav;