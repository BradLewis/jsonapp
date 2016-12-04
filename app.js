var express = require('express');
var app = express();
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

app.post('/', function(req, res) {
    console.log(req.body);
    console.log(typeof req.body);
    //res.status(400);
    var videos = req.body.payload;
    var response;
    try {
        var totalRequests = videos.length;
        response = {
            response:[]
        };
        for (var i = 0; i < totalRequests; i++) {
            var video = videos[i];
            var drm_true = (video.drm === true);
            var has_episodes = (video.episodeCount > 0);
            if (drm_true && has_episodes) {
                var episode =  {
                    image: video.image.showImage,
                    slug: video.slug,
                    title: video.title
                };
                response.response.push(episode);
            }
        }
    } catch (err) {
        res.status(400);
        response = {
            error:"Could not decode request: JSON parsing failed"
        };
    }
    res.send(response);
});

var port = 3000;
var server=app.listen(port,function(){
    console.log("We have started our server on port " + port);
});


//curl -XPOST -H 'Content-Type:application/json' -H 'Accept: application/json' --data-binary @test.json localhost:3000
