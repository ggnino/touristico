// API features filtering sorting limiting and pagination
// Search by difficulty,duration,ratingsAverage,price,etc.
class APIFeatures {
	// private fields
	#sort;
	#page;
	#limit;
	#fields;
	#skip;
	#queryObj;
	constructor(query, queryString) {
		this.query = query;
		// destructor the queryString which is the req.query obj
		const { page, sort, limit, fields, ...queryObj } = queryString;
		this.#page = page;
		this.#sort = sort;
		this.#limit = limit;
		this.#fields = fields;
		this.#queryObj = queryObj;
	}
	// Filter method for filtering queries
	filter() {
		// format this.#queryObj into mongoDB format
		this.formatStr(this.#queryObj);

		// find only the filterd values in the query
		this.query = this.query.find(this.#queryObj);

		// return query for execution/chaining
		return this;
	}
	// Sort method for sorting queries
	sort() {
		if (this.#sort) {
			// format string into mongoDB format
			this.formatStr(this.#sort);

			// sort the query with this.#sort value
			this.query = this.query.sort(this.#sort);
		}
		// default sorting when no value in this.#sort
		else this.query = this.query.sort('-createdAt -_id');
		// return query for execution/chaining
		return this;
	}
	// Limit Fields method for limiting the amount of display info
	limitFields() {
		if (this.#fields) {
			// format string into mongoDB format
			// this.#fields = this.#fields.replace(/,/g, ' ');
			this.formatStr(this.#fields);
			// display selected fields only
			this.query = this.query.select(this.#fields);
		}
		// remove selected field by default
		else this.query = this.query.select('-__v');
		// return query for execution/chaining
		return this;
	}
	// Pagination method for displaying correct paged results
	pagination() {
		// format string into integer or default values
		this.formatStr(this.#page, this.#limit);
		// skip value for skipping documents into the correct page
		// Ex: page 1 -> 1-10, page 2 -> 11-20, page 3 -> 21-30
		this.#skip = (this.#page - 1) * this.#limit;
		this.query = this.query.skip(this.#skip).limit(this.#limit);
		// return query for execution
		return this;
	}
	// Format method for formating strings into mongoDB format
	formatStr(value, val = null) {
		if (typeof value === 'object') {
			// turn obj into string
			let queryStr = JSON.stringify(this.#queryObj);
			// find any mongoDB values and format it
			queryStr = queryStr.replace(
				/\b(gte|gt|lte|lt)\b/g,
				(match) => `$${match}`
			);
			// assign newly filterd obj into the this.#queryObj
			this.#queryObj = JSON.parse(queryStr);
		}
		// when value is not an object
		else if ((value && val) || (!value && val) || (!value && !val)) {
			value = value * 1 || 1; // this.#page into integer
			val = val * 1 || 100; // this.#limit into integer
		}
		// when value is not an object or integer, replace comma
		else value = value.replace(/,/g, ' ');
	}
}
export default APIFeatures;
