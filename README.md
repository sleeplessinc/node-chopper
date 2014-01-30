

# Chopper

Chops a stream into pieces using a delimiter.


## Install

	$ npm install chopper


## Usage

	stream = process.stdin
	var sc = new StreamChopper(stream, "\n", function(line) {
		sc.pause();
		var m = process.memoryUsage();
		m = Math.round(m.heapUsed / (1024*1024));
		log(m+"M: "+(n++)+": "+line.substr(0,10));
		setTimeout(function() {
			sc.resume();
		}, 50);
	});

