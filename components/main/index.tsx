import mainStyles from "./main.module.css";
import {FC} from "react";
import {PlayingListType} from "../../pages/app";

interface IProps {
    curPlaying:PlayingListType
    musicNameList:Array<string>
    onMusicClick:(musicName:string)=>void
}
export const MainContainer:FC<IProps> = (props) => {
    return <div className={mainStyles.mainContainer}>
        {
            props.musicNameList.map(name => {
                return <div className={`${mainStyles.musicItemContainer} ${props.curPlaying.find(item => item.audioPlaying && item.audioName === name) ? mainStyles.active:''}`} key={name} onClick={props.onMusicClick.bind(null,name)}>{name}</div>
            })
        }
    </div>
}