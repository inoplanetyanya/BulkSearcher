import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { LotsListComponent } from './lostList/lotsList.component';
import { MinMaxComponent } from './minMax/minMax.component';
import { RadioButtonsComponent } from './radioButtons/radioButtons.component';
// import { InputsGroupComponent } from './inputsGroup/inputsGroup.component';
import { SingleInputComponent } from './singleInput/singleInput.component';
import { ButtonComponent } from './searchButton/searchBbutton.component';
import { SearchPlaceholderComponent } from './searchPlaceholder/searchPlaceholder.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LotsListComponent,
    MinMaxComponent,
    RadioButtonsComponent,
    // InputsGroupComponent,
    SingleInputComponent,
    ButtonComponent,
    SearchPlaceholderComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
