const url = require('node:url')

//function to destructure the url and get a normalized output

function normalizeURL(url) {
    try {
        const myURL = new URL(url)
        const path = myURL.pathname.startsWith('/') ? myURL.pathname : `/${myURL.pathname}`
        const normalizedURL = `${myURL.hostname}${path}`
        return normalizedURL.endsWith('/') ? normalizedURL.slice(0, -1) : normalizedURL
    } catch (error) {
        return error.message
    }
}

//this function will traverse the html page and get me the list 
//of all the link URLs
// we are using 3rd part library JSDOM(read about it)

function getURLsFromHTML() {
    
}




module.exports = {
    normalizeURL
}