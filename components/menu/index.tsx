//left menu
import menuStyles from "./menu.module.css";
import {FC} from "react";
import {CN} from "../../utils/audios";
interface IProps {
    categoryNames:Array<string>
    onCategoryClick:(categoryName:string)=>void
}
export const LeftMenu:FC<IProps> = (props) => {
    return <div className={menuStyles.leftMenuContainer}>
        {
            props.categoryNames.map(itemName => {
                return <div key={itemName} onClick={props.onCategoryClick.bind(null,itemName)} className={menuStyles.menuItem}>{CN[`tag.${itemName}`]}</div>
            })
        }
    </div>
}