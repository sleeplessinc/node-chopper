
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

Chopper = function( mark, cb ) {

	var self = this
	self.mark = mark ? mark : "\0"
	self.partial = []
	self.cb = cb

	self.next = function(data, cb ) {
		var slices = data.split(self.mark, -1)
		self.partial.push(slices.shift())
		if(slices.length > 0) {
			slices.unshift(self.partial.join(''))
			self.partial = [slices.pop()]
		}
		cb = cb || self.cb
		if(cb === undefined)
			return slices;
		while(slices.length > 0)
			cb(slices.shift())
		return [];
	}

	self.feed = self.next


}

module.exports = Chopper;

if(require.main === module) {
	require("./test.js");
}


