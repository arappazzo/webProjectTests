<script>
    // this is the name of the element coming from +page.js
    export let data = [];

    $: extractedData = Array.isArray(data.data) ? data.data : [];
    
    // Initialize currId and currCode ONLY once when extractedData is first populated
    let currId = -1;
    let currCode = '';

    // only once extractedData is first populated set currId and currCode
    $: if (currId === -1 && extractedData.length > 0) {
        currId = extractedData[0]?.id ?? 0;
        currCode = extractedData[0]?.singleItem_code ?? '';
    }

    const handleClick = (incomingsingleItem) => {
        currId = incomingsingleItem.id;
        currCode = incomingsingleItem.singleItem_code;
    };

    let sortedAscending = true;
    const sortData = () => {
        sortedAscending = !sortedAscending;

        // Use a new sorted array instead of modifying extractedData directly
        extractedData = [...extractedData].sort((a, b) => sortedAscending ? a.id - b.id : b.id - a.id);
    };
</script>

<button class="sort-btn" on:click={sortData}>Sort by ID</button>

<div class="top-right">
    <h3>CurrId: {currId} currCode: {currCode}</h3>
</div>

{#if extractedData.length > 0}
    {#each extractedData as singleItem}
        <div class="singleItem-info {currId === singleItem.id ? 'selected' : ''}" on:click={() => handleClick(singleItem)}>
            <h3>ID: {singleItem.id}</h3>
            <h3>Code: {singleItem.singleItem_code}</h3>
            <p></p>
        </div>
    {/each}
{:else}
    <p>Loading or no data available...</p>
{/if}

<style>

    .sort-btn{
        position: fixed;
        top: 150px; /* Adjust distance from top */
        right: 50px; /* Adjust distance from right */
    }

    .singleItem-info {
        display: flex;
        gap: 10px; /* Adds spacing between elements */
        margin-bottom: 15px; /* Adds vertical spacing */
        padding: 10px; /* Adds internal spacing */
        background-color: #a56d4a;
        max-width: 500px;
        justify-content: center;
        align-items: center;
        cursor: pointer;
    }

    .singleItem-info:hover{
        background-color: #a784e3;
    }


    .top-right {
        position: fixed;
        top: 10px;
        right: 10px;
        background-color: #4a90e2;
        padding: 10px;
        color: white;
        border-radius: 5px;
    }


    .selected {
        background-color: yellow;
    }
</style>