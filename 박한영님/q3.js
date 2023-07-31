var result = {};

// TODO: 

var eq = db.earthquake.find({"magnitude" : {$gte : m}})

eq.forEach(function(a) { 
xy = a["coordinates"];

var bd = db.site.aggregate([
{$geoNear : {near : {type : "Point", coordinates : xy} , key : "centroid", distanceField : "DIST", maxDistance : r*1000}}, 
{$match : {"properties.type" : "building"}},
{$group : {_id : "$properties.description", "count": {$sum : 1 }} },
{$sort : {_id : 1}}]);


bd.forEach(function(b) {
if (b._id in result) { result[b._id] = result[b._id] + b.count}
else { result[b._id] = b.count } 
})

})


var sortedResults = {};
Object.keys(result).sort().forEach(function(key) {
    sortedResults[key] = result[key];
});

for (var description in sortedResults) {
    print(description  + " " + sortedResults[description])
};
