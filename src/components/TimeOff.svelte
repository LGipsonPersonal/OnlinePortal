<script>
    import { todayAddedHours } from '$assets/store.svelte.js';
    import CustomAlert from './widgets/Alert.svelte';

    let showAlert = $state(false);
    let alertMessage = $state("");
    let type = $state("");
    let inputHours = $state(0);

    let currDay = new Date("February 26, 2025");
    let currDayString = currDay.toLocaleDateString(undefined, { weekday: 'short', month: 'short', day: 'numeric' });

    function submitRequest(event) {
        event.preventDefault();

        alertMessage = `You have used type ${type} to request ${inputHours} hours off on February 26, 2025.`;
        showAlert = true;

        todayAddedHours.push({
            date: currDayString,
            hours: inputHours,
            project: "Leave",
            task: type
        });

        console.log(todayAddedHours);
    }
</script>

<div class="request-time-off">
    {#if showAlert}
        <CustomAlert bind:visible={showAlert} message={alertMessage} />
    {/if}
    <h2 class="form-title">Request Time Off</h2>
    <div class="scroll-wrap">
        <form onsubmit={submitRequest}>
            <!-- PTO Information Row -->
            <div class="pto-info-row">
                <div class="pto-info">
                    <label for="available-vacation">Vacation Time</label>
                    <p id="available-vacation">40 hours</p>
                </div>
                <div class="pto-info">
                    <label for="available-sick">Sick Time</label>
                    <p id="available-sick">20 hours</p>
                </div>
            </div>
            
            <div class="form-row">
                <div class="form-group">
                    <label for="start-date">Start Date</label>
                    <input type="date" id="start-date" name="start-date" required>
                </div>
                <div class="form-group">
                    <label for="end-date">End Date</label>
                    <input type="date" id="end-date" name="end-date" required>
                </div>
            </div>
            <div class="form-group">
                <label for="type">Type</label>
                <select bind:value={type} id="type" name="type" required>
                    <option value="" disabled selected>Select type</option>
                    <option>Holiday</option>
                    <option>Vacation</option>
                    <option>Unpaid</option>
                    <option>Sick</option>
                </select>
            </div>
            <div class="form-group">
                <label for="amount">Amount (hours)</label>
                <input type="number" id="amount" name="amount" min="0" step="0.5" bind:value={inputHours} required>
            </div>
            <div class="form-group">
                <label for="note">Note (optional)</label>
                <textarea id="note" name="note" rows="4" placeholder="Add extra information..."></textarea>
            </div>
            <label for="password">Password</label>
            <input type="password" class="password-field form-group" id="password"/>
            <button type="submit" class="submit-button">Submit</button>
        </form>
    </div>
</div>

<style>
input {
  color-scheme: dark;
}
/* Parent container */
.request-time-off {
    flex: 1 1 auto;
    background: var(--accent-color-two);
    padding: 1.5rem 1rem 1.2rem;
    border-radius: 6px;
    box-shadow: 0 6px 15px rgba(0, 0, 0, 0.5);
    min-width: 600px;
    border: 1px solid #30363d; /* GitHub darker border */
    color: #c9d1d9; /* GitHub light text */
    box-sizing: border-box; /* Ensures all child elements respect padding */ 
    height: 100%;
}

.scroll-wrap {
    padding-right: 1rem;
    padding-left: 1rem;
    height: calc(100% - 3rem);
    overflow-y: auto;
}

/* Title styling */
.request-time-off .form-title {
    font-size: 1.25rem;
    font-weight: 600;
    margin-bottom: 1rem;
    margin-top: 0;
    text-align: center;
    color: #e0e0e0; /* Light text */
    border-bottom: 1px solid #444; /* Darker border */
    padding-bottom: 0.8rem;
}

/* Flex row for Start Date and End Date */
.request-time-off .form-row {
    display: flex;
    gap: 1.5rem;
}
/* Form groups */
.request-time-off .form-group {
    margin-bottom: 1.5rem;
    box-sizing: border-box; 
}

/* Labels */
.request-time-off label {
    display: block;
    font-size: 1rem;
    font-weight: 500;
    color: #8b949e; /* Muted text */
    margin-bottom: 0.5rem;
    text-wrap: nowrap;
}

/* Inputs, select, and textarea */
.request-time-off input,
.request-time-off select,
.request-time-off textarea {
    width: 100%;
    padding: 1rem;
    font-size: 1rem;
    border: 1px solid #444; /* Darker border */
    border-radius: 6px;
    color: #e0e0e0; /* Light text */
    background-color: #2e2e2e; /* Darker background */
    transition: border-color 0.3s, box-shadow 0.3s;
    box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.5);
    box-sizing: border-box; /* Ensures input paddings are accounted for */ 
}
.request-time-off select,
#start-date,
#end-date {
    cursor: pointer;
}
/* Focus state for inputs, select, and textarea */
.request-time-off input:focus,
.request-time-off select:focus,
.request-time-off textarea:focus {
    outline: none;
    border-color: #58a6ff; /* Blue focus border */
    box-shadow: 0 0 0 2px rgba(88, 166, 255, 0.4);
}
/* Form groups in a row */
.request-time-off .form-row .form-group {
    flex: 1;
    min-width: 0;
    box-sizing: border-box; /* Prevents fields from exceeding their bounds */
}
/* Textarea specific styles */
.request-time-off textarea {
    resize: none;
    height: 100px;
}

/* Submit button */
.request-time-off .submit-button {
    width: 100%;
    padding: 0.9rem;
    font-size: 1rem;
    font-weight: 600;
    color: #ffffff;
    background-color: #238636; /* Green background */
    border: none;
    border-radius: 6px;
    cursor: pointer;
    transition: background-color 0.3s, transform 0.2s;
}
.request-time-off .pto-info-row {
    display: flex;
    gap: 1.5rem;
    margin-bottom: 1.5rem;
}

.request-time-off .pto-info {
    flex: 1;
    text-align: center;
    background-color: #2e2e2e; /* Darker background */
    padding: 1rem;
    border-radius: 6px;
    border: 1px solid #444; /* Darker border */
    color: #e0e0e0; /* Light text */
}

.request-time-off .pto-info label {
    display: block;
    font-size: 1rem;
    font-weight: 500;
    margin-bottom: 0.5rem;
    color: #8b949e; /* Muted text */
}

.request-time-off .pto-info p {
    font-size: 1.25rem;
    font-weight: 700;
    margin: 0;
    color: #e0e0e0; /* Light text */
}
/* Submit button hover effect */
.request-time-off .submit-button:hover {
    background-color: #2ea043; /* Lighter green on hover */
    transform: scale(1.02);
}

/* Responsive styling: stack fields on small screens */
/* Responsive styling: Small screens */
@media (max-width: 760px) {
    .request-time-off {
        padding: 1.5rem;
        min-width:auto;
    }

    .request-time-off .pto-info-row {
        display: none;
    }

    .request-time-off .form-row {
        flex-direction: column;
        gap: 1rem;
    }
}
</style>
