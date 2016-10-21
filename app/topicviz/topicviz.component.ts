import { Component, OnInit } from '@angular/core';

import { TopicModelDataService } from './topic-model-data.service';

@Component({
  moduleId: module.id,
  selector: 'topicviz',
  templateUrl: 'topicviz.component.html',
  styleUrls: ['topicviz.component.css'],
  providers: [ TopicModelDataService ],

})

export class TopicVizComponent implements OnInit {

  public n: number = 0;
  public numTopics: number = 3;
  public numWords: number = 5;

  TopicsData: any;
  topics: any;

  constructor(private topicModelDataService: TopicModelDataService) {}

  getTopicModelData(){
    return this.topicModelDataService.getTopicModelData()
  }

  ngOnInit(){
    this.TopicsData = this.getTopicModelData();
    this.topics=this.TopicsData[0]
    this.updateData()
  }

  updateData: () => void
  = () => {
    setTimeout(() => {
      if (this.n >= this.TopicsData.length) { this.n = 0; }
      this.topics = this.TopicsData[this.n];
      console.log("updating!")
      this.updateData();
      this.n = this.n + 1;
    }, 1000);

  };
}
