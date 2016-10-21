import { Component, AfterViewInit } from '@angular/core';

import { YoutubePlayerComponent } from 'ng2-youtube/index'

@Component({
 selector: 'youtube',
 template: '<youtube-player [id]="id" [apiKey]="apiKey"></youtube-player>',
})

export class YoutubeComponent {
     private id: string;
     private apiKey: string;
     constructor() {
           this.id = "VzjJR6tTx1c";
           this.apiKey = "AIzaSyCe0Bk74tTA11XtbRQDqgUy9n9d0tkjv4k";
     }
}
