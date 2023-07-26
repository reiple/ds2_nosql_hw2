var result = db.gps.aggregate([
    // TODO: 
 ]);
 
 result.forEach(function(doc) {
     print("[" + doc._id.loc + "," + doc._id.lat + "]: " + doc.user_count);
 });