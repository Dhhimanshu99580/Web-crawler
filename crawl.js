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

async function crawlPage(url) {
    try {
      const response = await fetch(url, {
        method: 'GET',
      });
  
      if (response.status >= 400) {
        console.log('Client-side issue:', response.status);
        return;
      }
  
      const contentType = response.headers.get('Content-Type');
  
      if (!contentType || !contentType.includes('text/html')) {
        console.log('Response does not contain HTML/text:', contentType);
        return;
      }
  
       console.log('Content-Type:', contentType);
       const htmlContent = await response.text();
       console.log('HTML Content:', htmlContent);
    } catch (error) {
      console.error('Error:', error.message);
    }
  }
  




module.exports = {
    normalizeURL,
    getURLsFromHTML,
    crawlPage
}