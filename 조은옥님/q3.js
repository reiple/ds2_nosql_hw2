var result = {};

// TODO: 
db.site.createIndex({'centroid': '2dsphere'})

var eq = db.earthquake.find(
    {'magnitude': {$gte: m}}
);

eq.forEach(function(e) {
    var sites = db.site.aggregate([
        {'$match': {'centroid': {$geoWithin: {'$centerSphere': [e.coordinates, r/6378.1]}}, 'properties.type': "building"}},
        {'$group': {_id: "$properties.description", cnt: {$sum:1}}},
        {'$sort': {'_id':1}}
    ]);
    sites.forEach(function(f){
        if (result[f._id])
            result[f._id] += f.cnt;
        else
            result[f._id] = f.cnt;
    });
});
var sortedResults = {};
Object.keys(result).sort().forEach(function(key) {
    sortedResults[key] = result[key];
});

for (var description in sortedResults) {
    print(description  + " " + sortedResults[description])
};