function getRatio(value, min, max) {
	return (value - min) / (max - min)
}

function FCurve(keyframes, normalizeTime = false, normalizeValue = false) {

	if (normalizeTime) {
		const min = keyframes[0].time
		const max = keyframes[keyframes.length - 1].time

		for (let i = 0; i < keyframes.length; i++) {
			keyframes[i].time = getRatio(keyframes[i].time, min, max)
		}
	}

	if (normalizeValue) {
		const min = keyframes[0].value
		const max = keyframes[keyframes.length - 1].value

		for (let i = 0; i < keyframes.length; i++) {
			keyframes[i].value = getRatio(keyframes[i].value, min, max)
		}
	}

	return function(time) {

		let k1, k2
		for (let i = 0, len = keyframes.length - 1; i < len; i++) {
			k1 = keyframes[i]
			k2 = keyframes[i + 1]

			if (k1.time <= time && time <= k2.time) {
				let t = (time - k1.time) / (k2.time - k1.time)
				return k1.value * (1 - t) + k2.value * t
			}
		}

		return undefined
	}
}

export default FCurve
