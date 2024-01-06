const { argv } = require('node:process')
const {crawlPage} = require('./crawl.js')
const {printReport} = require('./report.js')

async function main() {
  if(argv.length <=2 || argv.length>3) {
    console.log("Invalid Cli argument")
  } else {
    console.log("Hold on...I will start the crawl for..",argv[2])
    let pages = {}
    pages = await crawlPage(argv[2],argv[2],pages)
    //console.log(pages)
    //console.log(Object.keys(pages).length)
    printReport(pages)
  }
}



main()