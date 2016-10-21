import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent }  from './app.component';
import { TopicVizComponent }  from './topicviz/topicviz.component';

import { OrderByPipe }  from './orderby.pipe';

@NgModule({
  imports: [ BrowserModule ],
  declarations: [ AppComponent, TopicVizComponent, OrderByPipe ],
  bootstrap: [ AppComponent, TopicVizComponent ],
})

export class AppModule { }

// import { NgModule }      from '@angular/core';
// import { BrowserModule } from '@angular/platform-browser';
//
// import { AppComponent }  from './app.component';
// import { TopicVizComponent }  from './topicviz/topicviz.component';
// import { YoutubeComponent }  from './youtube/youtube.component';
//
// import { OrderByPipe }  from './orderby.pipe';
//
// import { HttpModule } from '@angular/http';
//
// import { YoutubePlayerComponent, WindowRef, YoutubeService } from 'ng2-youtube/index';
//
// @NgModule({
//   imports: [ BrowserModule, HttpModule ],
//   declarations: [ AppComponent, TopicVizComponent, YoutubeComponent, YoutubePlayerComponent, OrderByPipe ],
//   bootstrap: [ AppComponent, TopicVizComponent ],
//   providers: [WindowRef, YoutubeService ]
// })
//
// export class AppModule { }
