export class MovieModel {
  private _id: number;

  get id(): number {
    return this._id;
  }

  set id(value: number) {
    this._id = value;
  }

  constructor(

    public name: string,
    public director: string,
    public actors: string[],
    public genres: string[],
    public year: number,
    public haveOscar: boolean,
    public ratingInMyOpinion: number) {
  }
}
