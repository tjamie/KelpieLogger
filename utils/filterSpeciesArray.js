export const filterSpeciesArray = (regionArray, filterString) => {
    // regionArray is all items in target region's regional plant list
    let i = 0;
    return regionArray.reduce((output, currentItem) => {
        if (
            currentItem["Scientific Name"].toLowerCase().includes(filterString.toLowerCase()) ||
            currentItem["Common Name"].toLowerCase().includes(filterString.toLowerCase())
        ) {
            const newIndicatorObject = {
                id: i,
                // title: `${currentItem["Common Name"]} (${currentItem["Scientific Name"]})`,
                commonName: currentItem["Common Name"],
                scientificName: currentItem["Scientific Name"],
                indicatorStatus: currentItem["Status"]
            };
            // console.log("new obj:", newIndicatorObject);
            ++i;
            // console.log("output:", output);
            return [...output, newIndicatorObject];
        } else {
            return output;
        }
    }, []);
};
