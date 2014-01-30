

# Chopper

Chops a stream into pieces using a delimiter.


## Install

	$ npm install chopper


## StreamChopper

This will let you read a line at a time from text stream in a throttled manner

	require("chopper");

	stream = process.stdin
	var chopper = new StreamChopper(stream, "\n", function(line) {
		chopper.pause();
		console.log(line);
		setTimeout(function() {
			chopper.resume();
		}, 500);
	});


## Chopper

The object created from Chopper() cuts the stream into delimited pieces, but does not
throttle itself at all.

### Returning an Array

This:

	log = console.log
	var chopper = new Chopper("\0");
	log(chopper.next('{"seq":0}\0'));
	log(chopper.next('{"seq":1}\0'));
	log(chopper.next('{"seq":'));
	log(chopper.next('2}\0'));
	log(chopper.next('{"seq":3}\0{"seq":4}\0'));
	log(chopper.next('{"seq":5}\0{'));
	log(chopper.next('"seq":6}\0'));
	log(chopper.next('\0'));
	log(chopper.next('{"seq":7}\0{"seq":8}\0{"seq":9}'));
	log(chopper.next('\0{"seq":10}'));

Outputs:

	[ '{"seq":0}' ]
	[ '{"seq":1}' ]
	[]
	[ '{"seq":2}' ]
	[ '{"seq":3}', '{"seq":4}' ]
	[ '{"seq":5}' ]
	[ '{"seq":6}' ]
	[ '' ]
	[ '{"seq":7}', '{"seq":8}' ]
	[ '{"seq":9}' ]


### Using a Callback

This:

	var chopper = new Chopper("\n");
	var f = function(m) { log(m) }
	chopper.next('{"seq":0}\n', f)
	chopper.next('{"seq":1}\n', f)
	chopper.next('{"seq":', f)
	chopper.next('2}\n', f)
	chopper.next('{"seq":3}\n{"seq":4}\n', f)
	chopper.next('{"seq":5}\n{', f)
	chopper.next('"seq":6}\n', f)
	chopper.next('\n', f)
	chopper.next('{"seq":7}\n{"seq":8}\n{"seq":9}', f)
	chopper.next('\n{"seq":10}', f)

Outputs this:

	{"seq":0}
	{"seq":1}
	{"seq":2}
	{"seq":3}
	{"seq":4}
	{"seq":5}
	{"seq":6}

	{"seq":7}
	{"seq":8}
	{"seq":9}

### Using a Persistent Callback

This:

	var f = function(m) { log(m) }
	var chopper = new Chopper("\n", f);
	chopper.next('Hello.\nGoodbye.\n')
	chopper.next('Why')
	chopper.next(' are you')
	chopper.next(' here?\nI do not know.')
	chopper.next('\nok')

Outputs this:

	Hello.
	Goodbye.
	Why are you here?
	I do not know.

The "ok" string at the end isn't recognized as it isn't terminated with \n.


