<script>
    // @ts-ignore
    import { profile } from "$assets/store.svelte.js";
    // @ts-ignore
    import { camelCaseToWords, titleCase } from "$assets/utils.js";
    let editing = $state(false); // Reactive editing mode toggle

    function toggleEdit() {
        editing = !editing;
    }
    function formatTitles(str) {
        return (titleCase(camelCaseToWords(str)))
    }
</script>

<div class="user-profile">
    <h2 class="profile-title">Hi, {profile.fullName}</h2>

    <div class="profile-section profile-image">
        <img src="./src/assets/{profile.profileImage}.jpg" alt="User Profile" class="profile-pic">
    </div>

    <button class="edit-profile-button" onclick={toggleEdit}>
        {editing ? "Save Changes" : "Edit Profile"}
        <i class="fas fa-edit"></i>
    </button>
    <div class="profile-section">
        <h3>Personal Info</h3>
        <div class="editable-row">
            <p>
                <strong>Job Title:</strong>
                    {profile.jobTitle}
            </p>
        </div>
        {#each ["address", "phone", "workEmail"] as field}
            <div class="editable-row">
                <p>
                    <strong>{formatTitles(field)}:</strong>
                    {#if editing}
                        <input 
                            type="text" 
                            bind:value={profile[field]} 
                        />
                    {:else}
                        {profile[field]}
                    {/if}
                </p>
            </div>
        {/each}
        <div class="editable-row">
            <p>
                <strong>Team:</strong>
                    {profile.team}
            </p>
        </div>
    </div>

    <div class="profile-section team-info">
        <h3>Emergency Contact</h3>
        {#each ["name", "phone"] as field}
            <div class="editable-row">
                <p>
                    <strong>{field}:</strong>
                    {#if editing}
                        <input 
                            type="text" 
                            bind:value={profile.emergencyContact[field]} 
                        />
                    {:else}
                        {profile.emergencyContact[field]}
                    {/if}
                </p>
            </div>
        {/each}
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
    margin: 8px;
    border: 1px solid #1e1e1e;
    color: #d1d1d1;
    box-sizing: border-box;
}

.profile-title {
    font-size: 1.25rem;
    font-weight: 600;
    margin-bottom: 0.4rem;
    text-align: center;
    color: #ffffff;
}

.profile-section {
    margin-bottom: 1rem;
}

.profile-section, .profile-name {
    font-size: 1rem;
    font-weight: 500;
    color: #d1d1d1;
    margin-bottom: 0.5rem;
}

.profile-name{
    margin-top: 0px;
    text-align: center;
    margin-bottom: 1rem;
}

.profile-pic {
    margin: auto;
    display: block;
    width: 80px;
    height: 80px; /* Match the width to enforce a square aspect ratio */
    border-radius: 50%;
    object-fit: cover; /* Ensures the image fits within its box */
    border: 1px solid #2a2a2a;
}

p {
    font-size: 0.9rem;
    color: #d1d1d1;
    margin: 0;
}

p strong {
    color: #ffffff;
}


.editable-row {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    color: #d1d1d1;
}

.editable-row:hover {
    color: #ffffff;
}

.edit-profile-button {
    background-color: #4f46e5;
    color: #ffffff;
    border: none;
    padding: 0.45rem 1rem; /* Shorter padding */
    border-radius: 8px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    width: 90%;
    margin: 1rem auto; /* Center the button */
    font-size: 1rem;
    font-weight: 500;
    transition: background-color 0.3s;
}

.edit-profile-button i {
    font-size: 1rem; /* Adjusted icon size */
}

.edit-profile-button:hover {
    background-color: #4338ca;
}
.editable-row p {
    font-size: 0.9rem;
    margin: 0;
}
h3{
    margin-bottom: 0.5rem;
}
/* Add this at the end of the file */
@media (max-width: 768px) {
  .user-profile {
    padding: 1rem;
    max-width: 100%;
  }

  .profile-title {
    font-size: 1.25rem;
  }

  .editable-row {
    flex-direction: column;
    align-items: flex-start;
  }

  .edit-profile-button {
    width: 100%;
  }
}
</style>
