<script>
</script>

<div class="container">
    <h2>Work Hours Tracker</h2>
    <form id="hoursForm">
        <div class="form-group">
            <label for="project">Project Name</label>
            <input type="text" id="project" name="project" placeholder="Enter project name" required>
        </div>
        <div class="form-group">
            <label for="hours">Hours Worked (1-8)</label>
            <input type="number" id="hours" name="hours" min="1" max="8" required>
        </div>
        <button type="submit">Add Hours</button>
    </form>
    <div id="output" style="margin-top: 20px;"></div>
</div>

<style>
    .container {
        max-width: 400px;
        margin: 0 auto;
        padding: 20px;
        border: 1px solid #ccc;
        border-radius: 8px;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    }
    .form-group {
        margin-bottom: 15px;
    }
    label {
        display: block;
        margin-bottom: 5px;
    }
    input[type="text"], input[type="number"] {
        width: 100%;
        padding: 8px;
        box-sizing: border-box;
        border: 1px solid #ccc;
        border-radius: 4px;
    }
    button {
        background-color: #007BFF;
        color: white;
        border: none;
        padding: 10px 15px;
        border-radius: 4px;
        cursor: pointer;
    }
    button:disabled {
        background-color: #ccc;
        cursor: not-allowed;
    }
</style>

