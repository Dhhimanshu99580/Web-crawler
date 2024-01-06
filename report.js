function printReport(pages) {
    console.log("Report is getting ready......")
    const keyValueArray = Object.entries(pages);

// Sort the array in descending order based on values using a regular function
    keyValueArray.sort(function(a, b) {
    return b[1] - a[1];
    })

     pages = Object.fromEntries(keyValueArray)

    for(const key in pages) {
        console.log(`Found ${pages[key]} internal links to ${key}`)
    }
}

module.exports = {
    printReport
}