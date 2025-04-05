<script>
    import { tableData } from '$assets/store.svelte.js';
    import CustomAlert from './Alert.svelte';

    // Simulated project data (replace this with actual data from your store or API)
    let { projects } = $props();
    
    //TODO bug the days are a week off.

    let totalHoursWorkedThisDay = $state(0);
    let inputHours = $state(0);
    let proj = $state('');
    let task = $state('');
    let alertMessage = $state('');
    let showAlert = $state(false);
    let currDay = new Date("February 26, 2025");
    let currDayString = currDay.toLocaleDateString(undefined, { weekday: 'short', month: 'short', day: 'numeric' });

    function addHours(event) {
        event.preventDefault();

        if (!proj || !task || inputHours <= 0) {
            alertMessage = 'Please fill in all fields and ensure hours are greater than 0.';
            showAlert = true;
            return;
        }

        alertMessage = `You have added ${inputHours} hours to ${proj} for ${task} on ${currDayString}`;
        showAlert = true;

        // Find the project row in tableData
        let projectRow = tableData.find(row => row.projectName === proj && row.selectedTask === task);
        if (!projectRow) {
            // If the project/task doesn't exist, add a new row
            projectRow = {
                projectName: proj,
                selectedTask: task,
                entries: Array.from({ length: 10 }, () => 0), // Initialize 10 days of entries
            };
            tableData.push(projectRow);
        }

        // Update the hours for the current day
        const dayIndex = new Date(currDay).getDay() - 1; // Adjust for weekday index (0-based)
        projectRow.entries[dayIndex] += inputHours;

        totalHoursWorkedThisDay += inputHours;
    }
</script>

<div class="work-hours-tracker box-shadow">
    {#if showAlert}
        <CustomAlert bind:visible={showAlert} message={alertMessage} />
    {/if}
    <h2 class="form-title">Add Today's Hours</h2>

    <!-- Display total hours worked this day -->
    <div class="scroll-wrap">
        <div class="hours-summary">
            <strong>Total Hours Worked This Day:</strong>
            <br />
            <span>{totalHoursWorkedThisDay} hour(s)</span>
        </div>

        <form id="hoursForm">
            <div class="form-group">
                <label for="project">Project Name</label>
                <select id="project" name="project" bind:value={proj} required>
                    <option value="" disabled selected>Select a project</option>
                    {#each projects as project}
                        <option value={project.name}>{project.name}</option>
                    {/each}
                </select>
            </div>
            <div class="form-group">
                <label for="task">Task</label>
                <select id="task" name="task" bind:value={task} required>
                    <option value="" disabled selected>Select a task</option>
                    {#if proj}
                        {#each projects.find(p => p.name === proj)?.tasks || [] as taskOption}
                            <option value={taskOption}>{taskOption}</option>
                        {/each}
                    {/if}
                </select>
            </div>
            <div class="form-group">
                <label for="hours">Hours Worked (1-8)</label>
                <input
                    type="number"
                    bind:value={inputHours}
                    id="hours"
                    name="hours"
                    min="1"
                    max="8"
                    required
                />
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

/* Parent container */
.work-hours-tracker {
    flex-grow: 1;
    flex-shrink: 1;
    background: var(--accent-color-two); /* Darker background */
    padding: 1rem 1rem 0.8rem;
    border-radius: 6px;
    border: 1px solid var(--border-color); /* Darker border */
    color: var(--text-color, #e0e0e0); /* Light gray text */
    box-sizing: border-box;
    width: 100%;
    max-width: 320px;
    box-shadow: 0 1px 3px rgba(27, 31, 35, 0.12), 0 8px 24px rgba(27, 31, 35, 0.12); /* Subtle shadow */
}

/* Title styling */
.work-hours-tracker .form-title {
    font-size: 1.25rem;
    font-weight: 600;
    margin-top: 0.8rem;
    text-align: center;
    color: var(--text-color, #e0e0e0); /* Light gray text */
    border-bottom: 1px solid var(--border-color, #333333); /* Darker border */
    margin-bottom: 0.9rem; /* Reduced margin */
    padding-bottom: 0.9rem; /* Reduced padding */
}

/* Form group styling */
.work-hours-tracker .form-group {
    margin-bottom: 0.8rem; /* Reduced margin between form groups */
}

/* Labels */
.work-hours-tracker label {
    display: block;
    font-size: 1rem;
    font-weight: 500;
    color: var(--text-color-muted, #888888); /* Muted gray text */
    margin-bottom: 0.3rem;
}

/* Inputs */
.work-hours-tracker input,
.work-hours-tracker select {
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

/* Focus state for inputs */
.work-hours-tracker input:focus,
.work-hours-tracker select:focus {
    outline: none;
    border-color: var(--interact-focus-border, #6a5acd); /* Purple focus border */
    box-shadow: 0 0 0 2px rgba(106, 90, 205, 0.3); /* Subtle purple shadow */
}

/* Submit button */
.work-hours-tracker .submit-button {
    width: 100%;
    margin-top: 0.2rem;
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
.work-hours-tracker .submit-button:hover {
    background-color: var(--highlight-color-two, #483d8b); /* Darker purple on hover */
    transform: scale(1.02);
}

/* Hours summary styling */
.work-hours-tracker .hours-summary {
    font-size: 1rem;
    margin-bottom: 0.8rem;
    padding: 0.4rem;
    background: #4a4a4a; /* Darker background */
    color: var(--text-color, #e0e0e0); /* Light gray text */
    border-radius: 6px;
    text-align: center;
    border: 1px solid var(--border-color, #333333); /* Darker border */
}

/* Scroll wrap */
.scroll-wrap {
    flex-grow: 1;
    overflow-y: auto;
    padding-left: 0.4rem;
    padding-bottom: 2px;
    padding-right: 0.4rem;
}

/* Responsive styling */
@media (max-width: 1340px) {
    .work-hours-tracker {
        display: none;
    }
}

</style>

