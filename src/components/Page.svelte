<script>
  import Menu from "./Menu.svelte";
  import Header from "./header.svelte";
  import TimeTable from "./TimeTable.svelte";
  import Carousel from "./Carousel.svelte";
  import TimeOff from "./TimeOff.svelte";
  import Breadcrumbs from "./Breadcrumbs.svelte";
  let tabs = [
    {
      name: "Home",
      key: '0',
      subtabs: [
        { name: "Dashboard", key: "0-0" },
        { name: "Notifications", key: "0-1" },
      ],
    },
    {
      name: "Time Sheet",
      key: '1',
      subtabs: [
        { name: "Weekly View", key: "1-0" },
        { name: "Monthly View", key: "1-1" },
      ],
    },
    {
      name: "Request Time Off",
      key: '2',
      subtabs: [
        { name: "Submit Request", key: "2-0" },
        { name: "Request History", key: "2-1" },
      ],
    },
    {
      name: "My Profile",
      key: '3',
      subtabs: [
        { name: "Edit Profile", key: "3-0" },
        { name: "Change Password", key: "3-1" },
      ],
    },
    {
      name: "Documents",
      key: '4',
      subtabs: [
        { name: "Upload Document", key: "4-0" },
        { name: "View Documents", key: "4-1" },
      ],
    },
  ];

  let choice = $state(1);

  let currentTabs = $derived([tabs[choice - 1]]);

  const images = [
    "https://placehold.co/1600x900?text=Image+1",
    "https://placehold.co/1600x900?text=Image+2",
    "https://placehold.co/1600x900?text=Image+3",
  ];
</script>

<div class="fullscreen">
  <Menu bind:choice {tabs}></Menu>
  <div class="main-page">
    <Breadcrumbs {currentTabs}></Breadcrumbs>
    {#if choice === 1}
      <Carousel {images}></Carousel>
    {:else if choice === 2}
      <Header userName="Luke Gipson"></Header>
      <TimeTable></TimeTable>
    {:else if choice === 3}
      <TimeOff></TimeOff>
    {/if}
  </div>
</div>

<style>
  .fullscreen {
    position: fixed; /* Ensures the div stays in place even when scrolling */
    display: flex;
    top: 0;
    left: 0;
    width: 100vw; /* Full viewport width */
    height: 100vh; /* Full viewport height */
    background-color: var(--main-bg-color);
  }
  .main-page {
    width: 100%;
    display: flex;
    flex-direction: column;
  }
</style>
