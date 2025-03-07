<script>
    let { availableDaysOff = 5 } = $props();
    import { todayAddedHours } from '$assets/store.svelte.js';
    import CustomAlert from './Alert.svelte';
    let dayOffReason = "";
    let errorMessage = "";
    let currDay = new Date("February 26, 2025")
    let currDayString = currDay.toLocaleDateString(undefined, { weekday: 'short', month: 'short', day: 'numeric' });

    // Reactive state for feedback
    let alertMessage = $state("");
    let showAlert = $state(false);
    
    let inputHours = $state(8)

    function submitRequest(event) {
        event.preventDefault();

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
        alertMessage = `Your request for the current day off has been submitted. Remaining days off: ${availableDaysOff}`;

        showAlert = true;
        todayAddedHours.push({
            date: currDayString,
            hours: inputHours,
            project: "Leave",
            task: "Vacation"
        });

    }
</script>

<div class="day-off-request box-shadow">
    {#if showAlert}
        <CustomAlert bind:visible={showAlert} message={alertMessage} />
    {/if}
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
                <label for="hours">Hours off (1-8)</label>
                <input type="number" bind:value={inputHours} id="hours" name="hours" min="1" max="8" required>
            </div>
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
        {#if alertMessage}
            <div class="feedback-message">{alertMessage}</div>
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

/* Parent container */
.day-off-request {
    flex-grow: 1;
    flex-shrink: 1;
    background: var(--accent-color-two, #1e1e1e); /* Darker background */
    padding: 1rem;
    border-radius: 6px;
    border: 1px solid var(--border-color, #333333); /* Darker border */
    color: var(--text-color, #e0e0e0); /* Light gray text */
    box-sizing: border-box;
    width: 100%;
    max-width: 320px;
    margin: 0 auto;
    text-align: center;
    max-height: 431px; /* Set explicit height */
    box-shadow: 0 1px 3px rgba(27, 31, 35, 0.12), 0 8px 24px rgba(27, 31, 35, 0.12); /* Subtle shadow */
}

/* Title styling */
.form-title {
    font-size: 1.25rem;
    font-weight: 600;
    margin-top: 0.8rem;
    text-align: center;
    color: var(--text-color, #e0e0e0); /* Light gray text */
    border-bottom: 1px solid var(--border-color, #333333); /* Darker border */
    margin-bottom: 0.9rem; /* Reduced margin */
    padding-bottom: 0.9rem; /* Reduced padding */
}

/* Days summary styling */
.days-summary {
    font-size: 1rem;
    margin-bottom: 0.8rem;
    padding: 0.4rem;
    background: var(--interact-highlight-color, #2a2a2a); /* Darker background */
    color: var(--text-color, #e0e0e0); /* Light gray text */
    border-radius: 6px;
    border: 1px solid var(--border-color, #333333); /* Darker border */
}

/* Form group styling */
.form-group {
    margin-bottom: 1rem;
}

/* Labels */
label {
    display: block;
    font-size: 1rem;
    font-weight: 500;
    color: var(--text-color-muted, #888888); /* Muted gray text */
    margin-bottom: 0.5rem;
    text-align: left;
}

/* Textarea */
textarea {
    width: 100%;
    padding: 0.7rem;
    font-size: 1rem;
    border: 1px solid var(--interact-border, #444444); /* Darker input border */
    border-radius: 6px;
    color: var(--text-color, #e0e0e0); /* Light gray text */
    background-color: var(--interact-bg, #1e1e1e); /* Darker input background */
    transition: border-color 0.3s, box-shadow 0.3s;
    box-shadow: inset 0 1px 3px rgba(27, 31, 35, 0.12); /* Subtle shadow */
    resize: none;
}

/* Focus state for textarea */
textarea:focus {
    outline: none;
    border-color: var(--interact-focus-border, #6a5acd); /* Purple focus border */
    box-shadow: 0 0 0 2px rgba(106, 90, 205, 0.3); /* Subtle purple shadow */
}

/* Input */
input {
    width: 100%;
    padding: 0.5rem;
    font-size: 1rem;
    border: 1px solid var(--interact-border, #444444); /* Darker input border */
    border-radius: 6px;
    color: var(--text-color, #e0e0e0); /* Light gray text */
    background-color: var(--interact-bg, #1e1e1e); /* Darker input background */
    transition: border-color 0.3s, box-shadow 0.3s;
    box-shadow: inset 0 1px 3px rgba(27, 31, 35, 0.12); /* Subtle shadow */
    max-width: 320px;
}

/* Focus state for input */
input:focus {
    outline: none;
    border-color: var(--interact-focus-border, #6a5acd); /* Purple focus border */
    box-shadow: 0 0 0 2px rgba(106, 90, 205, 0.3); /* Subtle purple shadow */
}

/* Submit button */
.submit-button {
    width: 100%;
    padding: 0.5rem;
    font-size: 1rem;
    font-weight: 600;
    color: #ffffff;
    background-color: var(--highlight-color-one, #4f46e5); /* Purple background */
    border: none;
    border-radius: 6px;
    cursor: pointer;
    transition: background-color 0.3s, transform 0.2s;
}

/* Submit button hover effect */
.submit-button:hover {
    background-color: var(--highlight-color-two, #483d8b); /* Darker purple on hover */
    transform: scale(1.02);
}

/* Feedback message styling */
.feedback-message {
    margin-top: 1.5rem;
    padding: 1rem;
    background: var(--highlight-color-one, #4f46e5); /* Purple background */
    color: #ffffff;
    border-radius: 6px;
    font-size: 1rem;
}

/* Error message styling */
.error-message {
    margin-top: 0.5rem;
    padding: 0.75rem;
    background: #d32f2f; /* Red background */
    color: #ffffff;
    border-radius: 6px;
    font-size: 1rem;
}

/* Scroll wrap */
.scroll-wrap {
    height: calc(100% - 4.1rem);
    padding-left: 0.4rem;
    padding-right: 0.4rem;
}

/* Responsive styling */
@media (max-width: 1340px) {
    .day-off-request {
        display: none;
    }
}
</style>
