/*global describe, it */

"use strict";

var expect = require("expect.js"),
	mistertango = require("../index");

describe("mistertango", function () {

	describe("decryptHash", function () {

		it("should be defined", function () {
			expect(mistertango.decryptHash).to.be.a(Function);
		});

	});

});
