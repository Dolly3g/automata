var _ = require('lodash');

var nfa_generator = function(tuple){
	return function(input){
		var outputs = input.split("").reduce(function(states, alphabet){
			return _.flatten(states.map(function(state){
				return tuple.transitions[state][alphabet] || [];
			}))
		}, [tuple.initial_state])
		return _.intersection(tuple.final_states, outputs).length > 0
	}
}

var tuple = {
	states: ["q1", "q2", "q3", "q4"],
	alphabets: ["1", "0"],
	transitions: {
		"q1": {"1" : ["q1", "q3"], "0" : ["q1", "q2"]},
		"q2": {"0" : ["q4"]},
		"q3": {"1" : ["q4"]},
		"q4": {"0": ["q4"], "1": ["q4"]}
	},
	initial_state: "q1",
	final_states: ["q4"]
};

var tuple_epsilon_test =
	states: ["q1", "q2", "q3", "q4", "q5", "q6", "q7", "q8"],
	alphabets: ["0", "E"],
	transitions: {
		"q1": {"E" : ["q2", "q5"]},
		"q2": {"0" : ["q3"]},
		"q3": {"0" : ["q4"]},
		"q4": {"0": ["q3"]},
		"q5": {"0": ["q6"]},
		"q6": {"0": ["q7"]},
		"q7": {"0": ["q8"]},
		"q8": {"0": ["q6"]}
	},
	initial_state: "q1",
	final_states: ["q4", "q8"]
};

var nfa = nfa_generator(tuple);
var nfa_with_epsilon = nfa_generator(tuple_epsilon_test);

var input = process.argv[2];
if(nfa_with_epsilon(input))
	console.log("Passed");
else
	console.log("Failed");