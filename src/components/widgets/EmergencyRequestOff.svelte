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

<div class="day-off-request">
    <h2 class="form-title">Request Today Off</h2>

    <!-- Display available days off -->
    <div class="days-summary">
        <strong>Available Days Off:</strong>
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

<style>
/* Universal box-sizing fix */
*,
*::before,
*::after {
    box-sizing: border-box;
}

.day-off-request {
    flex-shrink: 0;
    flex-grow: 0;
    background: var(--accent-color-two, #2a2a2a); /* Fallback dark gray */
    padding: 1.5rem;
    border-radius: 12px;
    box-shadow: 0 6px 15px rgba(0, 0, 0, 0.5);
    border: 1px solid #1e1e1e;
    color: #d1d1d1;
    text-align: center;
}

.form-title {
    font-size: 1.5rem;
    font-weight: 700;
    margin-bottom: 1rem;
    color: #ffffff;
    text-align: center;
    border-bottom: 1px solid #1e1e1e;
    padding-bottom: 0.8rem;
}

.days-summary {
    font-size: 1rem;
    margin-bottom: 1rem;
    padding: 0.5rem;
    background: #3a3a3a;
    color: #e0e0e0;
    border-radius: 6px;
}

label {
    display: block;
    font-size: 1rem;
    font-weight: 500;
    color: #9e9e9e;
    margin-bottom: 0.5rem;
    text-align: left;
}

textarea {
    width: 100%;
    padding: 1rem;
    font-size: 1rem;
    border: 1px solid #2a2a2a;
    border-radius: 6px;
    color: #e0e0e0;
    margin-bottom: 0.5rem;
    background-color: #1e1e1e;
    transition: border-color 0.3s, box-shadow 0.3s;
    box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.5);
    resize: none;
}

textarea:focus {
    outline: none;
    border-color: #4f46e5;
    box-shadow: 0 0 0 2px rgba(79, 70, 229, 0.4);
}

.submit-button {
    width: 100%;
    padding: 1rem;
    font-size: 1rem;
    font-weight: 600;
    color: #ffffff;
    background-color: #4f46e5;
    border: none;
    border-radius: 6px;
    cursor: pointer;
    transition: background-color 0.3s, transform 0.2s;
}

.submit-button:hover {
    background-color: #4338ca;
    transform: scale(1.02);
}

.feedback-message {
    margin-top: 1rem;
    padding: 0.8rem;
    background: #4caf50;
    color: #ffffff;
    border-radius: 6px;
}

.error-message {
    margin-top: 0.5rem;
    padding: 0.5rem;
    background: #f44336;
    color: #ffffff;
    border-radius: 6px;
}
</style>
