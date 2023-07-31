var result =  db.gps.aggregate([
{$match : {"time" : input_date }} , 
{$project : {_id : 0 , user_id : 1,   
"lon": {$trunc : [{$arrayElemAt : ["$coordinates",0]},1]},  
"lat" : {$trunc : [{$arrayElemAt : [ "$coordinates",1]},1]} }},
{$group : {_id : {"lon":"$lon" , "lat":"$lat"}, "uniqueuser" : {$addToSet : "$user_id"}}},
{$project : {"user_count" : {$size : "$uniqueuser"}}},
{$sort: {_id : 1}} ]);

 
result.forEach(function(doc) {
    print("[" + (doc._id.lon) + "," + (doc._id.lat) + "]: " + doc.user_count);
});