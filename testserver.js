const http = require('http');
const url = require('url');
const hostname = '127.0.0.1';
const port = 3000;


const server = http.createServer((req, res) => {
  res.statusCode = 200;

  var q = url.parse(req.url,true);
  var qdata=q.query;

 //  if (qdata.submit){
	//   aaaurl="http://ip-api.com/json/107.131.200.60";
	// 	require('http').get(aaaurl, (res2) => {
	//     res2.setEncoding('utf8');
	//     res2.on('data', function (body) {
	//         console.log(body);
	//         res.setHeader('Content-Type', 'application/json');
 // 			res.end(body); 
	//     });
	// });	  
 //  }

 	res.setHeader("Access-Control-Allow-Origin","*");
 	///////////////////////////////////////////////////////////////maybe delete

	if (qdata.submit_geocoding){

  		var encoded = qdata.location;
  		var sendingurl="https://maps.googleapis.com/maps/api/geocode/json?address="+encoded+"&key=AIzaSyC45X154WpCCQ7V17iJ1qdA_-bvIb-Tg18";
  		var body="";

  		res.setHeader('Content-Type', 'application/json');
		require('https').get(sendingurl, (res2) => {
		    res2.setEncoding('utf8');
		    
		    res2.on('data', function (data) {
		        //res.setHeader('Content-Type', 'application/json');
		        body += data;
		    });
		    res2.on("end", () => {
		    	console.log("success to get geocoding:    "+encoded);
		      	res.end(body);	
		  	});
		});

  	}
  	else if(qdata.submit_placesearch){

  		var cat="&";
  		if(qdata.cat!="default"){
  			cat = "&type="+ qdata.cat + "&";
  		}

  		var rad="16093.4";
  		if(qdata.dis!=""){
  			try{
  				var a=parseFloat(qdata.dis)*1609.344;
  				rad = a.toString();
  			}
  			catch(e){
  				rad="16093.4";
  			}
  		}

  		var encoded = encodeURIComponent(qdata.keyword);
  		var sendingurl="https://maps.googleapis.com/maps/api/place/nearbysearch/json?location="+qdata.lat+","+qdata.lon+"&radius="+rad+cat+"keyword="+encoded+"&key=AIzaSyDoDzPi8fGfBG6cy-f0wPgWrvzx-jrz3jM";
  		var body="";

  		res.setHeader('Content-Type', 'application/json');
		require('https').get(sendingurl, (res2) => {
		    res2.setEncoding('utf8');
		    
		    res2.on('data', function (data) {
		        //res.setHeader('Content-Type', 'application/json');
		        body += data;
		    });
		    res2.on("end", () => {
		    	console.log("success to get place search result:    url is "+sendingurl);
		      	res.end(body);	
		  	});
		});


  	}
  	else if(qdata.submit_placedetail){

  		var sendingurl="https://maps.googleapis.com/maps/api/place/details/json?placeid="+qdata.id+"&key=AIzaSyCjA-HmgVbIEAVquj8TDpOOY_Xyo-FoGGw";
  		var body="";

  		res.setHeader('Content-Type', 'application/json');
		require('https').get(sendingurl, (res2) => {
		    res2.setEncoding('utf8');
		    
		    res2.on('data', function (data) {
		        //res.setHeader('Content-Type', 'application/json');
		        body += data;
		    });
		    res2.on("end", () => {
		    	console.log("success to get place details");
		      	res.end(body);	
		  	});
		});

  	}
  	else if(qdata.submit_pagetoken){
  		var sendingurl="https://maps.googleapis.com/maps/api/place/nearbysearch/json?pagetoken="+qdata.pageid+"&key=AIzaSyDoDzPi8fGfBG6cy-f0wPgWrvzx-jrz3jM";
  		var body="";

  		res.setHeader('Content-Type', 'application/json');
		require('https').get(sendingurl, (res2) => {
		    res2.setEncoding('utf8');
		    
		    res2.on('data', function (data) {
		        //res.setHeader('Content-Type', 'application/json');
		        body += data;
		    });
		    res2.on("end", () => {
		    	console.log("success to get pagetoken"+qdata.pageid);
		      	res.end(body);	
		  	});
		});

  	}
  	else if(qdata.submit_review){
  		var sendingurl="/v3/businesses/matches/best?name="+encodeURIComponent(qdata.name)+"&state="+encodeURIComponent(qdata.state)+"&city="+encodeURIComponent(qdata.city)+"&country="+encodeURIComponent(qdata.country);
  		var body="";

  		if (qdata.address){
  			sendingurl=sendingurl+"&address1="+encodeURIComponent(qdata.address);
  		}


  		console.log(sendingurl);
  		const options = {
  			hostname: 'api.yelp.com',
  			path: sendingurl,
  			method: 'GET',
  			headers: {
            	accept: 'application/json',
            	Authorization: 'Bearer gPhU9uI6Q95BHTuSYhNyzMWtGKCYXNnpQ4rDgaQQ5NS3ze2S90yRrJtXrBdmmyPSn3f8MMiZvZKzfsziUe3KPcGXiaXHeFe6M165ycZE0wGoDh-i-fEByPYBTjDDWnYx' 
        	}
		};



  		res.setHeader('Content-Type', 'application/json');
  		//https.setRequestHeader('Bearer gPhU9uI6Q95BHTuSYhNyzMWtGKCYXNnpQ4rDgaQQ5NS3ze2S90yRrJtXrBdmmyPSn3f8MMiZvZKzfsziUe3KPcGXiaXHeFe6M165ycZE0wGoDh-i-fEByPYBTjDDWnYx');
		require('https').get(options, (res2) => {
		    res2.setEncoding('utf8');
		    
		    res2.on('data', function (data) {
		        //res.setHeader('Content-Type', 'application/json');
		        body += data;
		    });
		    res2.on("end", () => {
		    	console.log("success to get  yelp id");
		      	res.end(body);	
		  	});
		});

  	}
  	  else if(qdata.submit_yelpid){
  		var sendingurl="/v3/businesses/"+encodeURIComponent(qdata.id)+"/reviews";
  		var body="";

  		console.log(sendingurl);
  		const options = {
  			hostname: 'api.yelp.com',
  			path: sendingurl,
  			method: 'GET',
  			headers: {
            	accept: 'application/json',
            	Authorization: 'Bearer gPhU9uI6Q95BHTuSYhNyzMWtGKCYXNnpQ4rDgaQQ5NS3ze2S90yRrJtXrBdmmyPSn3f8MMiZvZKzfsziUe3KPcGXiaXHeFe6M165ycZE0wGoDh-i-fEByPYBTjDDWnYx' 
        	}
		};



  		res.setHeader('Content-Type', 'application/json');
  		//https.setRequestHeader('Bearer gPhU9uI6Q95BHTuSYhNyzMWtGKCYXNnpQ4rDgaQQ5NS3ze2S90yRrJtXrBdmmyPSn3f8MMiZvZKzfsziUe3KPcGXiaXHeFe6M165ycZE0wGoDh-i-fEByPYBTjDDWnYx');
		require('https').get(options, (res2) => {
		    res2.setEncoding('utf8');
		    
		    res2.on('data', function (data) {
		        //res.setHeader('Content-Type', 'application/json');
		        body += data;
		    });
		    res2.on("end", () => {
		    	console.log("success to get specific yelp reviews");
		      	res.end(body);	
		  	});
		});

  	}
  	else{
  		res.setHeader('Content-Type', 'text/plain');
 		res.end("Error"); 
  	}


  //console.log(req);
  //res.setHeader('Content-Type', 'application/json');
  //res.end(qdata);
});

process.on('uncaughtException', function (err) {
    console.log(err);
});


server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});