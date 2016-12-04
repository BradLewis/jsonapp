var express = require('express');
var app = express();
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

app.set('port', (process.env.PORT || 5000));

app.get('/', function(req,res) {
    res.send("Hello World");
});

app.post('/', function(req, res) {
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
    res.json(response);
});

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});

//curl -XPOST -H 'Content-Type:application/json' -H 'Accept: application/json' --data-binary @test.json localhost:3000
