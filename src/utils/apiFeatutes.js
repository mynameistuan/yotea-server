export class APIFeatutes {
  constructor(query, queryString) {
    this.query = query;
    this.queryString = queryString;
  }

  filter() {
    // 1. Filter (?name=&price=)
    let queryObj = { ...this.queryString };
    const excludedFields = ["page", "sort", "limit", "q"];
    excludedFields.forEach((el) => delete queryObj[el]);

    if (this.queryString.q) {
      queryObj = { ...queryObj, $text: { $search: `"${this.queryString.q}"` } };
    }

    // 2. Advanced filter (price[lte]=)
    let queryStr = JSON.stringify(queryObj);
    queryStr = queryStr.replace(/\b(gte|lte|gt|lt|ne)\b/g, (match) => `$${match}`);

    this.query = this.query.find(JSON.parse(queryStr));
    return this;
  }

  sort() {
    // 3. Sort
    if (this.queryString.sort) {
      const sortBy = this.queryString.sort.split(",").join(" ");
      this.query = this.query.sort(sortBy);
    } else {
      this.query = this.query.sort("-createdAt");
    }

    return this;
  }

  limitFields() {
    // 4. Limit field
    if (this.queryString.fields) {
      const fields = this.queryString.fields.split(",").join(" ");
      this.query = this.query.select(fields);
    } else {
      this.query = this.query.select("-__v");
    }

    return this;
  }

  async paginate() {
    // 5. Pagination
    this.page = +this.queryString.page || 1;
    this.limit = +this.queryString.limit || 3;
    const skip = (this.page - 1) * this.limit;

    const totalResult = await this.query.clone();
    this.total = totalResult.length;
    if (this.queryString.page && skip >= this.total) {
      return res.status(404).json({
        status: false,
        message: "Page not found",
      });
    }

    this.query = this.query.skip(skip).limit(this.limit);

    return this;
  }
}
