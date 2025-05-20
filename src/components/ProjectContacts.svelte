<script>
  import { onMount } from 'svelte';
  import { slide } from 'svelte/transition';

  // --- Data ---
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

  // --- State for UI ---
  let searchTerm = $state('');
  let selectedTeam = $state('All');
  let selectedRole = $state('All');
  let sortBy = $state('name'); // or 'role'
  let sortDirection = $state('asc');

  // Extract unique teams and roles
  let teams = ['All', ...new Set(peopleOfContact.map((p) => p.team))];
  let roles = ['All', ...new Set(peopleOfContact.map((p) => p.role))];

  // Collapsible state
  let openTeams = $state(Array.from({ length: teams.length - 1 }, () => false)); // -1 for 'All'

  // --- Filtering, Searching, Sorting ---
  function getFilteredContacts(team) {
    let filtered = peopleOfContact;

    if (selectedTeam !== 'All') {
      filtered = filtered.filter(p => p.team === selectedTeam);
    } else if (team !== 'All') {
      filtered = filtered.filter(p => p.team === team);
    }

    if (selectedRole !== 'All') {
      filtered = filtered.filter(p => p.role === selectedRole);
    }

    if (searchTerm.trim()) {
      const term = searchTerm.trim().toLowerCase();
      filtered = filtered.filter(
        p =>
          p.name.toLowerCase().includes(term) ||
          p.role.toLowerCase().includes(term) ||
          p.email.toLowerCase().includes(term)
      );
    }

    filtered = filtered.slice().sort((a, b) => {
      let valA = a[sortBy].toLowerCase();
      let valB = b[sortBy].toLowerCase();
      if (valA < valB) return sortDirection === 'asc' ? -1 : 1;
      if (valA > valB) return sortDirection === 'asc' ? 1 : -1;
      return 0;
    });

    return filtered;
  }

  function toggleTeam(index) {
    openTeams[index] = !openTeams[index];
  }

  function copyToClipboard(text) {
    navigator.clipboard.writeText(text);
  }

  function setSort(field) {
    if (sortBy === field) {
      sortDirection = sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      sortBy = field;
      sortDirection = 'asc';
    }
  }
</script>

<div class="people-of-contact">
  <h2 class="section-title">People of Contact</h2>
  <div class="controls">
    <input
      type="text"
      placeholder="Search by name, role, or email"
      bind:value={searchTerm}
      class="search-input"
    />
    <select bind:value={selectedTeam} class="filter-select">
      {#each teams as team}
        <option value={team}>{team}</option>
      {/each}
    </select>
    <select bind:value={selectedRole} class="filter-select">
      {#each roles as role}
        <option value={role}>{role}</option>
      {/each}
    </select>
    <button class="sort-btn" on:click={() => setSort('name')}>
      Sort by Name {sortBy === 'name' ? (sortDirection === 'asc' ? '▲' : '▼') : ''}
    </button>
    <button class="sort-btn" on:click={() => setSort('role')}>
      Sort by Role {sortBy === 'role' ? (sortDirection === 'asc' ? '▲' : '▼') : ''}
    </button>
  </div>
  <div class="box">
    {#each teams.slice(1) as team, i} <!-- skip 'All' -->
      {#if selectedTeam === 'All' || selectedTeam === team}
        <div class="team">
          <div class="team-header" on:click={() => toggleTeam(i)}>
            <h3 class="team-title">{team}</h3>
            <div class="submenu-toggle">
              {#if openTeams[i]}
                <i class="fas fa-chevron-down"></i>
              {:else}
                <i class="fas fa-chevron-up"></i>
              {/if}
            </div>
          </div>
          {#if openTeams[i]}
            <div class="contact-grid" transition:slide>
              {#each getFilteredContacts(team) as person}
                <div class="contact-card">
                  <p class="name">{person.name}</p>
                  <p class="role">{person.role}</p>
                  <div class="contact-actions">
                    <a href={`tel:${person.phone}`} class="icon-btn" title="Call">
                      <i class="fas fa-phone"></i>
                    </a>
                    <button class="icon-btn" title="Copy phone" on:click={() => copyToClipboard(person.phone)}>
                      <i class="fas fa-copy"></i>
                    </button>
                    <a href={`mailto:${person.email}`} class="icon-btn" title="Email">
                      <i class="fas fa-envelope"></i>
                    </a>
                    <button class="icon-btn" title="Copy email" on:click={() => copyToClipboard(person.email)}>
                      <i class="fas fa-copy"></i>
                    </button>
                  </div>
                  <a href={`tel:${person.phone}`} class="phone">{person.phone}</a>
                  <a href={`mailto:${person.email}`} class="email">{person.email}</a>
                </div>
              {/each}
            </div>
          {/if}
        </div>
      {/if}
    {/each}
  </div>
</div>

<style>
.people-of-contact {
  padding: 1.5rem;
  background-color: #f9f9fc;
  font-family: 'Segoe UI', sans-serif;
  overflow: auto;
}
.section-title {
  font-size: 2rem;
  font-weight: 600;
  margin-top: 0;
  margin-bottom: 1rem;
  text-align: center;
  color: #2c3e50;
}
.controls {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  margin-bottom: 1.5rem;
  align-items: center;
  justify-content: center;
}
.search-input {
  padding: 0.5rem 1rem;
  border-radius: 6px;
  border: 1px solid #dfe6e9;
  font-size: 1rem;
  min-width: 220px;
}
.filter-select {
  padding: 0.5rem 1rem;
  border-radius: 6px;
  border: 1px solid #dfe6e9;
  font-size: 1rem;
  background: #fff;
}
.sort-btn {
  padding: 0.5rem 1rem;
  border-radius: 6px;
  border: 1px solid #6366f1;
  background: #fff;
  color: #6366f1;
  font-weight: 500;
  cursor: pointer;
  transition: background 0.15s;
}
.sort-btn:hover {
  background: #6366f1;
  color: #fff;
}
.box {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
.team {
  border: 1px solid #dfe6e9;
  border-radius: 8px;
  overflow: hidden;
  background-color: #fff;
}
.team-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.75rem 1rem;
  cursor: pointer;
  background-color: #ecf0f1;
  transition: background 0.2s ease-in-out;
}
.team-header:hover {
  background-color: #dfe6e9;
}
.team-title {
  font-size: 1.25rem;
  font-weight: 500;
  margin: 0;
  color: #34495e;
}
.submenu-toggle i {
  font-size: 1rem;
  color: #7f8c8d;
  transition: transform 0.3s ease;
}
.contact-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 1rem;
  padding: 1rem;
  background-color: #fff;
}
.contact-card {
  background-color: #f1f2f6;
  border-radius: 8px;
  padding: 1rem;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.05);
  transition: transform 0.2s;
}
.contact-card:hover {
  transform: translateY(-2px);
}
.name {
  font-weight: 600;
  font-size: 1rem;
  margin-bottom: 0.25rem;
  color: #2c3e50;
}
.role {
  font-size: 0.9rem;
  color: #636e72;
  margin-bottom: 0.5rem;
}
.contact-actions {
  display: flex;
  gap: 0.5rem;
  margin-bottom: 0.5rem;
}
.icon-btn {
  background: none;
  border: none;
  color: #6366f1;
  font-size: 1.1rem;
  cursor: pointer;
  padding: 0.2rem;
  border-radius: 4px;
  transition: background 0.15s;
}
.icon-btn:hover {
  background: #e0e7ff;
  color: #2c3e50;
}
.phone,
.email {
  display: block;
  font-size: 0.85rem;
  color: #0984e3;
  text-decoration: none;
  margin-bottom: 0.25rem;
  word-break: break-word;
}
.phone:hover,
.email:hover {
  text-decoration: underline;
}
</style>