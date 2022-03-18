import type {NextPage} from 'next'
import {Header, TabType} from '../components/header';
import {LeftMenu} from "../components/menu";
import {MainContainer} from "../components/main";
import {Player} from "../components/player";
import {useMemo, useState} from "react";
import playerStyles from "../components/player/index.module.css";

export type PlayingListType = Array<{
    audioEle: HTMLAudioElement,
    audioPlaying: boolean,
    audioName: string,
    volume: number
}>
const defaultVolumeValue = 0.6
const audioBaseUrl = 'https://full-audio-resource-1256270265.cos.ap-shanghai.myqcloud.com/'
const Home: NextPage = () => {

    return (
        <div className="app-bg" style={{color: '#3d3b3d'}}>
            <button onClick={()=>{
                const newAudioEle = document.createElement('audio');
                newAudioEle.controls = false
                newAudioEle.src = 'https://audio-resource-1256270265.cos.ap-shanghai.myqcloud.com/audio/%E5%B0%8F%E9%B8%A1.mp3'
                newAudioEle.loop = true;

                newAudioEle.play()
                // newAudioEle.volume = defaultVolumeValue
            }}>点击播放旧音频</button>
            <button onClick={()=>{
                const newAudioEle = document.createElement('audio');
                newAudioEle.controls = false
                newAudioEle.src = audioBaseUrl +  'Birds.ogg'
                newAudioEle.loop = true;
                newAudioEle.play()
                // newAudioEle.volume = defaultVolumeValue
            }}>点击播放新音频</button>
        </div>
    )
}

export default Home
