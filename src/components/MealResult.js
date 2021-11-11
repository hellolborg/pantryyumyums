import styles from '../styles/MealResult.module.css';

function MealResult(props) {
    return(
        <li className={styles.recipeCard}>
                <a href={props.meal.sourceURL} target="_blank">
                <img className={styles.recipeImage} alt="Mushroom Soup" src={props.meal.thumb}/>
            </a> 
            <div className={styles.galleryBG}>
                <h3 className={styles.recipeName}>{props.meal.name}</h3>
            </div>
        </li>
    )
}

export default MealResult;