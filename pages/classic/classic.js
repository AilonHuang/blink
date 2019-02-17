import {
	ClassicModel
} from '../../models/classic.js'
import {
	LikeModel
} from '../../models/like.js'

let classicModel = new ClassicModel()
let likeModel = new LikeModel()

Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		classic: null,
		latest: true,
		first: false,
		likeCount: 0,
		likeStatus: false
	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function(options) {
		classicModel.getLatest((data) => {
			this.setData({
				classic: data,
				likeCount: data.fav_nums,
				likeStatus: data.like_status,
			})
		})
	},

	onLike(event) {
		let behavior = event.detail.behavior
		likeModel.like(behavior, this.data.classic.id, this.data.classic.type)
	},

	onNext(event) {
		this._updateClassic('next')
	},

	_updateClassic(nextOrPrevious) {
		const index = this.data.classic.index
		classicModel.getClassic(index, nextOrPrevious, (data) => {
			this._getLikeStatus(data.id, data.type)
			this.setData({
				classic: data,
				latest: classicModel.isLatest(data.index),
				first: classicModel.isFirst(data.index)
			})
		})
	},

	onPreviours(event) {
		this._updateClassic('previous')
	},

	_getLikeStatus(artID, category) {
		likeModel.getClassicLikeStatus(artID, category, (data) => {
			this.setData({
				likeCount: data.fav_nums,
				likeStatus: data.like_status,
			})
		})
	}
})
