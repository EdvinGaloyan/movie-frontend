import {Component, OnInit} from '@angular/core';
import {MovieService} from "./movie.service.service";
import {MovieModel} from "./movie.model";
import {MatDialog} from "@angular/material/dialog";
import {CreateComponent} from "../create/create.component";
import {FormControl, FormGroup} from "@angular/forms";
import {UpdateComponent} from "../update/update.component";
import {zip} from "rxjs";

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.css']
})
export class MovieComponent implements OnInit {
  allMovies: MovieModel[];
  pageNumber: number = 1;
  allGenres: Set<any>;
  allYears: Set<any>;
  form: FormGroup;
  genre: string = "noGenre";
  year: string = "0";

  constructor(private movieService: MovieService,
              private dialog: MatDialog) {
  }

  ngOnInit(): void {
    Array.of(this.allGenres);
    this.form = new FormGroup({
      genre: new FormControl(),
      year: new FormControl(),
    })
    this.getObservables().subscribe(data=>{
      this.allGenres = data[0];
      this.allMovies = data[1];
      this.allYears = data[2];
    })
  }

  private getObservables(){
    const $allGenres = this.movieService.getAllGenres();
    const $allMovies = this.movieService.getAllMovies();
    const $allReleaseYears = this.movieService.getAllYears();
    return zip($allGenres,$allMovies,$allReleaseYears);
  }

  onCreate(): void {
    this.dialog.open(CreateComponent, {
      width: '500px', height: "500px", disableClose: true
    });
  }

  onUpdate():void{
    this.dialog.open(UpdateComponent, {
      width: '500px', height: "500px", disableClose: true
    });
  }

  onSelect(): void {
    this.movieService.onSelect(this.form.value).subscribe(movies => this.allMovies = movies);
  }
}
