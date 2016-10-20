import { Injectable } from '@angular/core';

import { TopicsData } from './topic-model-data';

@Injectable()
export class TopicModelDataService {
  getTopicModelData() {
    return TopicsData;
  }
}
