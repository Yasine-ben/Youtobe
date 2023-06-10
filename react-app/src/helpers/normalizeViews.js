
function normalizeViews(views) {
    const abbreviations = {
        K: 1000,
        M: 1000000,
        B: 1000000000
    };

    // Loop through the abbreviations in descending order
    const sortedKeys = Object.keys(abbreviations).sort((a, b) => abbreviations[b] - abbreviations[a]);

    for (let key of sortedKeys) {
        const value = abbreviations[key];

        if (views >= value) {
            const normalizedViews = parseFloat((views / value).toFixed(1));
            return normalizedViews + key;
        }
    }

    return views.toString();
}

export default normalizeViews