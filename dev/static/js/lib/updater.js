module.exports = (function(){
	var populator = require("./populator"),
			parser 		= require("./parser"),
			snippet,
			preview;
;
	var start = function(){
		preview = $("#preview");
		_base = preview.html();
		preview.html(_css + _base);
		$("#description-editor textarea").val("#H1\n##H2\n###H3\nParagraph");
		descriptionUpdate("#H1\n##H2\n###H3\nParagraph");
		$("#specification-editor textarea").val("row1,col1|\nrow2,col1|row2,col2|\nrow3,col1|row3,col2|");
		specificationUpdate("row1,col1|\nrow2,col1|row2,col2|\nrow3,col1|row3,col2|");

		var copycode = preview.html()
			.replace(new RegExp("\\n", "g"), "")
			.replace(new RegExp("\\t", "g"), "");
		console.log(copycode);
		snippet 	= $("#code");
		preview		= $("#preview");
		snippet.val(copycode);
	};


	var descriptionUpdate = function(str){
		var sectionRegex 	= /(?:\n|^)#(.*|\n[^#].*)+/g,
				description		= [],
				sections			= [],
				section;
		if(str!=""){
			while(section = sectionRegex.exec(str)){
				sections.push(section[0]);
			}
		}
		if(!sections)
			return;

		for(var i=0; i<sections.length;i++)
			description.push(parser.parseSection(sections[i]));
		populator.description(description);
	};

	var specificationUpdate = function(string){
		var content = parser.parseSpecification(string);
		populator.table(content);
	};

	var api = {
		start:start,
		descriptionUpdate:descriptionUpdate,
		specificationUpdate:specificationUpdate
	}

	var _base;
	var _css = `
		<style>
			@import url('https://fonts.googleapis.com/css?family=Open+Sans:400,700');
			#preview{
				margin:10px;
			}
			p,
			h1,
			h2,
			h3{
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
				 display:none;
				 width: 100%;
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
				 display: table;
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
			}
			tbody{
				width:100%;
			}
			tr{
				width:100%;
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
				border:none;
				width:120px;
			}

		</style>
	`;

	return api;

})();
