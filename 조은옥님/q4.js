db.site.createIndex({time: 1})

// create text index for search
db.site.createIndex({'properties.type': 'text',
                    'properties.name': 'text',
                    'properties.description': 'text'},
                    {name: "siteIndex"});
// create 2dsphere index for geometry search
db.site.createIndex({'centroid': '2dsphere'})