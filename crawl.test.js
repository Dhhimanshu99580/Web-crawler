//importing inbuilt jest function for testing
const {test,expect,describe} = require('@jest/globals')


//importing crwal.js to test
const {normalizeURL} = require('./crawl')


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
userInputValue = 'https://blog.boot.dev/path/'





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
})

function writTest() {
    const {tempUrl,urls} = testUrl('http://blog.boot.dev/path')
    expect(tempUrl).toBe('blog.boot.dev/path')
}