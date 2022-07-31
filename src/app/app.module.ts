import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { MovieComponent } from './movie/movie.component';
import {MovieService} from "./movie/movie.service.service";
import {HttpClientModule} from "@angular/common/http";
import {ReactiveFormsModule} from "@angular/forms";
import { CreateComponent } from './create/create.component';
import {NgxPaginationModule} from "ngx-pagination";
import {MAT_DIALOG_DEFAULT_OPTIONS, MatDialogModule} from "@angular/material/dialog";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import { UpdateComponent } from './update/update.component';

@NgModule({
  declarations: [
    AppComponent,
    MovieComponent,
    CreateComponent,
    UpdateComponent
  ],
  imports: [
    NgxPaginationModule,
    MatDialogModule,
    ReactiveFormsModule,
    BrowserModule,
    HttpClientModule,
    BrowserModule,
    MatCheckboxModule,
    BrowserAnimationsModule
  ],
  providers: [MovieService],
  bootstrap: [AppComponent]
})
export class AppModule { }
