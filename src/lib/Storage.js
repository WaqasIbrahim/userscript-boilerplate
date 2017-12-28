/**
 * GM storage helper module
 *
 * @module lib/Storage
 */

/**
 * GM storage helper class
 *
 * @class Storage
 */
export default class Storage {
	/**
	 * Retrieve values from storage
	 *
	 * @param {string} [key=null] - Item to retrieve
	 * @param {*} [defaultValue=null] - Default value if item not found
	 * @returns {Promise}
	 * @memberof Storage
	 */
	read(key = null, defaultValue = null) {
		return GM.getValue(key, defaultValue);
	}

	/**
	 * Write to storage
	 *
	 * @param {string} key
	 * @param {*} value
	 * @returns {Promise}
	 * @memberof Storage
	 */
	write(key, value) {
		return GM.setValue(key, value);
	}
}
