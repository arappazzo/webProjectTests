export async function load({ fetch }) {
    console.log("Starting load function...");
    try {
        const res = await fetch('/api/data');
        console.log("Fetch request sent...");

        const rawData = await res.json();
        console.log("rawData received, isArray: ", Array.isArray(rawData));

        return { data: Array.isArray(rawData) ? rawData : [] };
    } catch (error) {
        console.error("ERROR in load():", error);
        return { data: [] };
    }
}

