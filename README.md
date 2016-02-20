an [nlp_compromise](https://github.com/nlp-compromise/nlp_compromise) plugin for a phonetic spelling of text.

it is a [metaphone](https://en.wikipedia.org/wiki/Metaphone) implementation in javascript, based on Chris Umbel's great work in [naturalNode](https://github.com/NaturalNode/natural/blob/master/lib/natural/phonetics/metaphone.js)

```javascript
var nlp = require('nlp_compromise');
var nlpPronounce = require('nlp-pronounce');
nlp.plugin(nlpPronounce);

var t = nlp.text('phil collins');
t.pronounce()
// [ 'fil', 'kolins' ]
```

it also takes advantage of the tokenization & cleverness of nlp_compromise.
