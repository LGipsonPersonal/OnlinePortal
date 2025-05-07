<script>
  import { onMount } from 'svelte';

  // People of contact with team property
  let peopleOfContact = $state([
    {
      id: 1,
      name: "John Doe",
      role: "Project Manager",
      profileImage: "https://via.placeholder.com/40",
      phone: "(555) 123-4567",
      email: "john.doe@example.com",
      team: "Management",
    },
    {
      id: 2,
      name: "Jane Smith",
      role: "Developer",
      profileImage: "https://via.placeholder.com/40",
      phone: "(555) 987-6543",
      email: "jane.smith@example.com",
      team: "Development",
    },
    {
      id: 3,
      name: "Alice Johnson",
      role: "Designer",
      profileImage: "https://via.placeholder.com/40",
      phone: "(555) 555-5555",
      email: "alice.johnson@example.com",
      team: "Design",
    },
    {
      id: 4,
      name: "Bob Brown",
      role: "Tester",
      profileImage: "https://via.placeholder.com/40",
      phone: "(555) 444-4444",
      email: "bob.brown@example.com",
      team: "Testing",
    },
    {
      id: 5,
      name: "John Deer",
      role: "QA Engineer",
      profileImage: "https://via.placeholder.com/40",
      phone: "(555) 123-4567",
      email: "john.deer@example.com",
      team: "Management",
    },
  ]);


  // Extract unique teams from peopleOfContact
  let teams = [...new Set(peopleOfContact.map((person) => person.team))];

  // State to track whether each team is expanded or collapsed
  let openTeams = $state(Array.from({ length: teams.length }, () => true));

  function toggleTeam(index) {
    openTeams[index] = !openTeams[index];
  }
</script>

<div class="people-of-contact">
  <h2 class="section-title">People of Contact</h2>
  {#each teams as team, i}
    <div class="team">
      <div class="team-header" on:click={() => toggleTeam(i)}>
        <h3 class="team-title">{team}</h3>
        <span class="submenu-toggle">
          {#if openTeams[i]}
            <i class="fas fa-chevron-down"></i>
          {:else}
            <i class="fas fa-chevron-up"></i>
          {/if}
        </span>
      </div>
      {#if openTeams[i]}
        <div class="contact-grid">
          {#each peopleOfContact.filter((person) => person.team === team) as person}
            <div class="contact-card">
              <div class="avatar">
                <img src={person.profileImage} alt="User Avatar" />
              </div>
              <div class="contact-info">
                <p class="name">{person.name}</p>
                <p class="role">{person.role}</p>
                <a href={`tel:${person.phone}`} class="phone">{person.phone}</a>
                <a href={`mailto:${person.email}`} class="email">{person.email}</a>
              </div>
              <button class="message-button">Send Message</button>
            </div>
          {/each}
        </div>
      {/if}
    </div>
  {/each}
</div>

<style>
  * {
    box-sizing: border-box;
  }

  .people-of-contact {
    background-color: #1e1e1e; /* Dark background */
    padding: 1rem;
    border-radius: 8px;
    color: #e0e0e0; /* Light text */
    overflow: auto;
  }

  .section-title {
    font-size: 1.5rem;
    font-weight: 700;
    margin-bottom: 1rem;
    text-align: center;
    color: #ffffff;
    border-bottom: 2px solid #4f46e5; /* Purple border */
    padding-bottom: 0.5rem;
  }

  .team {
    margin-bottom: 2rem;
  }

  .team-title {
    font-size: 1.25rem;
    font-weight: 600;
    margin-bottom: 1rem;
    color: #ffffff;
    text-align: left;
    padding-bottom: 0.5rem;
  }

  .contact-grid {
    display: flex;
    gap: 1rem;
  }
  .team-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    cursor: pointer;
    border-bottom: 1px solid #4f46e5;
  }
  .contact-card {
    display: flex;
    flex-direction: column;
    flex: 1 1 100%;
    max-width: 25rem;
    align-items: center;
    background-color: #2e2e2e; /* Darker background */
    padding: 1rem;
    border-radius: 8px;
    border: 1px solid #444444; /* Darker border */
    transition: background-color 0.2s;
    text-align: center;
  }

  .contact-card:hover {
    background-color: #3a3a3a;
  }

  .avatar {
    margin-bottom: 1rem;
  }

  .avatar img {
    width: 80px;
    height: 80px;
    border-radius: 50%;
    border: 2px solid #444444;
    object-fit: cover; /* Ensures the image maintains its aspect ratio */
  }

  .contact-info {
    margin-bottom: 1rem;
  }

  .name {
    font-size: 1.1rem;
    font-weight: 600;
    margin: 0;
    color: #e0e0e0;
  }

  .role {
    font-size: 0.9rem;
    margin: 0.25rem 0;
    color: #8b949e; /* Muted text */
  }

  .phone,
  .email {
    font-size: 0.875rem;
    color: #4f46e5; /* Purple text */
    text-decoration: none;
    display: block;
  }

  .phone:hover,
  .email:hover {
    text-decoration: underline;
  }

  .message-button {
    padding: 0.5rem 1rem;
    background-color: #4f46e5; /* Purple background */
    color: #ffffff;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    transition: background-color 0.2s;
  }

  .message-button:hover {
    background-color: #6a5acd; /* Lighter purple on hover */
  }
</style>