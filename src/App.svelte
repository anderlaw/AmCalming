<script lang="ts">
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
    }
    const baseUrl = 'https://audio-resource-1256270265.cos.ap-shanghai.myqcloud.com/audio'
    const iconUrl = 'http://localhost:3000/images'
    const MusicList: Array<{
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
    $: playStatus = currentPlayingMusicNames.length > 0
    const playOrStopPlayOneMusic = (musicName: string) => {
        let _index = -1
        let _music: MusicItem = null
        MusicList.find(_musicGroup => _music = _musicGroup.subItems.find(_musicItem => _musicItem.name === musicName))

        const alreadyPlaying = (_index = currentPlayingMusicNames.indexOf(musicName)) > -1
        if (!alreadyPlaying) {
            //记录并播放
            currentPlayingMusicNames = [...currentPlayingMusicNames, musicName]

            if (_music && !_music.audioEle) {
                const newAudioEle = _music.audioEle = document.createElement('audio')
                newAudioEle.controls = false
                newAudioEle.src = _music.url
            }
            _music.audioEle.play()
        } else {
            //删除记录并暂停
            currentPlayingMusicNames.splice(_index, 1)
            currentPlayingMusicNames = [...currentPlayingMusicNames]
            _music.audioEle.pause()
        }
    }
    //开始、暂停播放
    //列出正在播放的音乐，并可以调节某个音乐的音量
    //将音乐资源托管到腾讯CDN、防止盗链
    //程序Logo和小图标
    //捐赠二维码
</script>
<div class="layout">
    <main class="container">
        <!--  header-->
        <button class="donate-button">捐赠</button>
        <div class="divider" style="margin-top:12px"></div>
        <div class="category-container">
            {#each MusicList as musicCategory}
                <button class="category-button {musicCategory.name === currentCategory ? 'active':''}"
                        on:click={()=>currentCategory = musicCategory.name}>
                    { musicCategory.label }
                </button>
            {/each}
        </div>
        <div class="music-option-container">
            {#each displayMusicOptions as music}
                <div class="music-option {currentPlayingMusicNames.indexOf(music.name)>-1? 'active':''}"
                     on:click={()=>playOrStopPlayOneMusic(music.name)}>
                    <div class="icon-container">
                        <img src="{music.icon}"/>
                    </div>
                    <span>{ music.label }</span>

                </div>
            {/each}
        </div>
        <div class="player-container">
            {#if playStatus === true}
                <svg on:click={()=>alert('stop')} width="34" height="34" viewBox="0 0 34 34" fill="none"
                     xmlns="http://www.w3.org/2000/svg">
                    <circle cx="17" cy="17" r="16.5" stroke="white"/>
                    <rect x="12" y="9" width="3" height="16" fill="white"/>
                    <rect x="19" y="9" width="3" height="16" fill="white"/>
                </svg>
            {:else}
                <svg on:click={()=>alert('play')} width="34" height="34" viewBox="0 0 34 34" fill="none"
                     xmlns="http://www.w3.org/2000/svg">
                    <circle cx="17" cy="17" r="16.5" stroke="white"/>
                    <path d="M28.057 17.1144L11.5076 26.5547L11.6068 7.50236L28.057 17.1144Z" fill="white"/>
                </svg>
            {/if}

            <div class="intro">
                当前：{currentPlayingMusicNames.length}个项目
            </div>
            <svg width="24" height="13" viewBox="0 0 24 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M1 12L12 1L23 12" stroke="#C4C4C4"/>
            </svg>
        </div>
    </main>
</div>

<style>
    body {
        margin: 0px;
    }

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

    /* 按钮 */
    button {
        border: 1px solid rgba(255, 255, 255, 0.2);
        padding: 0px 26px;
        font-size: 12px;
        cursor: pointer;
        margin-right: 10px;
        color: #FFF;
        background-color: transparent;
    }

    button.active {
        color: #081d24;
        background-color: #FFF;
        border-color: transparent;
    }

    .donate-button {
        display: block;
        margin-left: auto;
        height: 24px;
        border-radius: 12px;
    }

    /* 分类 */
    .category-container {
        padding: 16px 0px;
    }

    .category-button {
        height: 30px;
        border-radius: 15px;
        font-size: 14px;
    }

    /* 音乐选区 */
    .music-option-container {

    }

    .music-option-container > .music-option {
        display: inline-block;
        text-align: center;
        margin: 6px;
        color: #FFF;
        font-size: 14px;
    }

    .icon-container > img {
        width: 65px;
    }

    .music-option.active img {
        /*background-color: blue;*/
        transform-origin: 32px 0px;
        animation: dance 5s linear infinite;
    }

    .divider {
        height: 1px;
        background-color: rgba(101, 101, 101, .6);
    }

    /* 播放控制区 */
    .player-container {
        display: flex;
        align-items: center;
        position: absolute;
        bottom: 0;
        width: 100%;
        color: #FFF;
        padding-top: 20px;
        border-top: 1px solid rgba(101, 101, 101, .6);
    }

    .player-container > .intro {
        margin-left: 10px;
        font-size: 14px;
        flex: 1;
    }

    .play-button {
        margin-right: 10px;
    }

    /* animation */
    @keyframes dance {
        0% {
            transform: rotate(0deg);
        }
        25% {
            transform: rotate(20deg);
        }
        50% {
            transform: rotate(0deg);
        }
        75% {
            transform: rotate(-20deg);
        }
        100% {
            transform: rotate(0deg);
        }
    }

    /*@-webkit-keyframes dance !* Safari 与 Chrome *!*/
    /*{*/
    /*    from {background: red;}*/
    /*    to {background: yellow;}*/
    /*}*/
</style>
