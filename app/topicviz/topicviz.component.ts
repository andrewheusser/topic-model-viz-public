import { Component, OnInit } from '@angular/core';

import { TopicModelDataService } from './topic-model-data.service';

@Component({
  moduleId: module.id,
  selector: 'topicviz',
  templateUrl: 'topicviz.component.html',
  styleUrls: ['topicviz.component.css'],
  providers: [TopicModelDataService],
})

export class TopicVizComponent implements OnInit {
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

  public n: number = 0;

  updateData: () => void
  = () => {
    setTimeout(() => {
      if (this.n > 3) { this.n = 0; }
      this.topics = this.TopicsData[this.n];
      console.log("updating!")
      this.updateData();
      this.n = this.n + 1;
    }, 1000);

  };

}
