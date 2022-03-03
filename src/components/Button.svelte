<script lang="ts">
    export let style:CSSStyleSheet
    export let label: string;
    export let status: boolean;
    export let onClick:()=>void
</script>
<button on:click={onClick} style="{style}" class="btn {status?'active':''}">{label}</button>
<style>
    .btn {
        height: 30px;
        border-radius: 15px;
        font-size: 14px;
        border: 1px solid rgba(255, 255, 255, 0.2);
        padding: 0px 26px;
        cursor: pointer;
        color: #FFF;
        background-color: transparent;
    }

    .btn.active {
        color: #081d24;
        background-color: #FFF;
        border-color: transparent;
    }
</style>
