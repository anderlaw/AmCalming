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
        <audio src={'https://full-audio-resource-1256270265.cos.ap-shanghai.myqcloud.com/Birds.mp3'} controls></audio>
        <br/>
        <audio src={'https://audio-resource-1256270265.cos.ap-shanghai.myqcloud.com/audio/%E5%B0%8F%E9%B8%A1.mp3'} controls></audio>
        {
            props.musicNameList.map(name => {
                return <div className={`${mainStyles.musicItemContainer} ${props.curPlaying.find(item => item.audioPlaying && item.audioName === name) ? mainStyles.active:''}`} key={name} onClick={props.onMusicClick.bind(null,name)}>{name}</div>
            })
        }
    </div>
}