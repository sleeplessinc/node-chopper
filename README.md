

# Chopper

Chops a stream into pieces using a delimiter.


## Install

	$ npm install chopper


## StreamChopper

This will let you read a line at a time from text stream in a throttled manner

	require("chopper");		// creates 2 global constructors; Chopper() and StreamChopper()

	stream = process.stdin
	var chopper = new StreamChopper(stream, "\n", function(line) {
		chopper.pause();
		console.log(line);
		setTimeout(function() {
			chopper.resume();
		}, 500);
	});

## Chopper

