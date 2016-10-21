import { Component, OnInit } from '@angular/core';

import { TopicModelDataService } from './topic-model-data.service';

// import chroma library
declare var chroma: any;

@Component({
  moduleId: module.id,
  selector: 'topicviz',
  templateUrl: 'topicviz.component.html',
  styleUrls: ['topicviz.component.css'],
  providers: [TopicModelDataService],

})

export class TopicVizComponent implements OnInit {

  // declare public variables
  public numTopics: number = 10;
  public numWords: number = 5;
  public topicColors: any;
  public n: number = 0;
  public wordWidth: number = 200;
  public wordHeight: number = 50;

  // declare private vars
  private TopicsData: any;
  private currentData: any;
  private uniqueIDs: any;
  private params: any;
  private minmax: any;
  private colorPallete: any = 'Spectral';


  constructor(private topicModelDataService: TopicModelDataService) { }

  //  init function
  ngOnInit() {

    // get all the data
    this.TopicsData = this.getTopicModelData();

    // get unique ids for each topic
    this.uniqueIDs = this.getUniqueIds(this.TopicsData);

    // map the ids to colors
    this.topicColors = this.mapColors(this.uniqueIDs, this.colorPallete);

    // normalize weights within topic
    this.normalizeWeights(this.TopicsData)

    // compute font params
    this.minmax = this.getMinMax(this.TopicsData)

    this.params = {
      wmin: this.wordHeight/10,
      wmax: this.wordHeight*.9,
      xmin: this.minmax[0],
      xmax: this.minmax[1]
    }

    // assign
    this.currentData = this.TopicsData[0]
    this.updateData()
  }

  // update function
  updateData() {
    setTimeout(() => {
      if (this.n >= this.TopicsData.length) { this.n = 0; }
      this.currentData = this.TopicsData[this.n];
      console.log("updating!")
      this.updateData();
      this.n = this.n + 1;
    }, 1000);
  };

  // data retrieval function
  getTopicModelData() {
    return this.topicModelDataService.getTopicModelData()
  }

  // helper functions

normalizeWeights(data:any){
  for (let timepoint of data) {
    for (let topic of timepoint) {
      var arr: any = [];
      for (let word of topic.data) {
        arr.push(word['weight']);
      }
      console.log('weights',arr)
      var min = Math.min.apply(null, arr);
      var max = Math.max.apply(null, arr);
      for (let word of topic.data) {
        word['weight'] = word['weight']/ max;
      }
    }
  }
  return data
};

  getMinMax(data:any){
    var arr:any = [];
    for (let timepoint of data) {
      for (let topic of timepoint) {
        for (let word of topic.data){
          arr.push(word['weight']);
        }
      }
    }
    return [Math.min.apply(null, arr), Math.max.apply(null, arr)]
  }

  scaleFont(x:number){
    var params = this.params
    var y = (x - params.xmin) / params.xmax;
    return y * params.wmax + (1 - y) * params.wmin;
  }

  // scaleOpacity(x:number,params:any){
  //
  // }

  normalizeWords(words:any){
    return words
  }

  mapColors(data: any, color:string) {
    var colors = chroma.scale(color).colors(data.length)
    var shuffledColors = this.shuffle(colors)
    var colorMap = {}
    data.forEach((item: any, idx: any) => {
      colorMap[item] = shuffledColors[idx]
    })
    return colorMap
  };

  getUniqueIds(data: any) {
    var arr: any = [];
    for (let timepoint of data) {
      for (let topic of timepoint) {
        if (!this.contains(arr, topic['id'])) {
          arr.push(topic['id']);
        }
      }
    }
    return arr
  };

  contains(arr: any, v: any) {
    for (var i = 0; i < arr.length; i++) {
      if (arr[i] === v) return true;
    }
    return false;
  };

  shuffle(a: any) {
    for (let i = a.length; i; i--) {
      let j = Math.floor(Math.random() * i);
      [a[i - 1], a[j]] = [a[j], a[i - 1]];
    }
    return a;
  };

}
