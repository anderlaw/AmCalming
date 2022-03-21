import {useEffect, useState} from "react";

export default () => {
    const [playContext,setPlayContext] = useState<any>()
    return <button style={{ margin:'30px' }} onClick={() => {
        const newAudioEle: HTMLAudioElement = document.createElement('audio');
        newAudioEle.controls = false
        newAudioEle.loop = true
        newAudioEle.src = '/Afternoon.mp3'
        newAudioEle.volume = 0.4
        // const newAudioCtx = new AudioContext();
        // const gainNode = newAudioCtx.createGain();

        // const finish = newAudioCtx.destination;
        // newAudioCtx.createMediaElementSource(newAudioEle).connect(gainNode)
        // gainNode.connect(newAudioCtx.destination)
        //音量
        // gainNode.gain.value = 2
        //insert into body
        // document.body.appendChild(newAudioEle)
        newAudioEle.play()
        // setPlayContext({
        //     context:newAudioCtx,
        //     gainNode:gainNode,
        //     audioEle:newAudioEle
        // })
        setInterval(()=>{
            console.log('当前播放位置：',newAudioEle.currentTime)
            console.log('是否结束播放：',newAudioEle.ended)
            console.log('是否暂停播放：',newAudioEle.paused)
            console.log('音轨声音：',newAudioEle.volume)
        },3000)
    }}>
        play
    </button>
}