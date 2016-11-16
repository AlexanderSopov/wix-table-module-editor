

module.exports = (function(){
	var preview;
	var start = function(){
		preview = $("#preview");
		_base = preview.html();
		preview.html(_css + _base);
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
	return api;

})();


var _base;
var _css = `
		<style>
			@import url('https://fonts.googleapis.com/css?family=Open+Sans:400,700');
			body{
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
