import type { CreateIssueDto, Issue } from '@tegonhq/types';

import axios from 'axios';

export async function createIssue({
  teamId,
  ...otherParams
}: CreateIssueDto): Promise<Issue> {
  const response = await axios.post(`/api/v1/issues`, {
    ...otherParams,
    teamId,
    sortOrder: 0,
    estimate: 0,
    subscriberIds: [],
  });

  return response.data;
}
