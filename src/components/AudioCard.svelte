<script lang="ts">
    export let style: CSSStyleSheet
    export let icon: string
    export let label: string;
    export let status: boolean;
    export let onClick: () => void
</script>
<div class="audio-card {status? 'active':''}"
     on:click={onClick}>
    <div class="icon-container">
        <img src="{icon}"/>
    </div>
    <span>{ label }</span>

</div>
<style>
    .audio-card {
        display: inline-block;
        text-align: center;
        margin: 6px;
        color: #FFF;
        font-size: 14px;
        cursor: pointer;
    }

    .audio-card img {
        width: 65px;
    }

    .audio-card.active img {
        transform-origin: 32px 0px;
        animation: dance 5s linear infinite;
    }
</style>
