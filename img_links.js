var links = [].slice.apply(document.getElementsByTagName('img'));
links = links.map(function(element) {
  // Return an anchor's img attribute, stripping any URL fragment (hash '#').
  // If the html specifies a relative path, chrome converts it to an absolute
  // URL.
  var src = element.src;
  var hashIndex = src.indexOf('#');
  if (hashIndex >= 0) {
    src = src.substr(0, hashIndex);
  }
  return src;
});

links.sort();

//Remove incorrect links
var kBadPrefix = 'javascript';
for (var i = 0; i < links.length;) {
  if (((i > 0) && (links[i] == links[i - 1])) ||
      (links[i] == '') ||
      (kBadPrefix == links[i].toLowerCase().substr(0, kBadPrefix.length))) {
    links.splice(i, 1);
  } else {
    ++i;
  }
}
chrome.extension.sendRequest(links);