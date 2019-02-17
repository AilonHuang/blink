import {
	classicBeh
} from '../classic-beh.js'

const backgroundAudioManager = wx.getBackgroundAudioManager()

Component({
	behaviors: [
		classicBeh
	],
	/**
	 * 组件的属性列表
	 */
	properties: {
		src: String,
		title: String
	},

	/**
	 * 组件的初始数据
	 */
	data: {
		playing: false,
		pauseSrc: 'images/player@pause.png',
		playSrc: 'images/player@play.png',
	},

	attached() {
		this._recoverStatus()
		this._monitorSwitch()
	},

	/**
	 * 组件的方法列表
	 */
	methods: {
		onPlay(event) {
			if (!this.data.playing) {
				this.setData({
					playing: true
				})

				backgroundAudioManager.title = this.properties.title
				// 设置了 src 之后会自动播放
				backgroundAudioManager.src = this.properties.src

			} else {
				this.setData({
					playing: false
				})
				backgroundAudioManager.pause()
			}
		},

		_recoverStatus() {
			console.log(backgroundAudioManager.paused)
			if (backgroundAudioManager.paused) {
				this.setData({
					playing: false
				})
				return
			}

			if (backgroundAudioManager.src == this.properties.src) {
				this.setData({
					playing: true
				})
			}
		},

		_monitorSwitch() {
			backgroundAudioManager.onPlay(() => {
				this._recoverStatus()
			})
			backgroundAudioManager.onPause(() => {
				this._recoverStatus()
			})
			backgroundAudioManager.onStop(() => {
				this._recoverStatus()
			})
			backgroundAudioManager.onEnded(() => {
				this._recoverStatus()
			})
		}
	}
})
