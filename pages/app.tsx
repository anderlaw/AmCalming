import type {NextPage} from 'next'
import {Header, TabType} from '../components/header';
import {LeftMenu} from "../components/menu";
import {MainContainer} from "../components/main";
import {Player} from "../components/player";
import {useMemo, useState} from "react";
import playerStyles from "../components/player/index.module.css";
//utils
import {audioBaseUrl, categories,CN} from "../utils/audios";
import {MAX_VOLUME_VALUE,DEFAULT_VOLUME_VALUE,MAX_GAIN_VALUE,getGainValueFromVolume} from "../utils/volume";

export type PlayingListType = Array<{
    audioEle: HTMLAudioElement,
    gainNode:GainNode,
    audioPlaying: boolean,
    audioName: string,
    volume: number
}>

const Home: NextPage = () => {
    const [curTab, setCurTab] = useState<TabType>('资源库')
    const [curCategory, setCurCategory] = useState<string>('')
    const [showPlayInfoDialog, setShowPlayInfoDialog] = useState<boolean>(false)
    const [playingMusicList, setPlayingMusicList] = useState<PlayingListType>([])
    const [loadingList, setLoadingList] = useState<Array<string>>([])
    const playStatus = useMemo(() => playingMusicList.filter(item => item.audioPlaying).length > 0, [playingMusicList])
    const switchPlayingStatus = (status: boolean) => {
        setPlayingMusicList(_prev => {
            return _prev.map(_item => {
                const item = Object.assign({}, _item)
                item.audioPlaying = status;
                if (status) {
                    item.audioEle.play()
                } else {
                    item.audioEle.pause()
                }
                return item;
            })
        })
    }
    const handleMusicItemClicked = (name: string) => {
        const pickFromSelectList = playingMusicList.find(item => item.audioName === name)
        if (pickFromSelectList) {
            if (playStatus) {
                //播放中:暂停并清掉
                pickFromSelectList.audioEle.pause()
                pickFromSelectList.audioPlaying = false
                setPlayingMusicList(_prev => {
                    return _prev.filter((_, index) => index !== _prev.indexOf(pickFromSelectList))
                })
            } else {
                //暂停了,需要恢复播放
                setPlayingMusicList(_prev => {
                    return _prev.map(_item => {
                        const item = Object.assign({}, _item)
                        if (!item.audioPlaying) {
                            item.audioPlaying = true;
                            item.audioEle.play()
                        }
                        return item
                    })
                })
            }
        } else {
            console.log('新增播放--')
            //新增播
            const newAudioEle = new Audio(audioBaseUrl + name + '.mp3')
            newAudioEle.crossOrigin = 'anonymous'
            newAudioEle.controls = false
            newAudioEle.loop = true

            const newAudioCtx = new AudioContext();
            const gainNode = newAudioCtx.createGain();

            newAudioCtx.createMediaElementSource(newAudioEle).connect(gainNode).connect(newAudioCtx.destination)
            const newPlayItem = {
                audioEle: newAudioEle,
                gainNode:gainNode,
                audioPlaying: true,
                audioName: name,
                volume: DEFAULT_VOLUME_VALUE
            }
            //音量
            gainNode.gain.value = getGainValueFromVolume(newPlayItem.volume)
            //添加`加载中`记录
            setLoadingList(_prev => {
                return _prev.concat(name)
            })
            newPlayItem.audioEle.oncanplay = () => {
                //删除`加载中`记录
                setLoadingList(_prev => {
                    return _prev.filter(_name => _name !== name)
                })
            }
            //caution: play() must invoke here,cant put it on other place, or it can't trigger playing in mobile devices
            newPlayItem.audioEle.play()
            setPlayingMusicList(_prev => {
                return _prev.map(_item => {
                    const item = Object.assign({}, _item)
                    if (!item.audioPlaying) {
                        item.audioPlaying = true;
                        item.audioEle.play()
                    }
                    return item
                }).concat([newPlayItem])
            })
        }
    }
    //inner components
    const Player = () => {
        return <div onClick={() => setShowPlayInfoDialog(true)} className={playerStyles.playerContainer}>
            <div className={playerStyles.playButton}>
                {
                    loadingList.length > 0 ? <span>---</span>  : playStatus ?
                        <svg onClick={(e) => {
                            e.stopPropagation()
                            switchPlayingStatus(false)
                        }} width="34" height="34" viewBox="0 0 34 34"
                             fill="none"
                             xmlns="http://www.w3.org/2000/svg">
                            <circle cx="17" cy="17" r="16.5" stroke="white"/>
                            <rect x="12" y="9" width="3" height="16" fill="white"/>
                            <rect x="19" y="9" width="3" height="16" fill="white"/>
                        </svg> :
                        <svg onClick={(e) => {
                            e.stopPropagation()
                            switchPlayingStatus(true)
                        }} width="34" height="34" viewBox="0 0 34 34"
                             fill="none"
                             xmlns="http://www.w3.org/2000/svg">
                            <circle cx="17" cy="17" r="16.5" stroke="white"/>
                            <path d="M28.057 17.1144L11.5076 26.5547L11.6068 7.50236L28.057 17.1144Z" fill="white"/>
                        </svg>
                }
            </div>
            <div className={playerStyles.intro}>
                当前:{playingMusicList.length}个项目
            </div>
            <div className={playerStyles.arrowUp}>
                <svg width="24" height="13" viewBox="0 0 24 13" fill="none"
                     xmlns="http://www.w3.org/2000/svg">
                    <path d="M1 12L12 1L23 12" stroke="white"/>
                </svg>
            </div>
        </div>
    }
    return (
        <div className="app-bg" style={{color: '#3d3b3d'}}>
            <Header curTab={curTab} onTabChange={newTab => setCurTab(newTab)}/>
            <LeftMenu categoryNames={Object.keys(categories)} onCategoryClick={(name) => setCurCategory(name)}/>
            <Player/>
            <div
                style={{
                    position: 'fixed',
                    color: '#fff',
                    transition: 'top .3s ease-in-out',
                    top: showPlayInfoDialog ? '10px' : '100vh',
                    left: 0,
                    right: 0,
                    paddingBottom: '16px',
                    bottom: 0,
                    backgroundColor: 'rgba(21,22,22,0.69)',
                    backdropFilter: 'blur(5px)',
                }}>
                <div style={{height: '50px', lineHeight: '50px', padding: "0 20px", textAlign: 'right'}}>
                    <span onClick={
                        () => setShowPlayInfoDialog(false)
                    } style={{
                        color: '#FFF',
                        padding: "6px"
                    }}>X</span>
                </div>
                <div style={{height: 'calc(100% - 50px)', padding: "0 20px", overflowY: 'auto'}}>
                    {
                        playingMusicList.map(item => {
                            return <div key={item.audioName} style={{marginBottom: '10px'}}>
                                <div style={{fontSize: '15px'}}><span>{item.audioName}</span></div>
                                <div style={{display: 'flex', alignItems: 'center'}}>
                                    <input style={{flexGrow: 1}} defaultValue={item.volume} min={0} max={MAX_VOLUME_VALUE}
                                           onChange={e => {
                                               setPlayingMusicList(_prev => {
                                                   return _prev.map(_innerItem => {
                                                       //改变音量

                                                       const innerItem = Object.assign({}, _innerItem)
                                                       if (_innerItem === item) {
                                                           innerItem.volume = (e.target as any).value;
                                                           innerItem.gainNode.gain.value = getGainValueFromVolume(innerItem.volume)
                                                       }
                                                       return innerItem;
                                                   })
                                               })
                                           }} type={'range'}/>
                                    <div onClick={() => {
                                        setPlayingMusicList(_prev => {
                                            return _prev.filter(_innerItem => {
                                                const innerItem = Object.assign({}, _innerItem)
                                                if (_innerItem === item) {
                                                    innerItem.audioEle.pause()
                                                    return null
                                                }
                                                return innerItem
                                            })
                                        })
                                    }} style={{marginLeft: '10px', padding: '6px'}}>X
                                    </div>
                                </div>
                            </div>
                        })
                    }
                </div>
            </div>
            <MainContainer curPlaying={playingMusicList} onMusicClick={handleMusicItemClicked}
                           musicNameList={categories[curCategory] || []}/>
        </div>
    )
}

export default Home
