<script>
    import { onMount } from "svelte";

    let { profile } = $props();
    let editingField = $state(null);
    let showPassword = $state(false);

    function enableEdit(field) {
        editingField = field;
    }

    function saveEdit(field, value) {
        profile[field] = value;
        editingField = null;
    }

    onMount(() => {
        const script = document.createElement("script");
        script.src = "https://kit.fontawesome.com/a076d05399.js";
        script.crossOrigin = "anonymous";
        document.head.appendChild(script);
    });
</script>

<div class="user-profile">
    <h2 class="profile-title">User Profile</h2>

    <div class="profile-section profile-image">
        <img src="default-profile.png" alt="User Profile" class="profile-pic">
        <label class="icon-edit">
            <input type="file" class="hidden" accept="image/*">
            <i class="fas fa-edit"></i>
        </label>
    </div>

    <div class="profile-section">
        <div class="editable-row">
            <i class="fas fa-edit" onclick={() => enableEdit("username")}></i>
            <p>
                <strong>Username:</strong> {profile.username}
            </p>
        </div>
    </div>

    <div class="profile-section">
        <div class="editable-row">
            <i class="fas fa-edit" onclick={() => enableEdit("password")}></i>
            <p>
                <strong>Password:</strong> ••••••••
            </p>
        </div>
    </div>

    <div class="profile-section">
        <h3>Personal Info</h3>
        {#each ["jobTitle", "address", "phone", "workEmail"] as field}
            <div class="editable-row">
                <i class="fas fa-edit" onclick={() => enableEdit(field)}></i>
                <p>
                    <strong>{field}:</strong> {profile[field]}
                </p>
            </div>
        {/each}
    </div>

    <div class="profile-section team-info">
        <h3>Emergency Contact</h3>
        {#each ["name", "phone"] as field}
            <div class="editable-row">
                <i class="fas fa-edit" onclick={() => enableEdit(`emergencyContact.${field}`)}></i>
                <p>
                    <strong>{field}:</strong> {profile.emergencyContact[field]}
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

.editable-row i {
    font-size: 1rem;
    color: #4f46e5;
    cursor: pointer;
    transition: color 0.3s;
}

.editable-row i:hover {
    color: #4338ca;
}

.editable-row p {
    font-size: 0.9rem;
    margin: 0;
}
</style>
