// muse description grabber

var data = require("./MUSE.json");
var newData = [];
var cheerio = require('cheerio');
var rp = require('request-promise');
var fs = require('fs');



var scrape = (obj) => {
    rp(obj.href).then(function (html) {
        var $ = cheerio.load(html);
        // console.log($('div.bio').text());
        obj.desc =  $('div.bio').text();
        newData.push(obj);
        
    })
}

var doit = () => {
    for (i in data) {       
        var obj = data[i];
        scrape(obj);
    }
}


var makeFile = (obj) => {
    var json = JSON.stringify(obj);
    fs.writeFile('./NEWMUSE.json', json, 'utf8', ()=>{
        console.log('NEWMUSE.json created');
    })
}



doit();

setTimeout(()=>{
    console.log(newData);
    makeFile(newData)
}, 12000);



// router.get("/scrape/:make", function(req, res) {
	
	
// 	console.log('hi');
// 	console.log(req.params.make);
// 	var url = clSearch(false, 3000, 6000, req.params.make,  170000, false);
  	

//   	// Scrape data from craigslist search page and get url's of matching cars
//   	rp(url).then(function (html) {
// 	    var $ = cheerio.load(html);
// 	    // console.log(url);

// 	    var results = $('a.result-title');
// 	    // console.log('results:  ***********');
// 	    // console.log(results);
// 	    for (var i = 0; i < results.length; i++) {
// 	    	// console.log('*****************************************************************')
// 	    	// console.log(results[i]['attribs'].href);
// 	    	// console.log(results[i]['children'][0].data);

// 	    	let link = results[i]['attribs'].href;
// 	    	var title = results[i]['children'][0].data;

// 	    	link = urlGen(link);

// 	    	//going to indvidual cl pages and scraping title, post, and images
// 	    	rp(link).then(function (html2) {
// 			    // Load the html body from request into cheerio
// 			    // console.log(link);
// 			    var $ = cheerio.load(html2);
// 			    var script = $('script');
// 			    var title = $('#titletextonly')[0].children[0]['data'];
// 			    var post = $('#postingbody')[0]['children'][2].data;
// 			    var price = $('.price')[0].children[0]['data'];
// 			    // console.log(price);
// 			    // console.log(post);
// 			    try {
// 			    	var current = script[2].children[0]['data'];
// 			    	var picsJson = JSON.parse(current.substr(19).slice(0, -5));
// 			    	// console.log(title);
// 			    	// console.log(picsJson);
// 			    	// console.log(picsJson);
// 			    	var tempPics = [];
// 			    	for (var i = 0; i < picsJson.length; i++){
// 			    		tempPics.push(picsJson[i].url);
// 			    	}
// 			    	// console.log(tempPics);
// 			    }
// 			    catch (e) {
// 			    	// 	console.log('*/*/*/*/*/*/*/*/*/*/*/*/');
// 						// console.log('NO PICS');
// 						var tempPics = [];
// 			    }

// 				let clid = link.slice(link.length-15, link.length-5);

// 				if (title && link) { 
	      	
// 			        // Save the data in the craigslistCars collection
// 			        var obj = {
// 							title: title, 
// 							pics: tempPics,
// 							price: price,
// 							post: post,
// 							link: link,
// 							make: req.params.make,
// 							yes: false,
// 							no: false,
// 							maybe: true,
// 							clid: clid
// 			        }

// 			        db.craigslistCars.save(obj,

// 				        function(error, saved) {
// 				          // If there's an error during this query
// 				          if (error) {
// 				            // Log the error
// 				            console.log(error);
// 				          }
// 				          // Otherwise,
// 				          else {
// 				            // Log the saved data
// 				            console.log(saved);
// 				          }
// 				        });
// 			      }
			    



// 			}).catch(function(e){
// 				if (e.statusCode == '404') {
// 					console.log('status code');
// 					console.log(e.statusCode);
// 					console.log('uri');
// 					console.log(e.options.uri)
// 					//remove from database
// 					db.craigslistCars.remove({link: e.options.uri});
// 				}
// 			});
// 		}
//     res.json({});
    
// }).catch(function(e){console.log(e)});