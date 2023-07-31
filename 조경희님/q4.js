// Q1. 지진 발생 시점 기준으로 검색
db.gps.createIndex({time:1})  // 검색 속도 개선을 위해 match key인 time 필드로 Index 설정 
                              // (Index 설정 전 수행 시간 3.9초 수준-> 설정 후 0.2초 수준)

// mongo disaster --eval "var input_date = ISODate('2020-09-18T21:00:00Z');" q1.js 
// Index 생성 전 - 수행시간: 3.927초
// Index 생성 후 - 수행시간: 0.216초

// mongo disaster --eval "var input_date = ISODate('2020-09-18T23:00:00Z');" q1.js 
// Index 생성 전 - 수행시간: 3.984초
// Index 생성 후 -수행시간: 0.201초


// Q2. 
// $text operator 사용을 위해 text index 생성, (index 생성 시간 매우 오래 걸림. ㅡㅡ)
db.site.createIndex({"properties.type":"text", "properties.name":"text", "properties.description":"text"})

// school의 r km 반경이내의 site를 찾기 위해 2dsphere index 설정 (centroid 필드가 Geo json 타입)
db.site.createIndex({'centroid':'2dsphere'})


// Q3.
// properties.type이 building을 빠르게 찾기 위해 properties.type으로 index 생성했었으나
// aggreate()를 사용해서인지 속도에 별다른 차이가 없음. 그래서 drop. 
// db.site.createIndex({'properties.type':1})
// db.site.dropIndex("properties.type_1")
