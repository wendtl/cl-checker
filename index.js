var http = require('http');
const craigslist = require('node-craigslist');
var cities = ["Minneapolis"];
var searchTerms = ["Fiero"]; // Each entry runs a new search
var results = new Map();

// Create server
http.createServer(function (req, res) {

    // Get search results for each city in cities variable
    cities.forEach(function(city) {
        console.log("city is: " + city.toString());
        let client = new craigslist.Client({
            city : city
        });

        searchTerms.forEach(function(searchTerm) {
            client
                .search(searchTerm)
                .then((listings) => {
                    listings.forEach(function(listing) {
                        if( listing.pid in results ) ) {
                            results.set(listing.title, listing);
                            console.log("added " + listing.title + " to results.");
                        }
                    });
                })
                .catch((err) => {
                    console.error(err);
                });
        })
    });

    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write("<html><h1>");
    Object.keys(results).forEach(function(result) {
        res.write(result.title);
        console.log("wrote to " + result.title + "client");
    });
    res.write('Results: ' + results.length);
    res.write("</h1></html>");
    res.end('Hello World!');
}).listen(8080);


