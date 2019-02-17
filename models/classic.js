import {
	HTTP
} from '../util/http.js'

class ClassicModel extends HTTP {
	getLatest(sCallback) {
		this.request({
			url: 'classic/latest',
			success: (data) => {
				sCallback(data)
				this._setLatestIndex(data.index)
			}
		})
	}

	getClassic(index, nextOrPrevious, sCallback) {
		let key = nextOrPrevious == 'next' ? 
				this._getKey(index + 1) : this._getKey(index - 1)
		let classic = wx.getStorageSync(key)
		if (!classic) {
			this.request({
				url: `classic/${index}/${nextOrPrevious}`,
				success: (data) => {
					wx.setStorageSync(this._getKey(data.index), data)
					sCallback(data)
				}
			})
		} else {
			sCallback(classic)
		}
	}

	isFirst(index) {
		return index == 1 ? true : false
	}

	isLatest(index) {
		let latestIndex = this._getLatestIndex()
		return latestIndex == index ? true : false
	}

	_setLatestIndex(index) {
		wx.setStorageSync('latest', index)
	}

	_getLatestIndex() {
		let index = wx.getStorageSync('latest')
		return index
	}

	_getKey(index) {
		let key = 'classic-' + index
		return key
	}
}

export {
	ClassicModel
}
