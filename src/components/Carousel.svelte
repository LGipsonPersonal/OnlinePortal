<script>

    let { images } = $props();
    let currentIndex = $state(0);


    function next() {
        currentIndex = (currentIndex + 1) % images.length; // Loop back to start
    }

    function prev() {
        currentIndex = (currentIndex - 1 + images.length) % images.length; // Loop back to end
    }

</script>

<div class="carousel">
    <div class="carousel-track" style="transform: translateX(-{currentIndex * 100}%);">
        {#each images as image}
            <img src={image} alt="carousel Item" class="carousel-item" />
        {/each}
    </div>
    <button class="prev" onclick={prev}>❮</button>
    <button class="next" onclick={next}>❯</button>
</div>
<div class="dots">
    {#each images as _, i}
        <div
          tabindex="0"
          class="bottom-buttons"
          aria-label="caroseul button"
          class:dots-active={i === currentIndex}
          onclick={() => currentIndex = i}
        ></div>
    {/each}
</div>

<style>
.carousel {
    width:1000px;
    height: 500px; /* Adjust as needed */
    position: relative;
    overflow: hidden;


}

.carousel-track {
    display: flex;
    flex: 0;
    transition: transform 0.5s ease;
}

.carousel-item {
    min-width: 100%;
    object-fit:cover;
}

.prev, .next {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    background: rgba(0, 0, 0, 0.5);
    color: white;
    border: none;
    cursor: pointer;
    font-size: 2rem;
    padding: 0.5rem;
}

.prev {
    left: 10px;
}

.next {
    right: 10px;
}
.dots {
    display: flex;
    margin-left: 480px;
    margin-top: 10px;
}

.bottom-buttons{
    width: 10px;
    height: 10px;
    border: none;
    border-radius: 50%;
    margin: 0 5px;
    background: lightgray;
    cursor: pointer;
}

.dots-active {
    background: black;
}
</style>
