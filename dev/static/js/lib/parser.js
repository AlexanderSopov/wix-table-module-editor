

module.exports = (function(){
	var preview;
	var start = function(){
		preview = $("#preview");
		_base = preview.html();
		preview.html(_css + _base + _code);
		descriptionUpdate("");
		specificationUpdate("");
	};


	var descriptionUpdate = function(string){

	};

	var specificationUpdate = function(string){

	};

	var api = {
		start:start,
		descriptionUpdate:descriptionUpdate,
		specificationUpdate:specificationUpdate
	}
	console.log(api);
	return api;

})();


var _base;
var _css = `
		<style>
			@import url('https://fonts.googleapis.com/css?family=Open+Sans:400,700');
			body{
				margin:10px;
				font-family: 'Open Sans', sans-serif;
			}
			/*
			 *
			 *	Tabb-menyn
			 *
			 */
			 .tab-container{
				 width:100%;
				 margin:0px;
				 padding:0px;
				 cursor:pointer;
			 }

			 .tab{
				 text-align:center;
				 margin:0px;
				 padding:0px;
				 width:50%;
				 display:inline-block;
				 float:left;
				 border-bottom: 5px solid grey;
			 }

			 .active {
				 color: #f79431;
				 border-color:#f79431;
				 font-weight: 700;
			 }

			 .content {
 				position:relative;
 				top:40px;
				 width: 100%;
				 display:none;
			 }
			 .content h1:nth-child(1){
				 margin-top:0px;
			 }
			 #description-content h1{
				 font-size: 1.65em;
				 margin-bottom:0px;
			 }
			 #description-content p{
				 margin-top:8px;
			 }

			 .active-content {
				 display: inline-block;
			 }
			/*
			 *
			 *	Beskrivning
			 *
			 */
			/*
			 *
			 *	Tabell
			 *
			 */
			table{
				border-collapse: collapse;
				width: 100%;
			}

			tr:nth-child(1) > td {
				font-size:1.5em;
				line-height: 1.3em;
			}
			tr:nth-child(odd) > td{
				background-color: #f0efed;
			}

			td{
				padding:6px;
				padding-left:10px;
				font-size: 0.9em;
				font-weight: 400;
			}
			td:nth-child(1){
				font-weight: bold;
			}
			td:nth-child(1){
				border:none;
				width:120px;
			}

		</style>
`;


var _code = "\n\t<script>\n\tvar _table_module = function(){\n\n\t\tvar table = document.getElementById('specification-content');\n\t\tvar nrOfColumns = 0;\n\t\tfor (var row = 0; row<content.length;row++){\n\t\t\tvar cells = content[row].length;\n\t\t\tif (cells > nrOfColumns)\n\t\t\t\tnrOfColumns = cells;\n\t\t}\n\t\tfor (var i=0; i<content.length; i++){\n\t\t\ttable.appendChild(createRow(i));\n\t\t}\n\n\t\tfunction createRow(i){\n\t\t\tvar rowContent \t= content[i],\n\t\t\t\t\trow \t\t\t\t=\tdocument.createElement('tr');\n\t\t\tfor (var col=0;col<nrOfColumns;col++)\n\t\t\t\tcreateCell(col);\n\n\t\t\tfunction createCell(col){\n\t\t\t\tvar td = document.createElement('td');\n\t\t\t\tinnerText = rowContent[col]\n\t\t\t\tif(innerText)\n\t\t\t\t\ttd.innerText = innerText;\n\t\t\t\trow.appendChild(td);\n\t\t\t}\n\t\t\treturn row;\n\t\t}\n\t};\n\t_table_module();\n\n\tvar _tab_module = (function(){\n\t\tvar activeTab \t\t= document.getElementById('description'),\n\t\t\t\tactiveContent = document.getElementById('description-content');\n\n\t\tvar openTab = function(el){\n\t\t\tif (el == activeTab)\n\t\t\t\treturn;\n\t\t\tif(activeTab)\n\t\t\t\ttoggleClass(activeTab, 'active');\n\t\t\tif(activeContent)\n\t\t\t\ttoggleClass(activeContent, 'active-content');\n\t\t\tactiveTab = el;\n\t\t\tactiveContent = document.getElementById(el.id + '-content');\n\t\t\ttoggleClass(activeTab, 'active');\n\t\t\ttoggleClass(activeContent, 'active-content');\n\t\t}\n\n\t\tvar toggleClass = function(el, className){\n\t\t\tif (el.classList) {\n\t\t\t  el.classList.toggle(className);\n\t\t\t} else {\n\t\t\t  var classes = el.className.split(' ');\n\t\t\t  var existingIndex = classes.indexOf(className);\n\t\t\t  if (existingIndex >= 0)\n\t\t\t    classes.splice(existingIndex, 1);\n\t\t\t  else\n\t\t\t    classes.push(className);\n\t\t\t  el.className = classes.join(' ');\n\t\t\t}\n\t\t}\n\n\n\n\t\tvar populateDesc = function(){\n\t\t\tvar div = document.getElementById('description-content')\n\t\t\tfor (var i=0; i<description.length; i++){\n\t\t\t\tvar head = document.createElement('h1');\n\t\t\t\thead.innerText = description[i].head;\n\t\t\t\tvar bodyElements = createBody(description[i].body);\n\t\t\t\tdiv.appendChild(head);\n\t\t\t\tfor(var el=0; el<bodyElements.length; el++){\n\t\t\t\t\tdiv.appendChild(bodyElements[el]);\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\n\t\tvar createBody = function(body){\n\t\t\tvar _body = [];\n\t\t\tfor(var i=0; i<body.length;i++){\n\t\t\t\tif (body[i].type == 'p')\n\t\t\t\t\t_body.push(createParagraph(body[i].content));\n\t\t\t\telse if (body[i].type == 'ul')\n\t\t\t\t\t_body.push(createUL(body[i].content));\n\t\t\t}\n\t\t\treturn _body;\n\t\t}\n\t\tvar createParagraph = function(content){\n\t\t\tvar p = document.createElement('p');\n\t\t\tp.innerText = content;\n\t\t\treturn p;\n\t\t}\n\n\t\tvar createUL = function(content){\n\t\t\tvar ul = document.createElement('ul');\n\t\t\tconsole.log(content);\n\t\t\tfor (var i=0; i<content.length;i++){\n\t\t\t\tvar li = document.createElement('li');\n\t\t\t\tli.innerText = content[i];\n\t\t\t\tconsole.log(li);\n\t\t\t\tul.appendChild(li);\n\t\t\t}\n\t\t\treturn ul;\n\t\t}\n\t\tpopulateDesc();\n\t\treturn {\n\t\t\topenTab:openTab\n\t\t}\n\t})();\n\n\n\t</script>\n\t";
