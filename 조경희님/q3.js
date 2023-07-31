// mongo disaster --eval "var r = 30; var m = 4.5;" q3.js 
// 수행시간: 17.749초
// mongo disaster --eval "var r = 10; var m = 3.5;" q3.js 
// 수행시간: 46.973초
// 


let start_time = new Date();    // 시간 측정 시작

var eq = db.earthquake.find( {magnitude: {$gte: m}}, //  진도 m 이상의 지진을 검색
                             {_id: 0, magnitude: 1, coordinates: 1} )


var result = {};  

// eq.forEach( function(e){
//     var buildings = db.site.aggregate([{$geoNear: {near: {type: 'Point', coordinates: e.coordinates},  //값이 1개 차이가 남. ㅡㅡ
//                                                    key: 'centroid', distanceField:'DIST', maxDistance: r*1000 }}, //, spherical: true
//                                        {$match:{'properties.type': 'building'}},
//                                        {$group:{_id: '$properties.description', cnt:{$sum:1}}},
//                                        {$sort:{_id:1}}]).toArray()
    
//     buildings.forEach(function(building) {
//         if (result[building._id] === undefined) { //===는 일치 비교 연산자로, 값과 타입이 모두 같은지 비교. 일반적으로 JavaScript에서 비교를 할 때 ===를 사용하는 것이 안전
//             result[building._id] = 0;
//         }
//         result[building._id] += building.cnt
//      }
//     )
    
//  }
// )  

eq.forEach( function(e){
    var buildings = db.site.aggregate([{$match:{'centroid':{$geoWithin:{$centerSphere:[e.coordinates, r/6378.1]}}, //centerSphere는 Distance 단위가 radian으로 km 환산위해 /6378.1
                                                'properties.type': 'building' }},  // Type이 building인 것만 찾기
                                       {$group:{_id: '$properties.description', cnt:{$sum:1}}}, // description 기준으로 건물수 count
                                       {$sort:{_id:1}}]).toArray() // desc 기준으로 오름 차순 정렬
    
    buildings.forEach(function(building) {
        if (result[building._id] === undefined) { //===는 일치 비교 연산자로, 값과 타입이 모두 같은지 비교. 일반적으로 JavaScript에서 비교를 할 때 ===를 사용하는 것이 안전
            result[building._id] = 0;
        }
        result[building._id] += building.cnt // 지진별 건물 desc 기준으로 건물수 누적
     }
    )
    
 }
)  

var sortedResults = {};
Object.keys(result).sort().forEach(function(key) {
    sortedResults[key] = result[key];
});

for (var description in sortedResults) {
    print(description  + " " + sortedResults[description])
};

let end_time = new Date();  // 시간 측정 종료
print("수행시간: " + ((end_time - start_time) / 1000.0) + "초");