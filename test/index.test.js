/*global describe, it */

"use strict";

var expect = require("expect.js"),
	mistertango = require("../index");

describe("mistertango", function () {

	describe("decryptHash", function () {

		it("should call back with a decrypted message", function (done) {
			mistertango.decryptHash("myC4pE/gApa74oUJYL9vZDbFnpzw7fUTWPQScobxn+4=", "test-key-with-length-23", function (err, msg) {
				expect(err).to.be(null);
				expect(msg).to.eql({ok: true});
				done();
			});
		});

		it("should trim encrypted hash", function (done) {
			mistertango.decryptHash("   myC4pE/gApa74oUJYL9vZDbFnpzw7fUTWPQScobxn+4=   ", "test-key-with-length-23", function (err, msg) {
				expect(err).to.be(null);
				expect(msg).to.eql({ok: true});
				done();
			});
		});

		it("should not release zalgo on success", function (done) {
			var nextTick = false;
			mistertango.decryptHash("myC4pE/gApa74oUJYL9vZDbFnpzw7fUTWPQScobxn+4=", "test-key-with-length-23", function () {
				expect(nextTick).to.be(true);
				done();
			});
			nextTick = true;
		});

		it("should handle errors", function (done) {
			mistertango.decryptHash("myC4pE/gApa74oUJYL9vZDbFnpzw7fUTWPQScobxn+4=", "bad-key", function (err, msg) {
				expect(err).to.be.an(Error);
				expect(msg).to.be(undefined);
				done();
			});
		});

		it("should not release zalgo on error", function (done) {
			var nextTick = false;
			mistertango.decryptHash("myC4pE/gApa74oUJYL9vZDbFnpzw7fUTWPQScobxn+4=", "bad-key", function () {
				expect(nextTick).to.be(true);
				done();
			});
			nextTick = true;
		});

	});

});
