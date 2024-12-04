<script>
  import Menu from "./Menu.svelte";
  import Header from "./header.svelte";
  import TimeTable from "./TimeTable.svelte";
  import Carousel from "./Carousel.svelte";
  let tabs = [
  'Home',
  'Time Sheet',
  'Tab 3',
  'Tab 4'
]
let choice = 1;

const images = [
        "https://placehold.co/1600x900?text=Image+1",
        "https://placehold.co/1600x900?text=Image+2",
        "https://placehold.co/1600x900?text=Image+3"
    ];
 
</script>

<div class="fullscreen">
  <Menu bind:choice tabs={tabs}></Menu>
  <div class="main-page">
    {#if choice === 1} 
      <Carousel {images}></Carousel>
    {:else if choice === 2}
      <Header userName="Luke Gipson"></Header>
      <TimeTable></TimeTable>
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
  background-color: #3d3d3d
}
.main-page{
  width: 100%;
  display: flex;
  flex-direction: column;
}
</style>