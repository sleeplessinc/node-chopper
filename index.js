
/*Copyright 2011 Sleepless Software Inc. All rights reserved.

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to
deal in the Software without restriction, including without limitation the
rights to use, copy, modify, merge, publish, distribute, sublicense, and/or
sell copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS
IN THE SOFTWARE. 
*/

var log = function(s) { console.log(s) }

global.Chopper = function(mark) {

	var self = this
	self.mark = mark ? mark : "\0"
	self.partial = []

	self.next = function(data, cb) {
		var slices = data.split(self.mark, -1)
		self.partial.push(slices.shift())
		if(slices.length > 0) {
			slices.unshift(self.partial.join(''))
			self.partial = [slices.pop()]
		}
		if(cb === undefined)
			return slices;
		while(slices.length > 0)
			cb(slices.shift())
		return [];
	}

}

if(false) {

	exports.Chopper = Chopper

	log("returned array ...")
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

	log("with callback ...")
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
}


