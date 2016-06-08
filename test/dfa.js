var assert = require("chai").assert;
var dfa_generator = require("../src/dfa.js").dfa_generator;

describe("Dfa Generator", function(){

	it("Ends with 1", function(){
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

		assert.isTrue(dfa("1"));
		assert.isTrue(dfa("101"));
		assert.isFalse(dfa("10"));
	})

	it("Even number of zeros", function(){
		var tuple = {
			states: ["q1", "q2"],
			alphabets: ["0"],
			transitions: {
				"q1": {"0" : "q2"},
				"q2": {"0" : "q1"}
			},
			initial_state: "q1",
			final_states: ["q1"]
		};
		
		var dfa = dfa_generator(tuple);

		assert.isTrue(dfa(""));
		assert.isTrue(dfa("00"));
		assert.isFalse(dfa("0"));
		assert.isTrue(dfa("0000"));
	})
})