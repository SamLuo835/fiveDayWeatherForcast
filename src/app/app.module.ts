import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NzMessageModule } from 'ng-zorro-antd/message';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { HttpClientModule } from '@angular/common/http';
import { NzInputModule } from 'ng-zorro-antd/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { DisplayForecastComponent } from './display-forecast/display-forecast.component';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { TransformTempPipe } from './pipes/util-pipe.pipe';

@NgModule({
  declarations: [
    AppComponent,
    DisplayForecastComponent,
    TransformTempPipe,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NzButtonModule,
    HttpClientModule,
    NzMessageModule,
    NzInputModule,
    BrowserAnimationsModule,
    FormsModule,
    NzGridModule,
    NzCardModule,
    NzSpinModule,
    NzIconModule,
    NzSelectModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
