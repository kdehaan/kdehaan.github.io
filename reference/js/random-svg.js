

function randomizeSvg( svgname, classname ) {
  var svgdoc;
  console.log(svgname, 'found again');
  var shades = [
	'#d3d3d3',
	'#bdbdbd',
	'#a8a8a8',
	'#939393',
	'#acacac',
	'#b9b9b9',
	'#c6c6c6',
	'#696969',
	'#7e7e7e'
	];
  console.log(svgname.contentDocument);
  svgname.addEventListener("load", function() {
    console.log('here')
    svgdoc = svgname.contentDocument;
    splashFeathers = svgdoc.getElementsByClassName(classname);
    for (var i=0; i<splashFeathers.length; i++) {
      randomShade = shades[Math.floor(Math.random()*shades.length)];
      splashFeathers[i].setAttribute("fill", randomShade);
    }
  }, false);
}