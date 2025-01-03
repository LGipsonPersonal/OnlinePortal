<div class="user-profile">
    <div class="profile-header">
        <h2>User Profile</h2>
    </div>
    
    <div class="profile-section profile-image">

        <img src="default-profile.png" alt="User Profile Image" class="profile-pic">
        <button class="btn upload-image">Upload New Image</button>
    </div>

    <div class="profile-section">
        <label for="username">Username:</label>
        <input type="text" id="username" value="johndoe" readonly>
        <button class="btn change-password">Change Password</button>
    </div>

    <div class="profile-section">
        <h3>Personal Information</h3>
        <p><strong>Job Title:</strong> Software Developer</p>
        <p><strong>Address:</strong> 123 Main Street, Springfield, IL</p>
        <p><strong>Phone:</strong> (555) 123-4567</p>
        <p><strong>Work Email:</strong> john.doe@company.com</p>
        <p><strong>Company Email:</strong> johndoe@corp.com</p>
    </div>

    <div class="profile-section">
        <h3>Emergency Contact</h3>
        <p><strong>Name:</strong> Jane Doe</p>
        <p><strong>Phone:</strong> (555) 987-6543</p>
        <p><strong>Relationship:</strong> Spouse</p>
    </div>

    <div class="profile-section">
        <h3>Team Information</h3>
        <p><strong>Team:</strong> Frontend Development</p>
    </div>
</div>


<style>
/* Darker ShadCN-inspired styling for the user profile component */

.user-profile {
    font-family: 'Inter', sans-serif;
    color: #e5e7eb;
    max-width: 600px;
    margin: 2rem auto;
    padding: 2rem;
    background-color: #1f2937;
    border: 1px solid #374151;
    border-radius: 8px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.4);
}

.profile-header {
    text-align: center;
    margin-bottom: 1.5rem;
}

.profile-header h2 {
    font-size: 1.5rem;
    font-weight: 600;
    color: #f9fafb;
}

.profile-section {
    margin-bottom: 1.5rem;
}

.profile-section h3 {
    font-size: 1.25rem;
    font-weight: 500;
    color: #d1d5db;
    margin-bottom: 0.5rem;
}

.profile-section p {
    margin: 0.25rem 0;
    font-size: 0.95rem;
    color: #9ca3af;
}

.profile-section label {
    display: block;
    font-size: 0.9rem;
    color: #9ca3af;
    margin-bottom: 0.25rem;
}

.profile-section input[type="text"] {
    width: 100%;
    padding: 0.5rem;
    font-size: 0.95rem;
    color: #e5e7eb;
    border: 1px solid #4b5563;
    border-radius: 4px;
    background-color: #374151;
    margin-bottom: 0.5rem;
    pointer-events: none;
}

.profile-pic {
    display: block;
    width: 100px;
    height: 100px;
    margin: 0 auto 0.75rem;
    border-radius: 50%;
    object-fit: cover;
    border: 2px solid #4b5563;
}

.btn {
    display: inline-block;
    padding: 0.5rem 1rem;
    font-size: 0.9rem;
    font-weight: 500;
    color: #ffffff;
    background-color: #2563eb;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    text-align: center;
    transition: background-color 0.2s ease;
}

.btn:hover {
    background-color: #1d4ed8;
}

.upload-image {
    display: block;
    margin: 0.5rem auto;
}

.change-password {
    margin-top: 0.5rem;
}
</style>

