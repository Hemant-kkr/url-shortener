const shortid = require('shortid');
const URL = require('../models/url')

async function generateShortURL(req,res){
    const body = req.body;
 
const isExisting = await URL.findOne({redirectURL:body.url});
   if(isExisting){
    return res.json({id:isExisting.shortId}) 
   }
    if(!body) return res.status(400).json({error:'Url is required'})
const shortId = shortid();
await URL.create(
    {
        shortId:shortId,
        redirectURL:body.url,
        visitHistory: []
    }

);
return res.json({id:shortId,name:"hemant"})

}
module.exports={
    generateShortURL
}