/**
 * Bootstrap application
 *
 * @module app
 */

import config from './config';
import Storage from './lib/Storage';
import Message from './lib/Message';
import Helpers from './lib/Helpers';

const app = {
	config: config,
	storage: new Storage(),
	message: new Message(),
	helpers: Helpers
};

export default app;
