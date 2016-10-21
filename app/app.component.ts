import { Component } from '@angular/core';

@Component({
selector: 'my-app',
template: `<h1></h1>`
})

export class AppComponent {
      // ngAfterViewInit() {
      //       var tag = document.createElement('script');
      //       tag.src = "https://www.youtube.com/iframe_api";
      //       var firstScriptTag = document.getElementsByTagName('script')[0];
      //       firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
      // }
      // private id: string;
      // private apiKey: string;
      // constructor() {
      //       this.id = "-kKCjwNvNkQ";
      //       this.apiKey = "AIzaSyCe0Bk74tTA11XtbRQDqgUy9n9d0tkjv4k";
      // }
}

// import { Component, AfterViewInit } from '@angular/core';
//
// import { YoutubePlayerComponent } from 'ng2-youtube/index'
//
// @Component({
// selector: 'my-app',
// template: `<youtube-player [id]="id" [apiKey]="apiKey"></youtube-player>`
// })
//
// export class AppComponent implements AfterViewInit{
//       ngAfterViewInit() {
//             var tag = document.createElement('script');
//             tag.src = "https://www.youtube.com/iframe_api";
//             var firstScriptTag = document.getElementsByTagName('script')[0];
//             firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
//       }
//       private id: string;
//       private apiKey: string;
//       constructor() {
//             this.id = "-kKCjwNvNkQ";
//             this.apiKey = "AIzaSyCe0Bk74tTA11XtbRQDqgUy9n9d0tkjv4k";
//       }
// }
