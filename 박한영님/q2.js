var siteIds = [];
// TODO: 

var sf = db.site.find({$text : {$search : '\"School Field\"'}})

while (sf.hasNext()){
get = sf.next();
point = get["centroid"];
schoolsite = get["site_id"];
var nn = db.site.aggregate([
{$geoNear : { near :  point , key : "centroid",distanceField : "DIST", maxDistance :r*1000 }}, 
{$project : {_id : 0 , site_id : 1}}]).map(function(b) { return b.site_id});

var shelters = db.shelter.find({"site_id" :{$in : nn}},{_id : 0 , site_id : 1 }).map(function(a) {return a.site_id } )

if (shelters.length == 0) { siteIds.push(schoolsite)}

}


siteIds.sort().forEach(function(siteId) {
    print(siteId);
});

