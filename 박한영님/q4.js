// TODO: 

//Q1 
db.site.createIndex({"time":1})

// Index 없을때 : 3985ms소요 / 8400000개 doc 서치 
// Index 있을때 : 391ms 소요 / 50000개 doc 서치


//Q2

//필수 index 

//text search를 위함 
db.site.createIndex({"properties.type":"text", "properties.name":"text", "properties.description":"text"})

//반경내에 있는 것 find를 위함
db.site.createIndex({'centroid':'2dsphere'})



db.shelter.createIndex({"site_id":1})
//Index 없을때 --> 있을때
//result1 :  수행시간 1.227초 --> 0.25초
//result2 :  수행시간 0.694초 --> 0.391초



//Q3
db.earthquake.createIndex({"magnitude":1})
db.site.createIndex({"properties.type" : 1})
//Index 없을때 --> 있을때
//result1 :  수행시간 112.646초 --> 108.186초
//result2 :  수행시간 25.17초 --> 25.194초

