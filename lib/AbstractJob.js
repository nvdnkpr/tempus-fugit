module.exports = AbstractJob;

/*
	@param task 	- optional, a function that will be executed
	@param options 	- { unref: [boolean] }
*/
function AbstractJob(task, options) {

	if (task)
		this._task = task;
	else
		options = task;

	if (!options)
		throw new Error('missing options');

	this._options = options;
}

AbstractJob.prototype.execute = function () {

	this._ref = this._executeImpl();

	if (this._ref && this._options.unref)
		this._ref.unref();
};

AbstractJob.prototype._executeImpl = function () {
	throw new Error('must implement');
};

/*
	must be overridden or assigned
*/
AbstractJob.prototype._task = function() {
	throw new Error('assign as task to this job or subclass it and "override" this method');
};

AbstractJob.prototype.cancel = function () {
	throw new Error('must implement');
};