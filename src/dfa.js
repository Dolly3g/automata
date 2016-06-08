Array.prototype.contains = function(element){
	return this.indexOf(element) >= 0;
};

var dfa_generator = function(tuple){
	return function(input){
		var state= input.split("").reduce(function(state,alphabet){
			return tuple.transitions[state][alphabet];
		}, tuple.initial_state);

		return tuple.final_states.contains(state);
	}
};

exports.dfa_generator = dfa_generator;
