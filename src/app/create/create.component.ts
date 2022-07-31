import {Component, OnInit} from '@angular/core';
import {MovieService} from "../movie/movie.service.service";
import {MatDialogRef} from "@angular/material/dialog";
import {AbstractControl, FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {

  form: FormGroup;
  constructor(private dialogRef: MatDialogRef<CreateComponent>,
              private movieService: MovieService) {
  }

  ngOnInit(): void {
    this.form = new FormGroup({
      name: new FormControl('',[Validators.required]),
      director: new FormControl(),
      actors: new FormControl(),
      genres: new FormControl(),
      year: new FormControl(),
      haveOscar: new FormControl(),
      ratingInMyOpinion: new FormControl()
    });
  }

  get f(): { [key: string]: AbstractControl } {
    return this.form.controls;
  }

  onCreate() {
    this.form.addControl("name",new FormControl("",Validators.maxLength(2)))
    this.movieService.onCreate(this.form.value);
    this.dialogRef.close(CreateComponent);
  }

  onReset() {
    this.dialogRef.close(CreateComponent);

  }
}
