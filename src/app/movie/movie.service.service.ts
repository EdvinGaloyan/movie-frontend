import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {MovieModel} from "./movie.model";
import {Observable} from "rxjs";
import {MovieFormModel} from "./movie.form.model";
import {map, mergeMap} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class MovieService {


  constructor(private http: HttpClient) {
  }

  public getAllMovies(): Observable<MovieModel[]> {
    return this.http.get<MovieModel[]>("http://localhost:8080/movie");
  }

  public getAllGenres(): Observable<Set<string>> {
    let genres = [];
    return this.getAllMovies().pipe(mergeMap(movies => movies.map(movie => {
      movie.genres.forEach(data => genres.push(data));
      return new Set(genres.sort((num1, num2) => num1.localeCompare(num2)));
    })))
  }

  public getAllYears(): Observable<Set<number>> {
    let years = [];
    return this.getAllMovies().pipe(map(movies => {
        movies.forEach(movie => years.push(movie.year));
        return new Set(years.sort((num1, num2) => num1 - num2));
      }
    ))
  }

  public onCreate(movieModel: MovieFormModel): void {
    let movie: MovieModel = new MovieModel(movieModel.name,
      movieModel.director,
      movieModel.actors.split(","),
      movieModel.genres.split(","),
      movieModel.year,
      movieModel.haveOscar,
      movieModel.ratingInMyOpinion);
    this.http.post<MovieModel>("http://localhost:8080/movie", JSON.stringify(movie),
      {
        headers: new HttpHeaders(
          {
            "Content-Type": "application/json"
          }
        )
      }).subscribe();
  }

  public onUpdate(movieModel: MovieFormModel):void{
    const name = movieModel.name;
    let movie: MovieModel = new MovieModel(movieModel.name,
      movieModel.director,
      movieModel.actors.split(","),
      movieModel.genres.split(","),
      movieModel.year,
      movieModel.haveOscar,
      movieModel.ratingInMyOpinion);
    this.http.post<MovieModel>(`http://localhost:8080/movie/${name}`, JSON.stringify(movie),
      {
        headers: new HttpHeaders(
          {
            "Content-Type": "application/json"
          }
        )
      }).subscribe();
  }

  public onSelect(form: { genre: string, year: number }) {
    return this.http.get<MovieModel[]>(`http://localhost:8080/movie/select?genre=${form.genre}&year=${+form.year}`);
  }
}
