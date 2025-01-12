<script>
    // @ts-ignore
    import { profile } from "$assets/store.svelte.js";
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
    <h2 class="profile-title">User Profile</h2>

    <div class="profile-section profile-image">
        <img src="default-profile.png" alt="User Profile" class="profile-pic">
        {#if editing}
            <label class="icon-edit">
                <input type="file" class="hidden" accept="image/*">
                <i class="fas fa-edit"></i>
            </label>
        {/if}
    </div>

    <button class="edit-profile-button" onclick={toggleEdit}>
        <i class="fas fa-edit"></i>
        {editing ? "Save Changes" : "Edit Profile"}
    </button>

    <div class="profile-section">
        <div class="editable-row">
            <p>
                <strong>Username:</strong>
                {#if editing}
                    <input 
                        type="text" 
                        bind:value={profile.username} 
                    />
                {:else}
                    {profile.username}
                {/if}
            </p>
        </div>
    </div>

    <div class="profile-section">
        <div class="editable-row">
            <p>
                <strong>Password:</strong>
                {#if editing}
                    <input 
                        type="password" 
                        bind:value={profile.password}
                    />
                {:else}
                    ••••••••
                {/if}
            </p>
        </div>
    </div>

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

.profile-pic {
    display: block;
    width: 80px;
    height: 80px;
    margin: 0 auto 0.5rem;
    border-radius: 50%;
    object-fit: cover;
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

.hidden {
    display: none;
}

.icon-edit {
    position: relative;
    display: inline-block;
    cursor: pointer;
    color: #ffffff;
    margin-top: 8px;
    text-align: center;
}

.icon-edit i {
    font-size: 1.2rem;
    background: #4f46e5;
    border-radius: 50%;
    padding: 0.4rem;
    transition: background-color 0.3s;
}

.icon-edit i:hover {
    background: #4338ca;
}

.editable-row {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    cursor: pointer;
    color: #d1d1d1;
}

.editable-row:hover {
    color: #ffffff;
}

.edit-profile-button {
    background-color: #4f46e5;
    color: #ffffff;
    border: none;
    padding: 0.75rem 1.5rem;
    border-radius: 8px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    width: 100%;
    max-width: 200px;
    margin: 0.5rem auto;
    font-size: 1rem;
    font-weight: 500;
    transition: background-color 0.3s;
}

.edit-profile-button i {
    font-size: 1.2rem;
}

.edit-profile-button:hover {
    background-color: #4338ca;
}
.editable-row p {
    font-size: 0.9rem;
    margin: 0;
}
</style>
