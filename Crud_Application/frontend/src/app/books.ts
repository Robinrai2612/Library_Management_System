export interface Book {
  _id?: string;
  isbn?: String;
  title?: String;
  author?: String;
  description?: String;
  published_year?: { type: Number; min: 1945; max: 2019 };
  publisher?: String;
  updated_date?: { type: Date };
}
