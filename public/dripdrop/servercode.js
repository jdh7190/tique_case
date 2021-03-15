const tweet = require('./tweet');
const twetch = require('./twetch');
app.post('/handles', async(req, res) => {
    console.log(req.body.url)
    try {
        if (req.body.url.includes('twetch')) {
            let paymails = await twetch.getHandles(req.body.url.substr(req.body.url.length - 64));
            res.send(paymails);
        }
        else if (req.body.url.includes('twitter')) {
            let paymails = await tweet.getHandles(req.body.url);
            res.send(paymails);
        }
        else { res.send({error: 'Please specify a valid URL.'}) }
    } catch (e) {
        console.log(error);
        res.send({error})
    }
});