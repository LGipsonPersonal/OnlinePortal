<script>
  import { onMount } from 'svelte';
  import { profile } from '$assets/store.svelte.js';

  let peopleOfContact = $state([
    {
      id: 1,
      name: "John Doe",
      role: "Project Manager",
      profileImage: "https://via.placeholder.com/40",
      phone: "(555) 123-4567",
      email: "john.doe@example.com"
    },
    {
      id: 2,
      name: "Jane Smith",
      role: "Developer",
      profileImage: "https://via.placeholder.com/40",
      phone: "(555) 987-6543",
      email: "jane.smith@example.com"
    },
    {
      id: 3,
      name: "Alice Johnson",
      role: "Designer",
      profileImage: "https://via.placeholder.com/40",
      phone: "(555) 555-5555",
      email: "alice.johnson@example.com"
    }
  ]);

  function sendMessage(person) {
    console.log(`Sending message to ${person.name}`);
    // Implement message sending logic here
  }
</script>

<div class="people-of-contact">
  <h2 class="section-title">People of Contact</h2>
  <div class="contact-list">
    {#each peopleOfContact as person}
      <div class="contact-item">
        <div class="avatar">
          <img src={person.profileImage} alt="User Avatar" />
        </div>
        <div class="contact-info">
          <p class="name">{person.name}</p>
          <p class="role">{person.role}</p>
          <a href={`tel:${person.phone}`} class="phone">{person.phone}</a>
          <a href={`mailto:${person.email}`} class="email">{person.email}</a>
        </div>
        <button class="message-button" onclick={() => sendMessage(person)}>Send Message</button>
      </div>
    {/each}
  </div>
</div>

<style>
  * {
    box-sizing: border-box;
  }

  .people-of-contact {
    background-color: #1e1e1e; /* Dark background */
    padding: 1rem;
    border-radius: 8px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
    color: #e0e0e0; /* Light text */
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

  .contact-list {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  .contact-item {
    display: flex;
    align-items: center;
    background-color: #2e2e2e; /* Darker background */
    padding: 1rem;
    border-radius: 8px;
    border: 1px solid #444444; /* Darker border */
    transition: background-color 0.2s;
  }

  .contact-item:hover {
    background-color: #3a3a3a;
  }

  .avatar {
    flex: 0 0 auto;
    display: flex;
    margin-right: 1rem;
  }

  .avatar img {
    flex: 0 0 auto;
    width: 40px !important;
    height: 40px !important;
    border-radius: 50%;
    border: 1px solid #444444;
    object-fit: cover; /* Ensures the image maintains its aspect ratio */
  }

  .contact-info {
    flex: 1;
  }

  .name {
    font-size: 1rem;
    font-weight: 600;
    margin: 0;
    color: #e0e0e0;
  }

  .role {
    font-size: 0.875rem;
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