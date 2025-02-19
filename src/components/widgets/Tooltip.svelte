<script>
    let { tooltipMessage } = $props();
    import { scale, slide } from "svelte/transition";
    let showingTooltip = $state(false);
</script>

<button
    class="tooltip-button"
    class:active={showingTooltip}
    aria-label="More info about categories"
    onclick={(event) => {
        event.preventDefault();
        showingTooltip = !showingTooltip;
    }}
>
    <i class="fas fa-info-circle"></i>
    {#if showingTooltip}
        <div transition:slide={{ duration: 180 }} class="tooltip-text">
            {tooltipMessage}
        </div>
    {/if}
</button>

<style>
    .tooltip-button {
        background: none;
        border: none;
        color: var(--text-color-muted);
        cursor: pointer;
        margin-left: 0.5rem;
        position: relative;
        transition: color 0.2s;
    }
    /* Active state styling: light up the button */
    .tooltip-button.active {
        color: #f0f0f0; /* Light background */
        box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
    }

    .tooltip-button .tooltip-text {
        width: 200px;
        background-color: var(--accent-color-one);
        color: var(--text-color);
        text-align: center;
        border: 2px solid var(--highlight-color-one);
        border-radius: 6px;
        padding: 0.5rem;
        position: absolute;
        z-index: 1;
        bottom: 140%; /* Position above the button */
        left: 50%;
        transform: translate(-50%, 0);
        transition: opacity 0.3s;
        overflow-wrap: break-word;
    }

    .tooltip-button .tooltip-text::after {
        content: "";
        position: absolute;
        top: 100%; /* Position below the tooltip */
        left: 50%;
        transform: translateX(-50%);
        border-width: 8px;
        border-style: solid;
        border-color: var(--highlight-color-one) transparent transparent
            transparent;
    }

    .tooltip-button .tooltip-text {
        display: inline-block;
        word-break: break-word;
        white-space: normal; /* Allows wrapping */
    }
</style>
