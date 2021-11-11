import styles from '../styles/Header.module.css';

function Header() {
    return (
        <header className="headerImage">
            <h1 className={styles.heroText}>Cook a meal with the items in your pantry!</h1>
        </header>
    )
}

export default Header;