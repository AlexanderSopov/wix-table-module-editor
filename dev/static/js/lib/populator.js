
/*
	API:
		populator: {
			table: function(content),
			description: function(description),
		}

*/

module.exports = (function(){
	var tablePopulator = (function(){


		var nrOfColumns = 0;


		var populator = function(content){
			var table = document.getElementById("specification-content");
			table.innerHTML = "";
			if(!content)
				return;
			nrOfColumns = 0;
			for (var row = 0; row<content.length;row++){
				var cells = content[row].length;
				if (cells > nrOfColumns)
					nrOfColumns = cells;
			}
			for (var i=0; i<content.length; i++){
				table.appendChild(createRow(i, content));
			}
		}

		function createRow(i, content){
			console.log("got here");
			var rowContent 	= content[i],
					row 				=	document.createElement("tr");
			for (var col=0;col<nrOfColumns;col++)
				row.appendChild(createCell(col, rowContent));

			return row;
		}
		function createCell(col, rowContent){
			var td = document.createElement("td");
			var innerText = rowContent[col]
			if(innerText)
				td.innerText = innerText;
			return td
		}

		return populator;

	})();

	var descPopulator = (function(){
		var activeTab 		= document.getElementById("description"),
				activeContent = document.getElementById("description-content");

		var populateDesc = function(description){
			var div = document.getElementById("description-content")
			div.innerHTML=""; //reset

			for (var i=0; i<description.length; i++){
				var head = createHead(description[i].head);
				var bodyElements = createBody(description[i].body);
				div.appendChild(head);
				for(var el=0; el<bodyElements.length; el++){
					div.appendChild(bodyElements[el]);
				}
			}
		}
		var createHead = function(h){
			var head = document.createElement(h.type);
			head.innerText = h.content;
			return head;
		}
		var createBody = function(body){
			var _body = [];
			for(var i=0; i<body.length;i++){
				if (body[i].type == "p")
					_body.push(createParagraph(body[i].content));
				else if (body[i].type == "ul")
					_body.push(createUL(body[i].content));
			}
			return _body;
		}
		var createParagraph = function(content){
			var p = document.createElement("p");
			p.innerText = content;
			return p;
		}

		var createUL = function(content){
			var ul = document.createElement("ul");
			for (var i=0; i<content.length;i++){
				var li = document.createElement("li");
				li.innerText = content[i];
				ul.appendChild(li);
			}
			return ul;
		}
		return populateDesc
	})();


	return {
		table: tablePopulator,
		description: descPopulator
	}
})()
