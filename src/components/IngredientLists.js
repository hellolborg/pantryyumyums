import styles from '../styles/IngredientLists.module.css';

function IngredientList(props) {
    return (
        <div>
            <h5 className={styles.ingredientTypeHeader}>{props.ingredientType}</h5>
            {props.ingredients.map((ingredientType) => {
                return (
                    <div className={styles.ingredientsListColumn}>
                    <label className={styles.ingredientsListItems} key={ingredientType} htmlFor={ingredientType}>
                        <input
                            type="checkbox"
                            name={ingredientType}
                            checked={props.ingredientSelected.has(ingredientType)}
                            onChange={props.handleClick}
                        />
                        {ingredientType}
                    </label>
                    </div>
                )
            })}
        </div>
    );
}

export default IngredientList;
