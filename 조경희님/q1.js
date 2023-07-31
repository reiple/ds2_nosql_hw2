// var input_date = ISODate('2020-09-18T21:00:00Z');

// db.gps.aggregate([
//     {$match: { time: input_date}}, 
//     {$project:{ _id: 0, time: 1, user_id:1, 
//                 long:{ $trunc: [{$arrayElemAt: ['$coordinates', 0]}, 1] },
//                 lat: { $trunc: [{$arrayElemAt: ['$coordinates', 1]},1] },
//                 long_org:{ $arrayElemAt: ['$coordinates', 0] },
//                 lat_org: { $arrayElemAt: ['$coordinates', 1]},
//                }},
//     {$match : { long: {$gte: -124.2, $lt: -124.1},
//                lat: {$gte: 40.7, $lt:40.8}}}
//  ]);


 
let start_time = new Date();    // 시간 측정 시작

var result = db.gps.aggregate([
    {$match: { time: input_date }}, // 입력받은 input_date로 검색
    {$project:{ _id: 0, time: 1, user_id:1, 
        loc:{ $trunc: [{$arrayElemAt: ['$coordinates', 0]}, 1] }, //소수점 1자리로 절삭
        lat: { $trunc: [{$arrayElemAt: ['$coordinates', 1]},1] },
        long_org:{ $arrayElemAt: ['$coordinates', 0] },
        lat_org: { $arrayElemAt: ['$coordinates', 1]},
       }},       
    {$group:{_id:{loc:'$loc', lat:'$lat'},user_count:{$sum:1}}}, // 소수점 1자리 기준의 가로, 세로 좌표 기준으로 count
    {$sort:{'_id.loc':1, '_id.lat':1}} // 결과에 대해 longitude, latitude 순으로 오름 차순 정렬
 ]);

let end_time = new Date();  // 시간 측정 종료

result.forEach(function(doc) {
    print("[" + (doc._id.loc) + "," + (doc._id.lat) + "]: " + doc.user_count);
});

print("수행시간: " + ((end_time - start_time) / 1000.0) + "초");