import mainStyles from "./main.module.css";
import {FC} from "react";
interface IProps {
    musicNameList:Array<string>
    onMusicClick:(musicName:string)=>void
}
export const MainContainer:FC<IProps> = (props) => {
    return <div className={mainStyles.mainContainer}>
        {
            props.musicNameList.map(name => {
                return <div className={mainStyles.musicItemContainer} key={name} onClick={props.onMusicClick.bind(null,name)}>{name}</div>
            })
        }
    </div>
}