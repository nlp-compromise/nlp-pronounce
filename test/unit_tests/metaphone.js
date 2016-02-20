'use strict';
let mocha = require('mocha');
let should = require('should');
//apply the plugin
const nlpPronounce = require('../../src/index.js');
const nlp = require('nlp_compromise');
nlp.plugin(nlpPronounce);

describe('metaphone', function() {

  [
    ['phil collins', 'fil kolins'],
  ].forEach(function(a) {
    let str = nlp.text(a[0]).pronounce();
    it(a[0], function(done) {
      str.should.equal(a[1]);
      done();
    });
  });

});
