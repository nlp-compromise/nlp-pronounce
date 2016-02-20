(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.nlpPronounce = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var metaphone = require("./metaphone.js");

// set method on 'Term', then reference that on Sentence & Text
var nlpPronounce = {
  Term: {
    pronounce: function pronounce() {
      return metaphone(this.normal);
    }
  },
  Sentence: {
    pronounce: function pronounce() {
      return this.terms.reduce(function (str, t) {
        str += " " + t.pronounce();
        return str;
      }, '').trim();
    }
  },
  Text: {
    pronounce: function pronounce() {
      return this.sentences.reduce(function (str, s) {
        str += " " + s.pronounce();
        return str;
      }, '').trim();
    }
  }
};

module.exports = nlpPronounce;

// const nlp = require('nlp_compromise');
// nlp.plugin(nlpPronounce);
// let w = nlp.text('phil collins');
// console.log(w.pronounce());

},{"./metaphone.js":2}],2:[function(require,module,exports){
'use strict';
//a js version of the metaphone (#1) algorithm
//adapted from the work of Chris Umbel
// https://github.com/NaturalNode/natural/blob/master/lib/natural/phonetics/metaphone.js

var fns = require("./transformations.js");

var metaphone = function metaphone(s) {
  s = fns.dedup(s);
  s = fns.dropInitialLetters(s);
  s = fns.dropBafterMAtEnd(s);
  s = fns.changeCK(s);
  s = fns.cchange(s);
  s = fns.dchange(s);
  s = fns.dropG(s);
  s = fns.changeG(s);
  s = fns.dropH(s);
  s = fns.changePH(s);
  s = fns.changeQ(s);
  s = fns.changeS(s);
  s = fns.changeX(s);
  s = fns.changeT(s);
  s = fns.dropT(s);
  s = fns.changeV(s);
  s = fns.changeWH(s);
  s = fns.dropW(s);
  s = fns.dropY(s);
  s = fns.changeZ(s);
  s = fns.dropVowels(s);
  return s.trim();
};

module.exports = metaphone;

},{"./transformations.js":3}],3:[function(require,module,exports){
'use strict';

//individual manipulations of the text

var transformations = {
  dedup: function dedup(s) {
    return s.replace(/([^c])\1/g, '$1');
  },
  dropInitialLetters: function dropInitialLetters(s) {
    if (s.match(/^(kn|gn|pn|ae|wr)/)) {
      return s.substr(1, s.length - 1);
    }
    return s;
  },
  dropBafterMAtEnd: function dropBafterMAtEnd(s) {
    return s.replace(/mb$/, 'm');
  },
  cchange: function cchange(s) {
    s = s.replace(/([^s]|^)(c)(h)/g, '$1x$3').trim();
    s = s.replace(/cia/g, 'xia');
    s = s.replace(/c(i|e|y)/g, 's$1');
    return s.replace(/c/g, 'k');
  },
  dchange: function dchange(s) {
    s = s.replace(/d(ge|gy|gi)/g, 'j$1');
    return s.replace(/d/g, 't');
  },
  dropG: function dropG(s) {
    s = s.replace(/gh(^$|[^aeiou])/g, 'h$1');
    return s.replace(/g(n|ned)$/g, '$1');
  },
  changeG: function changeG(s) {
    s = s.replace(/gh/g, 'f');
    s = s.replace(/([^g]|^)(g)(i|e|y)/g, '$1j$3');
    s = s.replace(/gg/g, 'g');
    return s.replace(/g/g, 'k');
  },
  dropH: function dropH(s) {
    return s.replace(/([aeiou])h([^aeiou]|$)/g, '$1$2');
  },
  changeCK: function changeCK(s) {
    return s.replace(/ck/g, 'k');
  },
  changePH: function changePH(s) {
    return s.replace(/ph/g, 'f');
  },
  changeQ: function changeQ(s) {
    return s.replace(/q/g, 'k');
  },
  changeS: function changeS(s) {
    return s.replace(/s(h|io|ia)/g, 'x$1');
  },
  changeT: function changeT(s) {
    s = s.replace(/t(ia|io)/g, 'x$1');
    return s.replace(/th/, '0');
  },
  dropT: function dropT(s) {
    return s.replace(/tch/g, 'ch');
  },
  changeV: function changeV(s) {
    return s.replace(/v/g, 'f');
  },
  changeWH: function changeWH(s) {
    return s.replace(/^wh/, 'w');
  },
  dropW: function dropW(s) {
    return s.replace(/w([^aeiou]|$)/g, '$1');
  },
  changeX: function changeX(s) {
    s = s.replace(/^x/, 's');
    return s.replace(/x/g, 'ks');
  },
  dropY: function dropY(s) {
    return s.replace(/y([^aeiou]|$)/g, '$1');
  },
  changeZ: function changeZ(s) {
    return s.replace(/z/, 's');
  },
  dropVowels: function dropVowels(s) {
    return s; //.charAt(0) + s.substr(1, s.length).replace(/[aeiou]/g, '');
  }
};
module.exports = transformations;

},{}]},{},[1])(1)
});