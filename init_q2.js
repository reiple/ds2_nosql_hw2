db.site.dropIndexes()
db.shelter.dropIndexes()
db.earthquake.dropIndexes()
db.gps.dropIndexes()

db.site.createIndex({'properties.type': 'text',
                    'properties.name': 'text',
                    'properties.description': 'text'},
                    {name: "siteIndex"});
db.site.createIndex({'centroid': '2dsphere'})