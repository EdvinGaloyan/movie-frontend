export class MovieFormModel {
  public id: number;
  constructor(
    public name: string,
    public director: string,
    public actors: string,
    public genres: string,
    public year: number,
    public haveOscar: boolean,
    public ratingInMyOpinion: number) {
  }
}
