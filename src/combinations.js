var _ = require("lodash");

var factorial = function(n){
	if(n <= 1) return 1;
	return n * factorial(n-1);
};

var nCr = function(n, r){
	return factorial(n)/(factorial(n-r)*factorial(r));
};



var findTotalOfCombinations = function(elements){
	var n = elements.length;
	
	return elements.reduce(function(sum, ele, r){
		return sum + nCr(n, r+1);
	}, 0);
};


var findCombinations = function(elements, totalCombinations){
	var combinations = elements.map(function(ele){
		return elements.reduce(function(cs, e){
			var combination = _.uniq([ele,e].sort());
			cs.push(combination);
			return cs;
		}, [])
	})
	
	var uniqCombinations = _.uniqWith(_.flatten(combinations), _.isEqual)

	if(uniqCombinations.length >= totalCombinations)
		return uniqCombinations;
	else{
		var allCombinations = uniqCombinations.concat(findCombinations(uniqCombinations, totalCombinations));
		return _.uniq(allCombinations.map(function(xs){ return _.uniq(_.flatten(xs).sort()).join(",")}));
	}
}

var combinations = function(elements){
	var totalCombinations = findTotalOfCombinations(elements);
	return findCombinations(elements, totalCombinations);
}

console.log(combinations([1,2,3]));

exports.combinations = combinations

