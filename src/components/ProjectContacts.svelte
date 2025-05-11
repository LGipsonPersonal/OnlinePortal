<script>
  import { onMount } from 'svelte';
  import { slide } from 'svelte/transition';

  // People of contact with team property
  let peopleOfContact = $state([
    { id: 1, name: "John Doe", role: "Project Manager", profileImage: "https://via.placeholder.com/40", phone: "(555) 123-4567", email: "john.doe@example.com", team: "Management" },
    { id: 2, name: "Jane Smith", role: "Developer", profileImage: "https://via.placeholder.com/40", phone: "(555) 987-6543", email: "jane.smith@example.com", team: "Development" },
    { id: 3, name: "Alice Johnson", role: "Designer", profileImage: "https://via.placeholder.com/40", phone: "(555) 555-5555", email: "alice.johnson@example.com", team: "Design" },
    { id: 4, name: "Bob Brown", role: "Tester", profileImage: "https://via.placeholder.com/40", phone: "(555) 444-4444", email: "bob.brown@example.com", team: "Testing" },
    { id: 5, name: "John Deer", role: "QA Engineer", profileImage: "https://via.placeholder.com/40", phone: "(555) 123-4567", email: "john.deer@example.com", team: "Management" },
    { id: 6, name: "Emily Davis", role: "Backend Developer", profileImage: "https://via.placeholder.com/40", phone: "(555) 222-3333", email: "emily.davis@example.com", team: "Development" },
    { id: 7, name: "Michael Scott", role: "Product Owner", profileImage: "https://via.placeholder.com/40", phone: "(555) 777-8888", email: "michael.scott@example.com", team: "Management" },
    { id: 8, name: "Sarah Connor", role: "UX Designer", profileImage: "https://via.placeholder.com/40", phone: "(555) 666-7777", email: "sarah.connor@example.com", team: "Design" },
    { id: 9, name: "Tom Hardy", role: "Frontend Developer", profileImage: "https://via.placeholder.com/40", phone: "(555) 999-0000", email: "tom.hardy@example.com", team: "Development" },
    { id: 10, name: "Anna Bell", role: "Tester", profileImage: "https://via.placeholder.com/40", phone: "(555) 111-2222", email: "anna.bell@example.com", team: "Testing" },
    { id: 11, name: "Chris Evans", role: "DevOps Engineer", profileImage: "https://via.placeholder.com/40", phone: "(555) 333-4444", email: "chris.evans@example.com", team: "Operations" },
    { id: 12, name: "Jessica Alba", role: "Scrum Master", profileImage: "https://via.placeholder.com/40", phone: "(555) 555-6666", email: "jessica.alba@example.com", team: "Management" },
    { id: 13, name: "Mark Ruffalo", role: "Database Administrator", profileImage: "https://via.placeholder.com/40", phone: "(555) 888-9999", email: "mark.ruffalo@example.com", team: "Operations" },
    { id: 14, name: "Sophia Turner", role: "Graphic Designer", profileImage: "https://via.placeholder.com/40", phone: "(555) 444-5555", email: "sophia.turner@example.com", team: "Design" },
    { id: 15, name: "Liam Neeson", role: "Security Analyst", profileImage: "https://via.placeholder.com/40", phone: "(555) 222-4444", email: "liam.neeson@example.com", team: "Security" },
    { id: 16, name: "Emma Watson", role: "Content Strategist", profileImage: "https://via.placeholder.com/40", phone: "(555) 333-5555", email: "emma.watson@example.com", team: "Marketing" },
    { id: 17, name: "Daniel Craig", role: "Automation Tester", profileImage: "https://via.placeholder.com/40", phone: "(555) 666-8888", email: "daniel.craig@example.com", team: "Testing" },
    { id: 18, name: "Olivia Wilde", role: "SEO Specialist", profileImage: "https://via.placeholder.com/40", phone: "(555) 777-9999", email: "olivia.wilde@example.com", team: "Marketing" },
    { id: 19, name: "Henry Cavill", role: "Cloud Architect", profileImage: "https://via.placeholder.com/40", phone: "(555) 000-1111", email: "henry.cavill@example.com", team: "Operations" },
    { id: 20, name: "Scarlett Johansson", role: "Social Media Manager", profileImage: "https://via.placeholder.com/40", phone: "(555) 222-3333", email: "scarlett.johansson@example.com", team: "Marketing" },
    { id: 21, name: "Tom Holland", role: "Junior Developer", profileImage: "https://via.placeholder.com/40", phone: "(555) 444-5555", email: "tom.holland@example.com", team: "Development" },
    { id: 22, name: "Zendaya Coleman", role: "UI Designer", profileImage: "https://via.placeholder.com/40", phone: "(555) 666-7777", email: "zendaya.coleman@example.com", team: "Design" },
    { id: 23, name: "Chris Hemsworth", role: "System Administrator", profileImage: "https://via.placeholder.com/40", phone: "(555) 888-9999", email: "chris.hemsworth@example.com", team: "Operations" },
    { id: 24, name: "Natalie Portman", role: "Business Analyst", profileImage: "https://via.placeholder.com/40", phone: "(555) 000-2222", email: "natalie.portman@example.com", team: "Management" },
    { id: 25, name: "Ryan Reynolds", role: "Performance Tester", profileImage: "https://via.placeholder.com/40", phone: "(555) 333-4444", email: "ryan.reynolds@example.com", team: "Testing" },
    { id: 26, name: "Joe Dirt", role: "Project Manager", profileImage: "https://via.placeholder.com/40", phone: "(555) 123-4567", email: "joeDirt@example.com", team: "Management" },
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
        <div class="contact-grid" transition:slide>
          {#each peopleOfContact.filter((person) => person.team === team) as person}
            <div class="contact-card">
              <p class="name">{person.name}</p>
              <p class="role">{person.role}</p>
              <a href={`tel:${person.phone}`} class="phone">{person.phone}</a>
              <a href={`mailto:${person.email}`} class="email">{person.email}</a>
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
    padding: 1rem;
    border-radius: 8px;
    color: #e0e0e0; /* Light text */
    overflow: auto;
    width: 100%;

  }

  .section-title {
    font-size: 1.5rem;
    font-weight: 700;
    margin-bottom: 0.5rem;
    text-align: center;
    color: #ffffff;
    border-bottom: 2px solid #4f46e5; /* Purple border */
    padding-bottom: 0.5rem;
  }

  .team {
    overflow-x: auto; /* Enable horizontal scrolling */
    scroll-behavior: smooth; /* Smooth scrolling */

  }

  .team-title {
    font-size: 1.25rem;
    font-weight: 600;
    margin: 0;
    color: #ffffff;
    text-align: left;
    padding-bottom: 0.5rem;
    padding-top: 1rem;
  
  }

  .contact-grid {
    flex:0;
    display: flex;
    width: 800px;
    gap: 1rem;
    padding-left: 0.5rem;
    overflow-x: auto; /* Enable horizontal scrolling */
    scroll-behavior: smooth; /* Smooth scrolling */
    white-space: nowrap; /* Prevent wrapping of cards */
  }

  .contact-grid::-webkit-scrollbar {
    height: 8px; /* Height of the horizontal scrollbar */
  }

  .contact-grid::-webkit-scrollbar-thumb {
    background-color: #4f46e5; /* Purple scrollbar thumb */
    border-radius: 4px;
  }

  .contact-grid::-webkit-scrollbar-track {
    background-color: #2e2e2e; /* Darker background for the scrollbar track */
  }

  .team-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    cursor: pointer;
    border-bottom: 1px solid #4f46e5;
    margin-bottom: 0.8rem;
  }
  .contact-card {
    flex: 0 0 18rem; /* Fixed width for each card */
    max-height: 12.4rem;
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