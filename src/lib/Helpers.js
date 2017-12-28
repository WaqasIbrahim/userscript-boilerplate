/**
 * Helper functions module
 *
 * @module lib/Helpers
 */

/**
 * Helper functions class
 *
 * @class Helpers
 */
export default class Helpers {
	/**
	 * Format bytes to readable size
	 *
	 * @param {number} bytes - Number of bytes
	 * @returns {string}
	 */
	static formatBytes(bytes) {
		const sizes = ['B', 'KB', 'MB', 'GB'];
		const i = Math.floor(Math.log(bytes) / Math.log(1024));

		return bytes === 0 ? '0B' :
			parseFloat((bytes / Math.pow(1024, i)).toFixed(1)) + sizes[i];
	}

	/**
	 * Get paramter value for a query string of URL
	 *
	 * @param {string} name
	 * @param {string} url
	 * @returns {string|null}
	 */
	static getParameterByName(name, url) {
		/* eslint-disable no-useless-escape */
		name = name.replace(/[\[\]]/g, '\\$&');
		/* eslint-enable no-useless-escape */
		const regex = new RegExp(`[?&]${name}(=([^&#]*)|&|#|$)`);
		const results = regex.exec(url);
		if (!results) return null;
		if (!results[2]) return '';
		return decodeURIComponent(results[2].replace(/\+/g, ' '));
	}

	/**
	 *
	 * @param {number} value
	 * @returns {boolean}
	 */
	static isInteger(value) {
		return typeof value === 'number' &&
			isFinite(value) &&
			Math.floor(value) === value;
	}

	/**
	 *
	 * @param {string} value
	 * @returns {boolean}
	 */
	static isString(value) {
		return (typeof value === 'string' || value instanceof String);
	}

	/**
	 *
	 * @param {string} url
	 * @returns {Promise}
	 */
	static getFileSize(url) {
		return new Promise(resolve => {
			GM.xmlHttpRequest({
				url: url,
				method: 'HEAD',
				headers: {
					'Cache-Control': 'no-cache'
				},
				onload: function(response) {
					const regex = /^content-length: (\d*)$/mig;
					const size = regex.exec(response.responseHeaders)[1];
					resolve(size);
				}
			});
		});
	}

	/**
	 *
	 * @returns {boolean}
	 */
	static isFirefox() {
		return navigator.userAgent.search('Firefox') >= 0;
	}

	/**
	 *
	 * @param {string} href
	 */
	static addStylesheet(href) {
		const stylesheet = document.createElement('link');
		stylesheet.rel = 'stylesheet';
		stylesheet.href = href;

		document.body.appendChild(stylesheet);
	}
}
