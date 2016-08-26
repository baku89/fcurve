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
	let succeeded = true

	for (let i = 0; i < frameAnimation.length; i++) {

		let t = i / fps
		let target = frameAnimation[i]
		let value = easing(t)
		let diff = value - target
		let err = Math.abs(diff) > 1.e-3

		succeeded = succeeded && !err

		console.log(
			`[${i}\t] ` +
			`target=${fixedFloat(target, 4)}\t` +
			`value=${fixedFloat(value, 4)}\t` +
			`diff=${fixedFloat(diff, 8)}\t` +
			(err ? '[ERR]' : '')
		)
	}
	return succeeded
}


describe('diff test', function() {

	let pathList = [
		'./data/test-data0.json'
	]

	pathList.forEach((path) => {
		it(path, function() {
			assert.equal(true, evalTestData(path))
		})
	})

})
