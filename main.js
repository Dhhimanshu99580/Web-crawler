const { argv } = require('node:process')
const {crawlPage} = require('./crawl.js')


function main() {
  if(argv.length <=2 || argv.length>3) {
    console.log("Invalid Cli argument")
  } else {
    console.log("Hold on...I will start the crawl for..",argv[2])
    crawlPage(argv[2])
  }
}



main()