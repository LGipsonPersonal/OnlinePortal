<script>
    import { onMount } from 'svelte';
    import { slide } from 'svelte/transition';

let { message, visible=$bindable() } = $props();


    function hideAlert() {
        visible = false;
    }

    onMount(() => {
        setTimeout(() => {
            hideAlert();
        }, 2500);
    });
</script>

{#if visible}
    <div transition:slide class="custom-alert" on:click={hideAlert}>
        {message}
    </div>
{/if}

<style>
.custom-alert {
    position: fixed;
    top: 1.2rem;
    left: 50%;
    transform: translateX(-50%);
    background-color: #4f46e5; /* Purple background */
    color: #ffffff; /* White text */
    padding: 1rem 2rem;
    border-radius: 8px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
    font-size: 1rem;
    font-weight: 600;
    text-align: center;
    z-index: 1000;
    cursor: pointer;
    transition: opacity 0.3s ease, transform 0.3s ease;
}

.custom-alert:hover {
    background-color: #6a5acd; /* Lighter purple on hover */
}

.custom-alert:active {
    background-color: #483d8b; /* Darker purple on active */
}
</style>