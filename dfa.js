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
}

var tuple = {
	states: ["q1", "q2"],
	alphabets: ["1", "0"],
	transitions: {
		"q1": {"1" : "q2", "0" : "q1"},
		"q2": {"1" : "q2", "0" : "q1"}
	},
	initial_state: "q1",
	final_states: ["q2"]
};

var dfa = dfa_generator(tuple);

var input = process.argv[2];

if(dfa(input))
	console.log("Passed");
else
	console.log("Failed");