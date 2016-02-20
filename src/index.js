'use strict';

const metaphone = require("./metaphone.js");

// set method on 'Term', then reference that on Sentence & Text
let nlpPronounce = {
  Term: {
    pronounce: function() {
      return metaphone(this.normal);
    }
  },
  Sentence: {
    pronounce: function() {
      return this.terms.reduce(function(str, t) {
        str += " " + t.pronounce();
        return str;
      }, '').trim();
    }
  },
  Text: {
    pronounce: function() {
      return this.sentences.reduce(function(str, s) {
        str += " " + s.pronounce();
        return str;
      }, '').trim();
    }
  }
};

module.exports = nlpPronounce;

// const nlp = require('nlp_compromise');
// nlp.plugin(nlpPronounce);
// let w = nlp.text('tony danza');
// console.log(w.pronounce());