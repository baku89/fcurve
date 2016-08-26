/*global describe, it*/
import assert from 'assert'
import FCurve from '../src'

function fixedFloat(value, num) {
	return (value == 0 ? ' ' : value >= 0 ? '+' : '') + value.toFixed(num)
}

function evalTestData(path) {
	const testData = require(path)
	const frameAnimation = testData.frame_animation
	const keyframes = testData.keyframes
	const fps = testData.fps

	let easing = FCurve(keyframes)

	for (let i = 0; i < frameAnimation.length; i++) {

		let t = i / fps
		let target = frameAnimation[i]
		let value = easing(t)
		let diff = value - target

		console.log(
			`[${i}\t] ` +
			`target=${fixedFloat(target, 4)}\t` +
			`value=${fixedFloat(value, 4)}\t` +
			`diff=${fixedFloat(diff, 8)}\t` +
			((Math.abs(diff) > 1.e-3) ? '[ERR]' : '')
		)
	}

	return true
}


describe('diff test', function() {

	let pathList = [
		'./test-data0.json',
		'./test-data1.json',
		'./test-data2.json',
		'./test-data3.json'
	]

	pathList.forEach((path) => {
		it(path, function() {
			assert.equal(true, evalTestData(path))
		})
	})

})
