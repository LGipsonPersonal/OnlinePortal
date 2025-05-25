<script>
    // @ts-ignore
    import { tableData } from '$assets/store.svelte.js';
    import CustomAlert from './widgets/Alert.svelte';

    let showAlert = $state(false);
    let alertMessage = $state("");
    let type = $state("");
    let inputHours = $state(0);

    let currDay = new Date("February 26, 2025");
    //let currDayString = currDay.toLocaleDateString(undefined, { weekday: 'short', month: 'short', day: 'numeric' });

    function submitRequest(event) {
        event.preventDefault();

        alertMessage = `You have used type ${type} to request ${inputHours} hours off on February 26, 2025.`;
        showAlert = true;

        // Find the "Leave" project row in tableData
        let leaveRow = tableData.find(row => row.projectName === "Leave" && row.selectedTask === type);
        if (!leaveRow) {
            // If the leave type doesn't exist, add a new row
            leaveRow = {
                projectName: "Leave",
                selectedTask: type,
                entries: Array.from({ length: 10 }, () => 0),
            };
            tableData.push(leaveRow);
        }

        // Update the hours for the current day
        const dayIndex = new Date(currDay).getDay() - 1; // Adjust for weekday index
        leaveRow.entries[dayIndex] += inputHours;

        console.log(tableData);
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
    height: calc(100% - 4rem);
}
/* Title styling */
.request-time-off .form-title {
    font-size: 2rem;
    font-weight: 600;
    margin-bottom: 1.2rem;
    margin-top: 0;
    text-align: center;
    color: #fff;
    border-bottom: 2px solid #6366f1;
    padding-bottom: 0.5rem;
}

/* PTO Info Row */
.request-time-off .pto-info-row {
    display: flex;
    gap: 1.5rem;
    margin-bottom: 1.5rem;
}

.request-time-off .pto-info {
    flex: 1;
    text-align: center;
    background-color: #232336;
    padding: 1rem;
    border-radius: 8px;
    border: 1px solid #35357a;
    color: #e0e0e0;
}

.request-time-off .pto-info label {
    display: block;
    font-size: 1rem;
    font-weight: 500;
    margin-bottom: 0.5rem;
    color: #a1a1aa;
}

.request-time-off .pto-info p {
    font-size: 1.25rem;
    font-weight: 700;
    margin: 0;
    color: #fff;
}

/* Flex row for Start Date and End Date */
.request-time-off .form-row {
    display: flex;
    gap: 1.5rem;

}
/* Form groups */
.request-time-off .form-group {
    margin-bottom: 1.5rem;
    flex: 1;
    min-width: 0;
}

/* Labels */
.request-time-off label {
    display: block;
    font-size: 1rem;
    font-weight: 500;
    color: #a1a1aa;
    margin-bottom: 0.5rem;
}

/* Inputs, select, and textarea */
.request-time-off input,
.request-time-off select,
.request-time-off textarea {
    width: 100%;
    padding: 0.9rem;
    font-size: 1rem;
    border: 1px solid #35357a;
    border-radius: 6px;
    color: #e0e0e0;
    background-color: #232336;
    transition: border-color 0.3s, box-shadow 0.3s;
    box-shadow: 0 1px 3px rgba(44, 62, 80, 0.08) inset;
    box-sizing: border-box;
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
    border-color: #6366f1;
    box-shadow: 0 0 0 2px rgba(99, 102, 241, 0.15);
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
    color: #fff;
    background-color: #6366f1;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    transition: background-color 0.2s, transform 0.15s;
    margin-top: 0.5rem;
}
.request-time-off .submit-button:hover {
    background-color: #4f46e5;
    transform: translateY(-2px) scale(1.01);
}

/* Password field */
.request-time-off .password-field {
    margin-bottom: 1.5rem;
}

/* Responsive styling: stack fields on small screens */
/* Responsive styling: Small screens */
@media (max-width: 760px) {
    .request-time-off {
        padding: 1rem;
        min-width: auto;
        max-width: 100vw;
    }

    .request-time-off .pto-info-row {
        flex-direction: column;
        gap: 1rem;
    }

    .request-time-off .form-row {
        flex-direction: column;
        gap: 1rem;
    }
}
</style>
