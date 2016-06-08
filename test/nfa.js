var assert = require("chai").assert;
var nfa_generator = require("../src/nfa.js").nfa_generator;

describe("Nfa Generator", function(){

	it("Contains 00 or 11 as substring", function(){
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
		}

		var nfa = nfa_generator(tuple);
		assert.isTrue(nfa("1001"));
		assert.isTrue(nfa("11"));
		assert.isFalse(nfa("101"));
	})

	it("Length Divisible by 2 or 3", function(){
		var tuple = {
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
		assert.isTrue(nfa("00"));
		assert.isTrue(nfa("000"));
		assert.isFalse(nfa("00000"));
	})

	it("Ends with 0", function(){
		var tuple = {
			states : ["q1","q2","q3","q4"],
			alphabets : ["0","1", "E"],
			initial_state : "q1",
			final_states : ["q4"],
			transitions : {
			  "q1" : {"E":["q2"]},
			  "q2" : {"E":["q3"]},
			  "q3" : {"0":["q3","q4"],"1":["q3"]},
			  "q4" : {}
			}
		};

		var nfa = nfa_generator(tuple);
		assert.isTrue(nfa("00"));
		assert.isTrue(nfa("10"));
		assert.isFalse(nfa("01"));
	})

	it("2nd last alphabet should be 1", function(){
		var tuple = {
			states : ["q1","q2","q3"],
			alphabets : ["0","1"],
			initial_state : "q1",
			final_states : ["q3"],
			transitions : {
			  "q1" : {"0":["q1"],"1":["q1","q2"]},
			  "q2" : {"0":["q3"],"1":["q3"]},
			  "q3" : {},
			}
		}
		var nfa = nfa_generator(tuple);
		assert.isTrue(nfa("10"));
		assert.isTrue(nfa("110"));
		assert.isFalse(nfa("01"));
	})

	it("Odd number of zeros or odd number of ones", function(){
		var tuple = {
			states : ["q1","q2","q3","q4","q5"],
			alphabets : ["0","1", "E"],
			initial_state : "q1",
			final_states : ["q4","q5"],
			transitions : {
			  "q1" : {"E":["q2","q3"]},
			  "q2" : {"1":["q4"]},
			  "q3" : {"0":["q5"]},
			  "q4" : {"1":["q2"]},
			  "q5" : {"0":["q3"]}
			}
		}
		var nfa = nfa_generator(tuple);
		assert.isTrue(nfa("0"));
		assert.isTrue(nfa("000"));
		assert.isTrue(nfa("111"));
		assert.isFalse(nfa("00"));
		assert.isFalse(nfa("11"));
	})

	it("Length of 2 or 3", function(){
		var tuple = {
			states : ["q1","q2","q3","q4","q5", "q6", "q7", "q8", "q9"],
			alphabets : ["0","1", "E"],
			initial_state : "q1",
			final_states : ["q4"],
			transitions:{
				"q1":{'E':["q2","q5"]},
				"q2":{"0":["q3"]},
				"q3":{"0":["q4"]},
				"q4": {},
				"q5":{"0":["q6"]},
				"q6":{"0":["q7"]},
				"q7":{"E":["q8"]},
				"q8":{"E":["q9"]},
				"q9":{"0":["q4"]}
			}
		}
		var nfa = nfa_generator(tuple);
		assert.isTrue(nfa("00"));
		assert.isTrue(nfa("000"));
		assert.isFalse(nfa("0"));
		assert.isFalse(nfa("0000"));
	})

	it("Last epsilon", function(){
		var tuple = {
			states : ["q1","q2","q3","q4","q5", "q6", "q7", "q8", "q9"],
			alphabets : ["0","1", "E"],
			initial_state : "q1",
			final_states : ["q4"],
			transitions:{
  				"q1":{'E':["q2","q5"]},
  				"q2":{"0":["q3"]},
  				"q3":{"0":["q4"]},
        		"q4":{},
  				"q5":{"0":["q6"]},
  				"q6":{"0":["q7"]},
  				"q7":{"0":["q8"]},
  				"q8":{'E':["q9"]},
  				"q9":{'E':["q4"]}
  			}
		}
		var nfa = nfa_generator(tuple);
		assert.isTrue(nfa("00"));
		assert.isTrue(nfa("000"));
		assert.isFalse(nfa("0"));
		assert.isFalse(nfa("0000"));
	})
})


