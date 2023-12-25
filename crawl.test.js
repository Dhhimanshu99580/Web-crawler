//importing inbuilt jest function for testing
const {test,expect,describe} = require('@jest/globals')


//importing crwal.js to test
const {normalizeURL,getURLsFromHTML} = require('./crawl.js')


/*const readline = require('readline')
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  })
  
r1.question('Enter url:',(userInput)=>{
    console.log('You entered: ',userInput)
    userInputValue = userInput
    r1.close()
})*/

const testUrl = (url) => {
    const urls = {}

    const tempUrl = normalizeURL(url)

    if(tempUrl in urls) {
        urls[tempUrl] = urls[tempUrl]+1
    } else {
        urls[tempUrl] = 1
    }
    return {tempUrl,urls}
}

describe("Tests for checking url path",() => {
    test('first test for url',() => {
        const {tempUrl,urls} = testUrl('https://blog.boot.dev/path/')
        expect(tempUrl).toBe('blog.boot.dev/path')
    })

    test('2nd test case', writTest)

    function writTest() {
        const {tempUrl,urls} = testUrl('http://blog.boot.dev/path')
        expect(tempUrl).toBe('blog.boot.dev/path')
    }
})



describe("Test for getting array of Links", () => {
    test('First test for baseURL',() => {
        const arr = getURLsFromHTML(htmlContent,'https://www.example.com')
        //expect(arr).toHaveLength(4)
        console.log(arr[1])
        expect(arr[0]).toBe('https://www.example.com/page1.html')
    })
    const htmlContent = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Sample HTML Page</title>
</head>
<body>
    <h1>Sample HTML Page</h1>
    <ul>
        <li><a href="/page1.html">Link to Page 1</a></li>
        <li><a href="https://www.example.com/page2.html">Link to Page 2</a></li>
        <li><a href="subfolder/page3.html">Link to Page 3</a></li>
        <li><a href="https://www.anotherdomain.com/page4.html">Link to Page 4</a></li>
    </ul>
</body>
</html>
`
    
})

/*
test('getURLsFromHTML absolute', () => {
    const inputURL = 'https://blog.boot.dev'
    const inputBody = '<html><body><a href="https://blog.boot.dev"><span>Boot.dev></span></a></body></html>'
    const actual = getURLsFromHTML(inputBody, inputURL)
    const expected = [ 'https://blog.boot.dev/' ]
    expect(actual).toEqual(expected)
  })
  */
