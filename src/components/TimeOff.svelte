<div class="request-time-off">
    <h2 class="form-title">Request Time Off</h2>
    <form>
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
            <select id="type" name="type" required>
                <option value="" disabled selected>Select type</option>
                <option value="holiday">Holiday</option>
                <option value="pto">PTO</option>
                <option value="emergency">Emergency</option>
            </select>
        </div>
        <div class="form-group">
            <label for="amount">Amount (hours)</label>
            <input type="number" id="amount" name="amount" min="0" step="0.5" required>
        </div>
        <div class="form-group">
            <label for="note">Note</label>
            <textarea id="note" name="note" rows="4" placeholder="Add extra information..."></textarea>
        </div>
        <button type="submit" class="submit-button">Submit</button>
    </form>
</div>

<style>
/* Parent container */
.request-time-off {
    background: var(--accent-color-two);
    padding: 2rem;
    border-radius: 12px;
    box-shadow: 0 6px 15px rgba(0, 0, 0, 0.5);
    width: 100%;
    max-width: 600px;
    margin: auto;
    border: 1px solid #1e1e1e;
    color: #d1d1d1;
    box-sizing: border-box; /* Ensures all child elements respect padding */ 
}

/* Title styling */
.request-time-off .form-title {
    font-size: 1.5rem;
    font-weight: 700;
    margin-bottom: 1.5rem;
    text-align: center;
    color: #ffffff;
    border-bottom: 1px solid #1e1e1e;
    padding-bottom: 1rem;
}

/* Flex row for Start Date and End Date */
.request-time-off .form-row {
    display: flex;
    gap: 1.5rem;
    margin-bottom: 1.5rem;
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
    color: #9e9e9e;
    margin-bottom: 0.5rem;
}

/* Inputs, select, and textarea */
.request-time-off input,
.request-time-off select,
.request-time-off textarea {
    width: 100%;
    padding: 1rem;
    font-size: 1rem;
    border: 1px solid #2a2a2a;
    border-radius: 6px;
    color: #e0e0e0;
    background-color: #1e1e1e;
    transition: border-color 0.3s, box-shadow 0.3s;
    box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.5);
    box-sizing: border-box; /* Ensures input paddings are accounted for */ 
}

/* Focus state for inputs, select, and textarea */
.request-time-off input:focus,
.request-time-off select:focus,
.request-time-off textarea:focus {
    outline: none;
    border-color: #4f46e5;
    box-shadow: 0 0 0 2px rgba(79, 70, 229, 0.4);
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
.request-time-off .submit-button:hover {
    background-color: #4338ca;
    transform: scale(1.02);
}

/* Responsive styling: stack fields on small screens */
@media (max-width: 768px) {
    .request-time-off .form-row {
        flex-direction: column;
        gap: 1rem;
    }
}
</style>
