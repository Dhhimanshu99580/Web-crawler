const url = require('node:url')
const jsdom = require('jsdom')

//const jsdom = require("./node_modules/jsdom")
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



function getURLsFromHTML(html,baseURL) {
    try {
        
        const { JSDOM } = jsdom
        const { document } = new JSDOM(html).window
        //const document = window.document
        const arrOfLinks  = document.querySelectorAll('a')
        const url = []
        for(let i=0;i<arrOfLinks.length;i++) {
            if(arrOfLinks[i].href.slice(0,1)==='/') {
                try {
                    url.push(new URL(arrOfLinks[i].href,baseURL).href)
                } catch (err) {
                    console.log(`${err.message}: ${arrOfLinks[i].href}`)
                }
            } else {
                try {
                    url.push(new URL(arrOfLinks[i].href).href)
                } catch (error) {
                    console.log(`${error.message}: ${arrOfLinks[i].href}`)
                }
            }
        }
        return url
    } catch (error) {
        return error.message
    }
    
}

//function to crawl the webpage

async function crawlPage(baseURL,currentURL,pages) {
     
  const currentUrlObj = new URL(currentURL)
  const baseUrlObj = new URL(baseURL)
  if (currentUrlObj.hostname !== baseUrlObj.hostname){
    return pages
  }
  
  const normalizedURL = normalizeURL(currentURL)

  if (pages[normalizedURL] > 0){
    pages[normalizedURL]++
    return pages
  }

  if (currentURL === baseURL){
    pages[normalizedURL] = 0
  } else {
    pages[normalizedURL] = 1
  }

  //console.log(`crawling ${currentURL}`)
  let htmlBody = ''
  try {
    const resp = await fetch(currentURL)
    if (resp.status > 399){
      console.log(`Got HTTP error, status code: ${resp.status}`)
      return pages
    }
    const contentType = resp.headers.get('content-type')
    if (!contentType.includes('text/html')){
      console.log(`Got non-html response: ${contentType}`)
      return pages
    }
    htmlBody = await resp.text()
  } catch (err){
    console.log(err.message)
  }

  const nextURLs = getURLsFromHTML(htmlBody, currentURL)
  //console.log(nextURLs)
  for (const nextURL of nextURLs){
    pages = await crawlPage(baseURL, nextURL, pages)
  }

  return pages
  }
  




module.exports = {
    normalizeURL,
    getURLsFromHTML,
    crawlPage
}