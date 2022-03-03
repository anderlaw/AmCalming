<script lang="ts">
    import Button from "./components/Button.svelte";
    import AudioCard from "./components/AudioCard.svelte";
    import Player from "./components/Player.svelte";

    const handleEnter = (e) => {
        console.log(e)
    }
    document.documentElement.addEventListener('keydown', handleEnter)

    //盛放音乐的列表变量
    type MusicItem = {
        url: string,
        label: string,
        audioEle: null | HTMLAudioElement,
        icon: string,
        name: string //name具有唯一性
        playStatus?:boolean
    }
    const baseUrl = 'https://audio-resource-1256270265.cos.ap-shanghai.myqcloud.com/audio'
    const iconUrl = 'https://audio-resource-1256270265.cos.ap-shanghai.myqcloud.com/images'
    let MusicList: Array<{
        label: string,
        name: string,
        subItems: Array<MusicItem>
    }> = [
        {
            label: '鸟类',
            name: 'birds',
            subItems: [
                //鸟叫
                {
                    name: 'birds',
                    label: '鸟叫',
                    url: `${baseUrl}/鸟.mp3`,
                    audioEle: null,
                    icon: `${iconUrl}/birds.svg`,
                },
                {
                    name: 'morningBirds',
                    label: '清晨鸟叫',
                    url: `${baseUrl}/清晨鸟叫.mp3`,
                    audioEle: null,
                    icon: `${iconUrl}/morningBirds.svg`,
                },
                {
                    name: 'tropicalBirds',
                    label: '热带鸟',
                    url: `${baseUrl}/热带鸟.mp3`,
                    audioEle: null,
                    icon: `${iconUrl}/tropicalBirds.svg`,
                },
                {
                    name: 'cuckooBird',
                    label: '杜鹃',
                    url: `${baseUrl}/杜鹃.mp3`,
                    audioEle: null,
                    icon: `${iconUrl}/cuckooBird.svg`,
                },
            ]
        },
        {
            label: '乡村',
            name: 'farm',
            subItems: [
                {
                    name: 'chicks',
                    label: '小鸡',
                    url: `${baseUrl}/小鸡.mp3`,
                    audioEle: null,
                    icon: `${iconUrl}/chicks.svg`
                },
                {
                    name: 'chickens',
                    label: '母鸡带小鸡',
                    url: `${baseUrl}/母鸡小鸡.mp3`,
                    audioEle: null,
                    icon: `${iconUrl}/chickens.svg`
                },
                {
                    name: 'cows',
                    label: '黄牛',
                    url: `${baseUrl}/牛叫.mp3`,
                    audioEle: null,
                    icon: `${iconUrl}/cows.svg`
                },
                {
                    name: 'bees',
                    label: '蜜蜂',
                    url: `${baseUrl}/蜜蜂.mp3`,
                    audioEle: null,
                    icon: `${iconUrl}/bees.svg`
                }
            ]
        },
        {
            label: '海洋',
            name: 'ocean',
            subItems: [
                {
                    name: 'seagulls',
                    label: '海鸥',
                    url: `${baseUrl}/海鸥.mp3`,
                    audioEle: null,
                    icon: `${iconUrl}/seagulls.svg`,
                },
                {
                    name: 'whales',
                    label: '鲸鱼叫',
                    url: `${baseUrl}/鲸鱼叫.mp3`,
                    audioEle: null,
                    icon: `${iconUrl}/whales.svg`,
                },
                {
                    name: 'whalesWater',
                    label: '鲸鱼戏水',
                    url: `${baseUrl}/鲸鱼戏水.mp3`,
                    audioEle: null,
                    icon: `${iconUrl}/whalesWater.svg`
                }
            ]
        }
    ]
    //UI状态
    let currentCategory = 'birds'
    $: displayMusicOptions = MusicList.find(_musicGroup => _musicGroup.name === currentCategory)?.subItems ?? []

    //音乐播放UI
    //如何等待选中的音乐元数据加载完毕再播放？？？？
    //防止用户点击后无法播放？？？？只有正在播放时 才改变UI的状态为播放状态

    //记录当前播放
    let currentPlayingMusicNames: Array<string> = []
    let musicSelection:Array<MusicItem> = []
    $: selectCount = musicSelection.length
    $: playStatus = musicSelection.filter(item => item.playStatus).length > 0
    const playOrStopPlayOneMusic = (musicName: string) => {
        let _music: MusicItem = null
        MusicList.find(_musicGroup => _music = _musicGroup.subItems.find(_musicItem => _musicItem.name === musicName))


        const newStatus = _music.playStatus = !_music.playStatus
        if (newStatus) {
            //添加到选择并播放
            musicSelection.push(_music)
            if (_music && !_music.audioEle) {
                const newAudioEle = _music.audioEle = document.createElement('audio')
                newAudioEle.controls = false
                newAudioEle.src = _music.url
                newAudioEle.loop = true
            }
            _music.audioEle.play()
        } else {
            //删除选择并暂停
            musicSelection.splice(musicSelection.indexOf(_music),1)
            _music.audioEle.pause()
        }
        MusicList = MusicList
        musicSelection = musicSelection
    }
    //开始、暂停播放
    const onPlayStatusChangeHandler = (toPlayOrPause: boolean) => {
        if(musicSelection.length === 0){
            alert('请选择你喜欢的音频卡片，点击开始播发')
        }
        musicSelection.forEach(music => {
            music.playStatus = !music.playStatus
            if(toPlayOrPause){
                music.audioEle.play()
            }else{
                music.audioEle.pause()
            }
        })
        musicSelection = musicSelection
        MusicList = MusicList
    }
    //TODO:
    //列出正在播放的音乐，并可以调节某个音乐的音量
    //防止盗链
    //程序Logo和小图标
    //捐赠二维码
</script>
<div class="layout">
    <main class="container">
        <Button style="margin-left: auto;display: block;" label="关于"/>
        <div class="divider" style="margin-top:12px"></div>
        <div class="category-container">
            {#each MusicList as musicCategory}
                <Button style="margin-right: 10px;" onClick={()=>currentCategory = musicCategory.name}
                        label="{musicCategory.label}" status="{musicCategory.name === currentCategory}"/>
            {/each}
        </div>
        <div class="music-option-container">
            {#each displayMusicOptions as music}
                <AudioCard
                        status={music.playStatus}
                        onClick={()=>playOrStopPlayOneMusic(music.name)}
                        label="{music.label}"
                        icon="{music.icon}"
                />
            {/each}
        </div>
        <Player
                status={playStatus}
                selectCount={selectCount}
                onStop={()=>onPlayStatusChangeHandler(false)}
                onPlay={()=>onPlayStatusChangeHandler(true)}
        />
    </main>
</div>

<style>
    /* 盒子容器 */
    .layout {
        padding: 20px 24px;
        box-sizing: border-box;
        height: 100vh;
    }

    .container {
        position: relative;
        height: 100%;
    }

    /* 分类 */
    .category-container {
        padding: 16px 0px;
    }


    .divider {
        height: 1px;
        background-color: rgba(101, 101, 101, .6);
    }




    /*@-webkit-keyframes dance !* Safari 与 Chrome *!*/
    /*{*/
    /*    from {background: red;}*/
    /*    to {background: yellow;}*/
    /*}*/
</style>
