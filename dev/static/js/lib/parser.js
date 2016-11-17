/*
 *	API: {
 *		parseSection: function(sectionString),
 *		parseTable:	function(tableString)
 *	}
 *
 */
module.exports = (function(){
	var parseSpecification = function(string){
		var rows				= string.split("\n"),
				separator		= "|",
				content			= [];
		// console.log("Rows consist of: \n" + JSON.stringify(rows));
		for (var i = 0; i<rows.length; i++){
			var row = rows[i].split(separator);
			row.pop();
			content.push(row);
		}
		// console.log("content consist of: \n" + JSON.stringify(content));
		return content;
	};

	var parseSection = function(str){
		var h1 				= /(\n|^)#{1}.+(\n|$)/,
				h2 				= /(\n|^)#{2}.+(\n|$)/,
				h3 				= /(\n|^)#{3}.+(\n|$)/,
				hX				= /(\n|^)#+.+(\n|$)/,
				head			= {content:"", type:""},
				body,
				current;
		if (current = h3.exec(str)){
			head.type="h3";
			head.content = current[0].replace(/\n/g, "").replace("###","");
		}else if (current = h2.exec(str)){
			head.type="h2";
			head.content = current[0].replace(/\n/g, "").replace("##","");
		}else if (current = h1.exec(str)){
			head.type="h1";
			head.content = current[0].replace(/\n/g, "").replace("#","");
		}else{
			return;
		}
		body = parseBody(str.split(hX));
		return {head:head, body:body};
	};

	var parseBody = function(strArr){
		var body  = [],
				p			= [];
		for(var i=0;i<strArr.length;i++){
					p = strArr[i].split("\n");
			for(var j=0; j<p.length;j++)
				if (p[j] != "" && p[j] != "\n")
					body.push({content:p[j], type:"p"});
		}
		return body;
	}
	var api = {
		parseSection: parseSection,
		parseSpecification: parseSpecification
	}
	return api;
})();
