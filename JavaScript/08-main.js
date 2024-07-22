
function draw1() {
	svg = d3
	  .select("body")
	  .append("svg:svg")
	  .attr("width", w)
	  .attr("height", h + lineThickness * 10)
	  .attr("id", "myCanvas");
	var answerBackground = svg
	  .append("rect")
	  .attr("x", w - iconSizeX * 2)
	  .attr("y", 0)
	  .attr("width", iconSizeX * 2)
	  .attr("height", h)
	  .attr("fill", "Azure");
	var line = svg
	  .append("line")
	  .attr("y1", h + (lineThickness * 10) / 2)
	  .attr("y2", h + (lineThickness * 10) / 2)
	  .attr("x1", 0)
	  .attr("x2", w)
	  .attr("stroke-width", lineThickness * 10)
	  .attr("stroke", "black");
	var progressBar = svg
	  .append("line")
	  .attr("y1", h + (lineThickness * 10) / 2)
	  .attr("y2", h + (lineThickness * 10) / 2)
	  .attr("x1", (w * difficulty) / maxDifficulty + 4)
	  .attr("x2", 2)
	  .attr("stroke-width", lineThickness * 6)
	  .attr("stroke", "DarkGray");
  }
  
  function draw2() {
	if (allowSkipItem) skipButton(w - iconSizeX, 0);
	for (var i = 0, y = 0; y < maxG; y++) {
	  for (var x = 0; x < maxG; x++) {
		if (x != pat.v[0] || y != pat.v[1]) {
		  if (pat.vis[x][y]) Icon(0, x, y);
		  else {
			var answer = svg
			  .append("image")
			  .attr("xlink:href", "Other files/paperOver.jpg")
			  .attr("x", (x * aw) / maxG + aw / (maxG * 2) - cx * 2)
			  .attr("y", (y * ah) / maxG + ah / (maxG * 2) - cx * 2)
			  .attr("width", cx * 4)
			  .attr("height", cy * 4)
			  .attr("id", "paperOver");
		  }
		} else {
		  var answer = svg
			.append("image")
			.attr("xlink:href", "Other files/images.png")
			.attr("x", (x * aw) / maxG + aw / (maxG * 2) - cx)
			.attr("y", (y * ah) / maxG + ah / (maxG * 2) - cx)
			.attr("width", cx * 2)
			.attr("height", cy * 2)
			.attr("id", "missingElement");
		}
		i++;
	  }
	}
  }
  
  function draw3() {
	var An = 2;
	for (var x = 0; x < pat.nAnswers; x++) {
	  if (x == answerVal) {
		Icon(1, x, null);
	  } else {
		Icon(An, x, null);
		An++;
	  }
	}
  }
  
  $(document).ready(main());
  
  function main() {
	questionsAsked[5].push([[], []]);
	console.log(questionsAsked);
	difficulty = questionsAsked[1].length;
  
	function testItem() {
	  if (difficulty >= maxDifficulty) {
		d3.select("body")
		  .append("p")
		  .attr("id", "thanks")
		  .html('<font size="15">Thank you very much for participating!</font>');
  
			// Calculate the actual score percentage
			var totalQuestions = questionsAsked[3].length;
			var correctAnswers = 0;
			for (var i = 0; i < totalQuestions; i++) {
				correctAnswers += questionsAsked[3][i];
			}
			var scorePercentage = (correctAnswers / totalQuestions) * 100;

			// Display the score percentage
			d3.select("body")
				.append("p")
				.attr("id", "score")
				.html("<font size=\"15\">Your score is: " + scorePercentage.toFixed() + "%</font>");
  
		// Select the existing form
		var form = d3.select("#mainemailer");
  
		// If the form doesn't exist, create it
		if (form.empty()) {
		  form = d3
			.select("body")
			.append("form")
			.attr("id", "mainemailer")
			.attr("method", "POST")
			.attr("action", "./mailer.php");
		}
  
		// Append form elements
		form.html(
		  "<label for='fname'>Full Name:</label><br>" +
			"<input type='text' id='fname' name='fname' required><br><br>" +
			"<label for='email'>Email:</label><br>" +
			"<input type='email' id='email' name='email' required><br><br>" +
			"<label for='subject'>Subject:</label><br>" +
			"<input type='text' id='subject' name='subject' required><br><br>" +
			"<label for='message'>Message:</label><br>" +
			"<textarea id='message' name='message' rows='4' cols='50' required></textarea><br><br>" +
			"<input type='submit' value='Submit'>"
		);
  
		var dFinished = new Date();
		questionsAsked.push(dFinished.getTime());
  
		dataToSubmit = {
		  version: versionNumber(),
		  startTime: questionsAsked[0],
		  onLoad: [questionsAsked[1]],
		  onClick: [questionsAsked[2]],
		  mouseOver: [questionsAsked[5]],
		  mouseOrder: mouseOrder,
		  correct: [questionsAsked[3]],
		  answerClicked: [questionsAsked[4]],
		  endTime: questionsAsked[6],
		};
  
		console.log(dataToSubmit);
  
		// ### DOWNLOAD FUNCTION ###
		// Convert data to a Blob
		var blob = new Blob([JSON.stringify(dataToSubmit)], {
		  type: "text/plain",
		});
  
		// Create an <a> element
		var a = document.createElement("a");
		a.style.display = "none";
		a.href = URL.createObjectURL(blob);
		a.download = "data.txt"; // Filename
  
		// Append the <a> element to the DOM
		document.body.appendChild(a);
  
		// Simulate a click on the <a> element to trigger the download
		a.click();
  
		// Clean up
		document.body.removeChild(a);
		URL.revokeObjectURL(a.href);
		
	  } else {
		var correctAnswers = 0;
		for (var i = 0; i < questionsAsked[3].length; i++) {
		  correctAnswers += questionsAsked[3][i];
		}
		function nC(number) {
		  var text = "-";
		  number = Math.floor(number / 10);
		  while (number > 0) {
			text = text.concat("-");
			number = Math.floor(number / 10);
		  }
		  return text;
		}
		console.log(nC(difficulty) + nC(difficulty) + nC(difficulty) + "—————————-———--———————-———--———--—----—————-————————————");
		console.log("————————————" + difficulty + "————-—---———————" + difficulty + "————-—--——-—————" + difficulty + "————————————");
		console.log(nC(difficulty) + nC(difficulty) + nC(difficulty) + "——————————-—--————————-—————--————------———-————————————");
  
		// 'canvas'
		draw1();
  
		pat = new choosePattern();
  
		propertyStorage[8].push(pat.nAnswers);
  
		// Draw question icons
		draw2();
  
		// The answer
		answerVal = Math.floor(Math.random() * pat.nAnswers);
		propertyStorage[2].push(answerVal);
  
		// Draw answer icons
		draw3();
  
		var dGenerated = new Date();
		questionsAsked[1].push(dGenerated.getTime());
	  }
	  difficulty++;
	}
  
	testItem();
  }
