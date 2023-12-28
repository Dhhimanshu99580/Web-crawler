# Web-crawler
Web Crawler in JavaScript using Node.js

# Overview
This project is a JavaScript application that generates an "internal links" report for website by crawling each page of the site. 

# Getting Started
1. Clone the Repository:
    git clone https://github.com/your-username/web-crawler.git
    cd web-crawler
2. Install Dependencies:
    nvm install
    npm install
3. Run the Web Crawler:
    npm start -- https://example.com

# Testing
The project uses Jest for test-driven development. Run tests using:
    npm test

# Future Enhancements
1. Scheduled Execution
2. Add more robust error checking to crawl larger sites without issues
3. Use a graphics library to create a graph visualization of the links between pages
4. Make requests concurrently to speed up the crawling process

# Docker Usage
1. Build Docker Image:
   docker build -t web-crawler .
2. Run Docker Container:
   docker run -it --rm web-crawler ${`url of website which you want to crawl`}

