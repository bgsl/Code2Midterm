
// simplest way to do it but not complete
// document.body.innerHTML = document.body.innerHTML.replace(/designer/gi, 'navel-gazer');

// here is a more complete way: 
var res = $('body  *').contents().map(function () {
    if (this.nodeType == 3 && this.nodeValue.trim() != "") //check for nodetype text and ignore empty text nodes
        return this.nodeValue.trim().split(/\W+/);  //split the nodevalue to get words.
}).get(); //get the array of words.

console.log(res);

var newDefs = []; 

for (var i = 0; i < res.length; i++) {
	// newDefs = "http://www.dictionary.com/browse/"+ res[i] + "?s=t";

 newDefs[i] = res[i].link("http://www.dictionary.com/browse/"+res[i]+"?s=t")
}


getTextNodes(function(textNodes) {
	console.log('searching DOM tree');
	for (var i = 0; i < textNodes.length; i++) {
  	var text = textNodes[i].nodeValue;
  	textNodes[i].nodeValue = text.replace(res, newDefs);
	}
});

function getTextNodes(callback) {
	var elements = document.querySelectorAll("body, body *");
	var results = [];

	for (var i = 0; i < elements.length; i++) {	
		if (elements[i].hasChildNodes()) { 
			for (var j = 0; j < elements[i].childNodes.length; j++) {
				if (elements[i].childNodes[j].nodeType == 3) {
					results.push(elements[i].childNodes[j]);
				}
			}
		}
	}

	callback(results);
}

