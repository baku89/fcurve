import BezierEasing from 'bezier-easing'
import lerp from 'lerp'

function FCurve(keyframes) {

	keyframes.forEach((key) => {

		switch (key.interpolation) {
			case 'spline':
				key.func = BezierEasing(key.easing[0], key.easing[1], key.easing[2], key.easing[3])
				break
			case 'linear':
				key.func = function(t) {return t}
				break
			case 'step':
				key.func = function() {return 0}
				break
		}
		
	})

	return function(time) {

		let k1, k2
		for (let i = 0, len = keyframes.length - 1; i < len; i++) {
			k1 = keyframes[i]
			k2 = keyframes[i + 1]

			if (k1.time <= time && time <= k2.time) {
				let t = (time - k1.time) / (k2.time - k1.time)
				return lerp(k1.value, k2.value, k1.func(t))
			}
		}

		return undefined
	}
}

export default FCurve
