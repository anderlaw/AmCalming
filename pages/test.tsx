import {useEffect} from "react";

export default () => {
    return <button onClick={() => {
        const newAudioEle: HTMLAudioElement = document.createElement('audio');
        newAudioEle.controls = false
        newAudioEle.loop = true
        newAudioEle.src = '/Afternoon.mp3'

        const newAudioCtx = new AudioContext();
        const gainNode = newAudioCtx.createGain();

        newAudioCtx.createMediaElementSource(newAudioEle).connect(gainNode).connect(newAudioCtx.destination)

        //音量
        gainNode.gain.value = 1
        newAudioEle.play()
    }}>
        play
    </button>
}