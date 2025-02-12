<script>
    let { availableDaysOff = 5 } = $props(); // Accessing props using Svelte 5 syntax
    let dayOffReason = "";
    let errorMessage = "";

    // Reactive state for feedback
    let feedbackMessage = $state("");

    function submitRequest(event) {
        event.preventDefault(); // Prevent form submission from reloading the page

        if (!dayOffReason.trim()) {
            errorMessage = "Please provide a reason for requesting the day off.";
            return;
        }

        if (availableDaysOff <= 0) {
            errorMessage = "You have no available days off.";
            return;
        }

        // Simulate request submission
        availableDaysOff -= 1;
        feedbackMessage = `Your request for the current day off has been submitted. Remaining days off: ${availableDaysOff}`;
        dayOffReason = "";
        errorMessage = ""; // Clear any existing error messages
    }
</script>

<div class="day-off-request box-shadow">
    <h2 class="form-title">Request Today Off</h2>

    <!-- Display available days off -->
     <div class="scroll-wrap">
    <div class="days-summary">
        <strong>Available Days Off:</strong>
        <br>
        <span>{availableDaysOff} day(s)</span>
    </div>

    <form onsubmit={submitRequest}>
        <div class="form-group">
            <label for="reason">Reason for Day Off</label>
            <textarea
                id="reason"
                name="reason"
                rows="4"
                bind:value={dayOffReason}
                required
                placeholder="Provide a reason for your request (e.g., sick, family emergency)"></textarea>
        </div>

        {#if errorMessage}
            <p class="error-message">{errorMessage}</p>
        {/if}

        <button type="submit" class="submit-button">Submit Request</button>
    </form>

    <!-- Display feedback message -->
    {#if feedbackMessage}
        <div class="feedback-message">{feedbackMessage}</div>
    {/if}
</div>
</div>

<style>
/* Universal box-sizing fix */
*,
*::before,
*::after {
    box-sizing: border-box;
}

.day-off-request {
    flex-grow: 1;
    flex-shrink: 1;
    background: var(--accent-color-two, #2a2a2a); /* Fallback dark gray */
    padding: 1rem;
    border-radius: 12px;
    border: 1px solid var(--border-color, #4a4a4a);
    color: var(--text-color, #f0f0f0);
    width: 100%;
    max-width: 320px;
    margin: 0 auto;
    text-align: center;
    max-height: 431px; /* Set explicit height */
}

.form-title {
    font-size: 1.5rem;
    font-weight: 700;
    margin-bottom: 1rem;
    margin-top: 0.8rem;
    color: var(--text-color, #f0f0f0);
    text-align: center;
    border-bottom: 2px solid var(--highlight-color-one, #6a5acd);
    padding-bottom: 0.9rem;
}

.days-summary {
    font-size: 1rem;
    margin-bottom: 1rem;
    padding: 0.8rem;
    background: #4a4a4a;
    color: var(--text-color, #f0f0f0);
    border-radius: 8px;
}

label {
    display: block;
    font-size: 1rem;
    font-weight: 500;
    color: var(--text-color-muted, #c0c0c0);
    margin-bottom: 0.75rem;
    text-align: left;
}

textarea {
    width: 100%;
    padding: 1rem;
    font-size: 1.2rem;
    border: 1px solid var(--input-border, #555555);
    border-radius: 8px;
    color: var(--text-color, #f0f0f0);
    margin-bottom: 1.7rem;
    background-color: var(--input-bg, #333333);
    transition: border-color 0.3s, box-shadow 0.3s;
    box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.5);
    resize: none;
}

textarea:focus {
    outline: none;
    border-color: var(--input-focus-border, #6a5acd);
    box-shadow: 0 0 0 2px rgba(79, 70, 229, 0.4);
}

.submit-button {
    width: 100%;
    padding: 1rem;
    font-size: 1.125rem;
    font-weight: 600;
    color: #ffffff;
    background-color: var(--highlight-color-one, #6a5acd);
    border: none;
    border-radius: 8px;
    cursor: pointer;
    transition: background-color 0.3s, transform 0.2s;
}

.submit-button:hover {
    background-color: var(--highlight-color-two, #483d8b);
    transform: scale(1.02);
}

.feedback-message {
    margin-top: 1.5rem;
    padding: 1rem;
    background: #388e3c; /* Darker green for better contrast */
    color: #ffffff;
    border-radius: 8px;
    font-size: 1rem;
}

.error-message {
    margin-top: 0.5rem;
    padding: 0.75rem;
    background: #d32f2f; /* Darker red for better contrast */
    color: #ffffff;
    border-radius: 8px;
    font-size: 1rem;
}
.scroll-wrap {
    height: calc(100% - 4.1rem);
    padding-left: 0.4rem;
    padding-right: 0.4rem;
}
</style>
