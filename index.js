"use strict";

var forge = require("node-forge");

function trimZeroes(data) {
	return data.toString().replace(/^\0+/, "").replace(/\0+$/, "");
}

function padKey(key) {

	while (key.length % 16 !== 0) {
		key = key + "\0";
	}

	return key;
}

function decryptHash(tangoHash, tangoSharedSecret, cb) {

	var err = null;
	var res;

	try {
		var IV_SIZE = 16;

		var decodedHash = new Buffer(tangoHash, "base64");
		var iv = forge.util.createBuffer(decodedHash.slice(0, IV_SIZE).toString("binary"));
		var data = forge.util.createBuffer(decodedHash.slice(IV_SIZE).toString("binary"));

		var decipher = forge.cipher.createDecipher("AES-CBC", padKey(tangoSharedSecret));
		decipher.start({iv: iv});
		decipher.update(data);
		decipher.finish();

		res = JSON.parse(trimZeroes(decipher.output));

	} catch (e) {

		err = e;

	}

	process.nextTick(function () {
		cb(err, res);
	});

}

module.exports.decryptHash = decryptHash;
