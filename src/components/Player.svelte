<script lang="ts">
    export let style:CSSStyleSheet
    export let selectCount: number;
    export let status: boolean;
    export let onPlay:()=>void
    export let onStop:()=>void
</script>
<div class="player-container">
    {#if status === true}
        <svg on:click={onStop} width="34" height="34" viewBox="0 0 34 34" fill="none"
             xmlns="http://www.w3.org/2000/svg">
            <circle cx="17" cy="17" r="16.5" stroke="white"/>
            <rect x="12" y="9" width="3" height="16" fill="white"/>
            <rect x="19" y="9" width="3" height="16" fill="white"/>
        </svg>
    {:else}
        <svg on:click={onPlay} width="34" height="34" viewBox="0 0 34 34" fill="none"
             xmlns="http://www.w3.org/2000/svg">
            <circle cx="17" cy="17" r="16.5" stroke="white"/>
            <path d="M28.057 17.1144L11.5076 26.5547L11.6068 7.50236L28.057 17.1144Z" fill="white"/>
        </svg>
    {/if}

    <div class="intro">
        当前：{selectCount}个项目
    </div>
    <svg width="24" height="13" viewBox="0 0 24 13" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M1 12L12 1L23 12" stroke="#C4C4C4"/>
    </svg>
</div>
<style>
    /* 播放控制区 */
    .player-container {
        user-select: none;
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
</style>
