/**
 * Message helper module
 *
 * @module lib/Message
 */

/**
 * Message helper
 *
 * @class Message
 */
export default class Message {
	constructor() {
		this._listeners = {};

		// Setup a listener
		window.addEventListener('message', e => {
			const request = e.data;
			if( ! request) return;

			const {messageId, data} = request;

			if(this._listeners[messageId] && (typeof this._listeners[messageId] === 'function')) {
				const callback = this._listeners[messageId];

				callback(data);
			}
		}, false);
	}

	/**
	 * Callback that executes when message is received.
	 *
	 * @callback requestCallback
	 * @param {*} data
	 */

	/**
	 * Listen for message from background
	 *
	 * @param {string} messageId - Unique message Identifier
	 * @param {requestCallback} callback - Callback that executes when message is received.
	 * @memberof Message
	 */
	receive(messageId, callback) {
		this._listeners[messageId] = callback;
	}

	/**
	 * Send message to scripts
	 *
	 * @param {string} messageId - Unique message Identifier
	 * @param {*} [data=null]
	 * @memberof Message
	 */
	send(messageId, data = null) {
		window.postMessage({messageId, data}, '*');
	}
}
