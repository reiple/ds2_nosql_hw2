// mongo disaster --eval "var r = 0.01;" q2.js
// 수행시간: 0.411초

// mongo disaster --eval "var r = 0.5;" q2.js
// 수행시간: 0.497초

let start_time = new Date();    // 시간 측정 시작


// $text operator를 사용하여 학교 정보 검색
var school =  db.site.find({$text: {$search: "\"School Field\""}}, 
                           {_id: 0, type :1, properties: 1, site_id: 1, centroid: 1})

var siteIds = [];    


school.forEach( function(s) {
    var near_site = db.site.find({centroid: {$nearSphere: {$geometry: s.centroid, $maxDistance: r * 1000}}}, 
                                 {_id:0, site_id:1})
                    //각 학교별로 r km 이내의 site_id를 확인

    var shelter_cnt = db.shelter.aggregate([{$match: {site_id:{$in:near_site.map(site => site.site_id)}}},
                                            {$group: {_id:0, cnt:{$sum:1}}}])
    
    if(!shelter_cnt.hasNext())
        siteIds.push(s.site_id)
   }
)


siteIds.sort().forEach(function(siteId) {
    print(siteId);
});

let end_time = new Date();  // 시간 측정 종료
print("수행시간: " + ((end_time - start_time) / 1000.0) + "초");