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

  // declare private vars
  private TopicsData: any;
  private topics: any;
  private uniqueIDs: any;

  constructor(private topicModelDataService: TopicModelDataService) { }

  //  init function
  ngOnInit() {
    this.TopicsData = this.getTopicModelData();
    this.uniqueIDs = this.getUniqueIds(this.TopicsData);
    this.topicColors = this.mapColors(this.uniqueIDs);
    this.topics = this.TopicsData[0]
    this.updateData()
  }

  // update function
  updateData() {
    setTimeout(() => {
      if (this.n >= this.TopicsData.length) { this.n = 0; }
      this.topics = this.TopicsData[this.n];
      console.log("updating!")
      this.updateData();
      this.n = this.n + 1;
    }, 2000);
  };

  // data retrieval function
  getTopicModelData() {
    return this.topicModelDataService.getTopicModelData()
  }

  // helper functions

  mapColors(data: any) {
    var colors = chroma.scale('Spectral').colors(data.length)
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
