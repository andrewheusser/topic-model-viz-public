import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent }  from './app.component';
import { TopicVizComponent }  from './topicviz/topicviz.component';
import { YoutubeComponent }  from './youtube/youtube.component';

import { OrderByPipe }  from './orderby.pipe';

@NgModule({
  imports: [ BrowserModule ],
  declarations: [ AppComponent, TopicVizComponent, YoutubeComponent, OrderByPipe],
  bootstrap: [ AppComponent, TopicVizComponent, YoutubeComponent ]
})
export class AppModule { }
