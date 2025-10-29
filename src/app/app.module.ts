import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { DatesModule } from './modules/dates/dates.module';
import { UserService } from './services/user.service';
import { CalendarComponent } from './components/calendar/calendar.component';
import { CalendarService } from './services/calendar.service';
import { QuoteComponent } from './components/quote/quote.component';
import { QuoteService } from './services/quote.service';
import { ErrorHandlerService } from './services/error-handler.service';

@NgModule({ declarations: [
        AppComponent,
        HomeComponent,
        RegisterComponent,
        LoginComponent,
        CalendarComponent,
        QuoteComponent,
    ],
    bootstrap: [AppComponent], imports: [BrowserModule,
        AppRoutingModule,
        ReactiveFormsModule,
        DatesModule], providers: [UserService, CalendarService, QuoteService, ErrorHandlerService, provideHttpClient(withInterceptorsFromDi())] })
export class AppModule {}
