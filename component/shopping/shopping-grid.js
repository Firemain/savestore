import ShoppingItem from "./shopping-item";
import classes from "./shopping-grid.module.css";

export default function ShoppingGrid({items}) {
    return (
        <ul className={classes.meals}>
            {items.map(item => <li key={item.id}>

                <ShoppingItem {...item}>

                </ShoppingItem>

            </li>)}
        </ul>
    )
}