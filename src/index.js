import BezierEasing from 'bezier-easing'
import lerp from 'lerp'

const AMP = 4 / 3

function ratio(min, max, value) {
	return (value - min) / (max - min)
}

function interpolateSpline(ka, kb, time) {
	let easing = BezierEasing(
		ratio(ka.time,  kb.time,  ka.time  + ka.time_right  * AMP),
		ratio(ka.value, kb.value, ka.value + ka.value_right * AMP),
		ratio(ka.time,  kb.time,  kb.time  + kb.time_left   * AMP),
		ratio(ka.value, kb.value, kb.value + kb.value_left  * AMP)
	)
	let t = ratio(ka.time, kb.time, time)
	let tv = easing(t)

	return lerp(ka.value, kb.value, tv)
}

// function FCurve(keyframes, normalizeTime = false, normalizeValue = false) {
function FCurve(keyframes) {

	/*
	if (normalizeTime) {
		const min = keyframes[0].time
		const max = keyframes[keyframes.length - 1].time

		for (let i = 0; i < keyframes.length; i++) {
			keyframes[i].time = ratio(keyframes[i].time, min, max)
		}
	}

	if (normalizeValue) {
		const min = keyframes[0].value
		const max = keyframes[keyframes.length - 1].value

		for (let i = 0; i < keyframes.length; i++) {
			keyframes[i].value = ratio(keyframes[i].value, min, max)
		}
	}
	*/

	return function(time) {

		let k1, k2
		for (let i = 0, len = keyframes.length - 1; i < len; i++) {
			k1 = keyframes[i]
			k2 = keyframes[i + 1]

			if (k1.time <= time && time <= k2.time) {
				return interpolateSpline(k1, k2, time)
			}
		}

		return undefined
	}
}

export default FCurve
