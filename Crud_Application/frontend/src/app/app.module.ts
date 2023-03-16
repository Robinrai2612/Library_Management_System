import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { AddComponent } from './books/add/add.component';
import { EditComponent } from './books/edit/edit.component';
import { DetailComponent } from './books/detail/detail.component';
import { GraphQLModule } from './graphql.module';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { bookreducer } from './store/books.reducer';


@NgModule({
  declarations: [AppComponent, AddComponent, EditComponent, DetailComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    StoreModule.forRoot({library:bookreducer}),
    StoreDevtoolsModule.instrument({ }),
    GraphQLModule,
    HttpClientModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
