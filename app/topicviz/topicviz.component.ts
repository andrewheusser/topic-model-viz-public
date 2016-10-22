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

  // set this to change number of topics, number of words
  public numTopics: number = 10;
  public numWords: number = 5;

  // this sets the color palette, see chroma.js docs for API
  private colorPalette: any = 'Spectral';

  // this sets the rate at which the data updates
  private updateRate: number = 15;

  // this sets the size of each word component
  public wordWidth: number = 200;
  public wordHeight: number = 50;

  // initialize private variable
  private TopicsData: any;
  private currentData: any;
  private uniqueIDs: any;
  private fontParams: any;
  private opacityParams: any;
  private fontMinMax: any;
  private opacityMinMax: any;

  // initialize a few other public variables
  public topicColors: any;
  public n: number = 0;

  // inject the topic model data service
  constructor(private topicModelDataService: TopicModelDataService) { }

  //  init function
  ngOnInit() {

    // get all the data
    this.TopicsData = this.getTopicModelData();

    // get unique ids for each topic
    this.uniqueIDs = this.getUniqueIds(this.TopicsData);

    // map the ids to colors
    this.topicColors = this.mapColors(this.uniqueIDs, this.colorPalette);

    // normalize weights within topic
    this.normalizeWeights(this.TopicsData)

    // compute font params
    this.fontMinMax = this.getFontMinMax(this.TopicsData)

    this.fontParams = {
      wmin: this.wordHeight * .1,
      wmax: this.wordHeight * .8,
      xmin: this.fontMinMax[0],
      xmax: this.fontMinMax[1]
    }

    this.opacityMinMax = this.getOpacityMinMax(this.TopicsData)

    this.opacityParams = {
      omin: this.opacityMinMax[0],
      omax: this.opacityMinMax[1]
    }

    // assign current data and start transition immediately
    this.currentData = this.TopicsData[0]
    this.updateData()
  }

  // update function
  updateData() {
    setTimeout(() => {
      if (this.n >= this.TopicsData.length) { this.n = 0; }
      this.currentData = this.TopicsData[this.n];
      console.log("updating!")
      this.n = this.n + 1;
      this.updateData();
    }, this.updateRate * 1000);
  };

  // data retrieval function
  getTopicModelData() {
    return this.topicModelDataService.getTopicModelData()
  }


  // helper functions //////////////////////////////////////////////////////////

  getOpacityMinMax(data: any) {
    var arr: any = [];
    for (let timepoint of data) {
      for (let topic of timepoint) {
        arr.push(topic['weight'])
      }
    }
    var min = Math.min.apply(null, arr);
    var max = Math.max.apply(null, arr);
    return [min, max]
  };

  scaleOpacity(data: any) {
    var params = this.opacityParams;
    return (data - params.omin) / params.omax
  };

  normalizeWeights(data: any) {
    for (let timepoint of data) {
      for (let topic of timepoint) {
        var arr: any = [];
        for (let word of topic.data) {
          arr.push(word['weight']);
        }
        var min = Math.min.apply(null, arr);
        for (let i in topic.data) {
          arr[i] = arr[i] - min;
        }
        var max = Math.max.apply(null, arr);
        for (let i in topic.data) {
          arr[i] = arr[i] / max;
        }
        topic.data.forEach((word:any, i:number) => {
          word['weight'] = arr[i];
        })
      }
    }
    return data
  };

  getFontMinMax(data: any) {
    var arr: any = [];
    for (let timepoint of data) {
      for (let topic of timepoint) {
        for (let word of topic.data) {
          arr.push(word['weight']);
        }
      }
    }
    return [Math.min.apply(null, arr), Math.max.apply(null, arr)]
  }

  scaleFont(x: number) {
    var params = this.fontParams;
    var y = (x - params.xmin) / params.xmax;
    return y * params.wmax + (1 - y) * params.wmin;
  }

  normalizeWords(words: any) {
    return words
  }

  mapColors(data: any, color: string) {
    var colors = chroma.scale(color).colors(data.length)
    // var shuffledColors = this.shuffle(colors)
    var colorMap = {}
    data.forEach((item: any, idx: any) => {
      colorMap[item] = colors[idx]
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
