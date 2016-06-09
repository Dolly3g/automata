var _ = require('lodash');

Array.prototype.contains = function(element){
	return this.indexOf(element) >= 0;
};

Array.prototype.flatten = function(){
	return _.flatten(this);
};

Array.prototype.intersects = function(array){
	return _.intersection(this, array);
};

var nfa_generator = function(tuple){
	
	var getEpsilonTransitions = function(state){
		var epsilonTransitions = tuple.transitions[state]["e"] || [];
		return epsilonTransitions.concat(epsilonTransitions.map(getEpsilonTransitions)).flatten();
	}

	var stateReducer = function(states, alphabet){
		
		var getTransitionsFor = function(state) {
			var alphabetTransitions = tuple.transitions[state] && (tuple.transitions[state][alphabet] || []);
			var epsilonTransitions = getEpsilonTransitions(state);
			var epsilonTransitionsFromAlphabetTransitions = alphabetTransitions.map(getEpsilonTransitions)
			var allEpsilonTransitions = epsilonTransitions.map(getTransitionsFor).concat(epsilonTransitionsFromAlphabetTransitions);
			return alphabetTransitions.concat(allEpsilonTransitions).flatten();
		};

		return states.map(getTransitionsFor).flatten();
	};


	return function(input){
		var outputStates = (input || "e").split("").reduce(stateReducer, [tuple.initial_state])
		return outputStates.intersects(tuple.final_states).length > 0;
	};
}

exports.nfa_generator = nfa_generator;