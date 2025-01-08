<script>
    let { profile } = $props();
</script>

<div class="user-profile">
    <h2 class="profile-title">User Profile</h2>
    
    <div class="profile-section profile-image">
        <img src="default-profile.png" alt="User Profile Image" class="profile-pic">
        <button class="btn upload-image">Upload Image</button>
    </div>

    <div class="profile-section">
        <label for="username">Username</label>
        <input type="text" id="username" value={profile.username} readonly>
        <button class="btn change-password">Change Password</button>
    </div>

    <div class="profile-section">
        <h3>Personal Info</h3>
        <p><strong>Job:</strong> {profile.jobTitle}</p>
        <p><strong>Address:</strong> {profile.address}</p>
        <p><strong>Phone:</strong> {profile.phone}</p>
        <p><strong>Email:</strong> {profile.workEmail}</p>
    </div>

    <div class="profile-section team-info">
        <h3>Emergency Contact</h3>
        <p><strong>Name:</strong> {profile.emergencyContact.name}</p>
        <p><strong>Phone:</strong> {profile.emergencyContact.phone}</p>
    </div>

    <div class="profile-section">
        <p><strong>Team:</strong> {profile.team}</p>
    </div>
    
</div>

<style>
.user-profile {
    background: var(--accent-color-two);
    padding: 1rem;
    border-radius: 8px;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.4);
    width: 100%;
    max-width: 350px;
    margin: 8px auto;
    border: 1px solid #1e1e1e;
    color: #d1d1d1;
    box-sizing: border-box;
}

.profile-title {
    font-size: 1.25rem;
    font-weight: 600;
    margin-bottom: 1rem;
    text-align: center;
    color: #ffffff;
}

.profile-section {
    margin-bottom: 1rem;
}

.profile-section h3 {
    font-size: 1rem;
    font-weight: 500;
    color: #d1d1d1;
    margin-bottom: 0.5rem;
}

.profile-section label {
    font-size: 0.9rem;
    color: #9e9e9e;
    margin-bottom: 0.3rem;
}

.profile-section input[type="text"] {
    width: 100%;
    max-width: 100%;
    padding: 0.5rem;
    font-size: 0.9rem;
    border: 1px solid #2a2a2a;
    border-radius: 4px;
    color: #e0e0e0;
    background-color: #1e1e1e;
    box-shadow: inset 0 1px 2px rgba(0, 0, 0, 0.4);
    box-sizing: border-box; /* Ensures it stays within bounds */
}


.profile-pic {
    display: block;
    width: 80px;
    height: 80px;
    margin: 0 auto 0.5rem;
    border-radius: 50%;
    object-fit: cover;
    border: 1px solid #2a2a2a;
}

.btn {
    padding: 0.5rem 0.75rem;
    font-size: 0.9rem;
    color: #ffffff;
    background-color: #4f46e5;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    text-align: center;
    transition: background-color 0.3s, transform 0.2s;
}

.btn:hover {
    background-color: #4338ca;
    transform: scale(1.02);
}

.upload-image {
    display: block;
    margin: 0.5rem auto;
}

.change-password {
    margin-top: 0.5rem;
}

p {
    font-size: 0.9rem;
    color: #d1d1d1;
}

p strong {
    color: #ffffff;
}
</style>
