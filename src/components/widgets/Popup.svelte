<script>
    let { popupContent, active = $bindable(), popupData } = $props()
</script>

{#if active}
    <div class="popup-overlay" onclick={(e) => { 
        if (e.target === e.currentTarget) active = false; 
    }}>
        <div class="popup-box">
            <button class="close-btn" onclick={() => active = false}>
                <span>&times;</span>
            </button>
            {@render popupContent(popupData)}
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
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 10;
}

/* Popup box styling */
.popup-box {
    background: var(--accent-color-two, #1e1e1e);
    padding: 2rem;
    border-radius: 12px;
    box-shadow: 0 6px 15px rgba(0, 0, 0, 0.5);
    border: 1px solid #1e1e1e;
    color: #d1d1d1;
    box-sizing: border-box;
    max-width: 800px;
    width: 90%;
    max-height: 90%;
    overflow-y: auto;
    position: relative;
    z-index: 11; /* Ensures popup stays above overlay */
}

/* Close button styling */
.close-btn {
    position: absolute;
    top: 12px;
    right: 12px;
    width: 32px;
    height: 32px;
    border: none;
    background: transparent;
    color: #d1d1d1;
    font-size: 24px;
    font-weight: bold;
    cursor: pointer;
    line-height: 1;
    border-radius: 50%;
    transition: background 0.2s, color 0.2s;
}
.close-btn span {
    position: relative;
    top: -2px;
}
.close-btn:hover {
    background: rgba(255, 0, 0, 0.7);
    color: white;
}
</style>
