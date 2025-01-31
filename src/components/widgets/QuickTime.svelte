<script>
    let { totalHoursThisWeek = 0 } = $props(); // Accessing props using rune syntax
</script>

<div class="work-hours-tracker">
    <h2 class="form-title">Work Hours Tracker</h2>

    <!-- Display total hours worked this week -->
    <div class="scroll-wrap">
    <div class="hours-summary">
        <strong>Total Hours Worked This Week:</strong>
        <br>
        <span>{totalHoursThisWeek} hour(s)</span>
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
            <input type="number" id="hours" name="hours" min="1" max="8" required>
        </div>
        <button type="submit" class="submit-button">Add Hours</button>
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
    border: 1px solid #2a2a2a;
    border-radius: 6px;
    color: #e0e0e0;
    background-color: #1e1e1e;
    transition: border-color 0.3s, box-shadow 0.3s;
    box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.5);
    max-width:320px;
}

/* Focus state for dropdown */
.work-hours-tracker select:focus {
    outline: none;
    border-color: #4f46e5;
    box-shadow: 0 0 0 2px rgba(79, 70, 229, 0.4);
}


/* Parent container */
.work-hours-tracker {
    flex-grow: 0;
    flex-shrink: 0;
    background: var(--accent-color-two, #2a2a2a); /* Fallback dark gray */
    padding: 1rem;
    border-radius: 12px;
    box-shadow: 0 6px 15px rgba(0, 0, 0, 0.5);
    border: 1px solid #1e1e1e;
    color: #d1d1d1;
    box-sizing: border-box;


}

/* Title styling */
.work-hours-tracker .form-title {
    font-size: 1.5rem;
    font-weight: 700;
    margin-top: 1rem;
    text-align: center;
    color: #ffffff;
    border-bottom: 2px solid #4f46e5;
    margin-bottom: 1rem; /* Reduced margin */
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
    color: #9e9e9e;
    margin-bottom: 0.5rem;
}

/* Inputs */
.work-hours-tracker input {
    width: 100%;
    padding: 1rem;
    font-size: 1rem;
    border: 1px solid #2a2a2a;
    border-radius: 6px;
    color: #e0e0e0;
    background-color: #1e1e1e;
    transition: border-color 0.3s, box-shadow 0.3s;
    box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.5);
}

/* Focus state for inputs */
.work-hours-tracker input:focus {
    outline: none;
    border-color: #4f46e5;
    box-shadow: 0 0 0 2px rgba(79, 70, 229, 0.4);
}




/* Submit button */
.work-hours-tracker .submit-button {
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

/* Submit button hover effect */
.work-hours-tracker .submit-button:hover {
    background-color: #4338ca;
    transform: scale(1.02);
}
/* Add some styling for the hours summary */
.work-hours-tracker .hours-summary {
    font-size: 1rem;
    margin-bottom: 1rem;
    padding: 0.4rem;
    background: #3a3a3a;
    color: #e0e0e0;
    border-radius: 6px;
    text-align: center;
}

/* Responsive styling */
@media (max-width: 768px) {
    .work-hours-tracker {
        max-height: 600px;
    }
}

</style>

