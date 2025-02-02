<script>
    let { popupContent, active = $bindable(), popupData } = $props()
</script>

{#if active}
    <div class="popup-overlay">
        <div class="popup-box">
            {@render popupContent(popupData)}
            <button onclick={() => active = false}>Close</button>
        </div>
    </div>
{/if}

<style>
/* Overlay styling */
.popup-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5); /* Transparent gray background */
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 9999; /* Ensures the popup appears above all other elements */
}

/* Popup box styling */
.popup-box {
    background: var(--accent-color-two, #1e1e1e); /* Default to dark gray if accent color not defined */
    padding: 2rem;
    border-radius: 12px;
    box-shadow: 0 6px 15px rgba(0, 0, 0, 0.5);
    border: 1px solid #1e1e1e;
    color: #d1d1d1;
    box-sizing: border-box; /* Ensures padding is included in width/height */
    max-width: 800px;
    width: 90%;
    max-height: 90%;
    overflow-y: auto;
}
</style>