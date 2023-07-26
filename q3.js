var result = {};

// TODO: 

var sortedResults = {};
Object.keys(result).sort().forEach(function(key) {
    sortedResults[key] = result[key];
});

for (var description in sortedResults) {
    print(description  + " " + sortedResults[description])
};
