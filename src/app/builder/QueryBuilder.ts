import { FilterQuery } from 'mongoose';
import { Query } from 'mongoose';

class QueryBuilder<T> {
  public modelQuery: Query<T[], T>;
  public query: Record<string, unknown>;

  constructor(modelQuery: Query<T[], T>, query: Record<string, unknown>) {
    this.modelQuery = modelQuery;
    this.query = query;
  }

  search(productSearchableFields: string[]) {
    const searchParams = this?.query?.searchParams || '';

    if (searchParams) {
      this.modelQuery = this.modelQuery.find({
        $or: productSearchableFields.map(
          (field) =>
            ({
              [field]: { $regex: searchParams, $options: 'i' },
            }) as FilterQuery<T>,
        ),
      });
    }

    return this;
  }

  //exact field value matching [query -> email=john@gmail.com]
  filter() {
    const queryObj = { ...this?.query };
    const excludeFields = ['searchParams', 'sort', 'limit', 'page', 'fields'];
    excludeFields.forEach((field) => delete queryObj[field]);

    // Handle price range from query parameters
    const min = Number(queryObj.min);
    const max = Number(queryObj.max);
    if (!isNaN(min) && !isNaN(max)) {
      delete queryObj.min;
      delete queryObj.max;
      queryObj.price = { $gte: min, $lte: max };
    } else if (min !== undefined || max !== undefined) {
      //   console.warn(
      //     'Invalid price range format. Please provide both min and max values.',
      //   );
    }

    // Handle rating filter
    const rating = Number(queryObj.rating);
    if (!isNaN(rating)) {
      delete queryObj.rating;
      queryObj.rating = { $gte: rating };
    } else if (rating !== undefined) {
      //   console.warn('Invalid rating format. Please provide a valid number.');
    }

    this.modelQuery = this.modelQuery.find(queryObj as FilterQuery<T>);
    return this;
  }

  //sorting [query -> sort=id,name]
  sort() {
    const sort =
      (this?.query?.sort as string)?.split(',')?.join(' ') || 'createdAt';
    this.modelQuery = this?.modelQuery?.sort(sort);

    return this;
  }

  //paginating [query -> page=1&limit=1]
  paginate() {
    const page = Number(this?.query?.page) || 1;
    const limit = Number(this?.query?.limit) || 100;
    const skip = (page - 1) * limit;
    this.modelQuery = this?.modelQuery?.skip(skip).limit(limit);

    return this;
  }

  //fileds limiting [query -> fields=name,email or fields=-name]
  fields() {
    const fields =
      (this?.query?.fields as string)?.split(',')?.join(' ') || '-__v';

    this.modelQuery = this.modelQuery.select(fields);

    return this;
  }
}

export default QueryBuilder;
