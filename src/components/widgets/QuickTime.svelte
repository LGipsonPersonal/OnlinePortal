<script>
    let totalHoursWorkedThisDay = $state(0)
    let inputHours = $state(0)

    function addHours(event) {
        event.preventDefault()
        totalHoursWorkedThisDay+=inputHours
    }
</script>

<div class="work-hours-tracker box-shadow">
    <h2 class="form-title">Add Today's Hours</h2>

    <!-- Display total hours worked this week -->
    <div class="scroll-wrap">
    <div class="hours-summary">
        <strong>Total Hours Worked This Day:</strong>
        <br>
        <span>{totalHoursWorkedThisDay} hour(s)</span>
    </div>

    <form id="hoursForm">
        <div class="form-group">
            <label for="project">Project Name</label>
            <select id="project" name="project" required>
                <option value="" disabled selected>Select a project</option>
                <option value="project1">Project 1</option>
                <option value="project2">Project 2</option>
                <option value="project3">Project 3</option>
            </select>
        </div>
        <div class="form-group">
            <label for="hours">Hours Worked (1-8)</label>
            <input type="number" bind:value={inputHours} id="hours" name="hours" min="1" max="8" required>
        </div>
        <button type="submit" onclick={addHours} class="submit-button">Add Hours</button>
    </form>

    </div>
</div>



<style>
/* Universal box-sizing fix */
*,
*::before,
*::after {
    box-sizing: border-box;
}

.work-hours-tracker select {
    width: 100%;
    padding: 1rem;
    font-size: 1rem;
    border: 1px solid var(--interact-border);
    border-radius: 6px;
    color: var(--text-color);
    background-color: var(--interact-bg);
    transition: border-color 0.3s, box-shadow 0.3s;
    box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.5);
    max-width:320px;
}

/* Focus state for dropdown */
.work-hours-tracker select:focus {
    outline: none;
    border-color: var(--interact-focus-border);
    box-shadow: 0 0 0 2px rgba(79, 70, 229, 0.4);
}

.scroll-wrap {
    height: calc(100% - 4rem);
    overflow-y: auto;
    padding-left: 0.4rem;
    padding-bottom: 2px;
    padding-right: 0.4rem;
}
/* Parent container */
.work-hours-tracker {
    flex-grow: 1;
    flex-shrink: 1;
    background: var(--accent-color-two);
    padding: 1rem;
    border-radius: 12px;
    border: 1px solid var(--border-color);
    color: var(--text-color);
    box-sizing: border-box;
    width: 100%;
    max-width: 320px;
    max-height: 431px; /* Set explicit height */
    display: flex;
    flex-direction: column;
    justify-content: space-between;

}

/* Title styling */
.work-hours-tracker .form-title {
    font-size: 1.5rem;
    font-weight: 700;
    margin-top: 0.8rem;
    text-align: center;
    color: var(--text-color);
    border-bottom: 2px solid var(--highlight-color-one);
    margin-bottom: 0.9rem; /* Reduced margin */
    padding-bottom: 0.9rem; /* Reduced padding */
}

.work-hours-tracker .form-group {
    margin-bottom: 1rem; /* Reduced margin between form groups */
}

/* Labels */
.work-hours-tracker label {
    display: block;
    font-size: 1rem;
    font-weight: 500;
    color: var(--text-color-muted);
    margin-bottom: 0.5rem;
}

/* Inputs */
.work-hours-tracker input {
    width: 100%;
    padding: 1rem;
    font-size: 1rem;
    border: 1px solid var(--interact-border);
    border-radius: 6px;
    color: var(--text-color);
    background-color: var(--interact-bg);
    transition: border-color 0.3s, box-shadow 0.3s;
    box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.5);
}

/* Focus state for inputs */
.work-hours-tracker input:focus {
    outline: none;
    border-color: var(--input-focus-border);
    box-shadow: 0 0 0 2px rgba(79, 70, 229, 0.4);
}




/* Submit button */
.work-hours-tracker .submit-button {
    width: 100%;
    padding: 1rem;
    font-size: 1rem;
    font-weight: 600;
    margin-top: 0.5rem;
    color: #ffffff;
    background-color: var(--highlight-color-one);
    border: none;
    border-radius: 6px;
    cursor: pointer;
    transition: background-color 0.3s, transform 0.2s;
}

/* Submit button hover effect */
.work-hours-tracker .submit-button:hover {
    background-color: var(--highlight-color-two);
    transform: scale(1.02);
}
/* Add some styling for the hours summary */
.work-hours-tracker .hours-summary {
    font-size: 1rem;
    margin-bottom: 1rem;
    padding: 0.4rem;
    background: #4a4a4a;
    color: var(--text-color);
    border-radius: 6px;
    text-align: center;
}

/* Responsive styling */
@media (max-width: 1340px) {
    .work-hours-tracker{
      display: none;
    }
}

</style>

