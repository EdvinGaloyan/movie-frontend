import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {MatDialogRef} from "@angular/material/dialog";
import {MovieService} from "../movie/movie.service.service";

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css']
})
export class UpdateComponent implements OnInit {

  form: FormGroup;

  constructor(private dialogRef: MatDialogRef<UpdateComponent>,
              private movieService: MovieService) {
  }

  ngOnInit(): void {
    this.form = new FormGroup({
      name: new FormControl(),
      director: new FormControl(),
      actors: new FormControl(),
      genres: new FormControl(),
      year: new FormControl(),
      haveOscar: new FormControl(),
      ratingInMyOpinion: new FormControl()
    });
  }

  onUpdate() {
    this.movieService.onUpdate(this.form.value);
    this.dialogRef.close(UpdateComponent);
  }

  onReset() {
    this.dialogRef.close(UpdateComponent);
  }
}
