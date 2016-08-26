/*global describe, it*/
// import FCurve from '../src/index.js'

import assert from 'assert'
import FCurve from '../src'
import testData from './test-data.json'


const frameAnimation = testData.frame_animation
const keyframes = testData.keyframes
const fps = testData.fps

let easing = FCurve(keyframes)

for (let i = 0; i < frameAnimation.length; i++) {
	let t = i / fps
	console.log(`target=${frameAnimation[i].toFixed(4)}\tvalue=${easing(t).toFixed(4)}`)
}



/*

let calc = {
	add: (a, b) => a + b
}

describe('calc', function() {
	it('add', function() {
		assert.equal(4, calc.add(1, 3))
	})
})

*/
