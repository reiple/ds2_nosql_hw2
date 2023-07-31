var siteIds = [];
// TODO: 
// create text index for search
db.site.createIndex({'properties.type': 'text',
                    'properties.name': 'text',
                    'properties.description': 'text'},
                    {name: "siteIndex"});
// create 2dsphere index for geometry search
db.site.createIndex({'centroid': '2dsphere'})

// variable school contains the data which has exact "school field" on its property
var school = db.site.find({"$text": {$search: "\"School Field\""}});

school.forEach(function(s) {
    // use nearSpehere and use geoJson data to find near sites
    // method toArray() makes result into the array
    var nears = db.site.find(
        {'centroid': {'$nearSphere': {'$geometry': s.centroid, '$maxDistance': r * 1000}}},
        {_id:0, site_id:1}
    ).toArray();

    // find whether near sites found above are shelters or not
    var shelters = db.shelter.aggregate([
        {'$match': {'site_id': {'$in': nears.map(ns => ns.site_id)}}},
        {'$group': {_id:null, cnt:{$sum:1}}}
    ]);
    // When more than 1 shelters are found, we will skip to save the data.
    if (shelters.hasNext() == false) {
        siteIds.push(s.site_id)
    }
});

siteIds.sort().forEach(function(siteId) {
    print(siteId);
});