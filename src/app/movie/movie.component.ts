import {Component, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {MovieService} from "./movie.service.service";
import {MovieModel} from "./movie.model";
import {MatDialog} from "@angular/material/dialog";
import {CreateComponent} from "../create/create.component";
import {FormControl, FormGroup} from "@angular/forms";
import {UpdateComponent} from "../update/update.component";

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.css']
})
export class MovieComponent implements OnInit, OnChanges {
  allMovies: MovieModel[];
  pageNumber: number = 1;
  allGenres: Set<string>;
  allYears: Set<number>;
  form: FormGroup;
  genre: string = "noGenre";
  year: string = "0";

  constructor(private movieService: MovieService,
              private dialog: MatDialog) {
  }

  ngOnChanges(): void {
    console.log("1")
  }


  ngOnInit(): void {
    Array.of(this.allGenres);
    this.form = new FormGroup({
      genre: new FormControl(),
      year: new FormControl(),
    })
    this.movieService.getAllGenres().subscribe(data => this.allGenres = data);
    this.movieService.getAllMovies().subscribe(data => this.allMovies = data);
    this.movieService.getAllYears().subscribe(data => this.allYears = data);
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
