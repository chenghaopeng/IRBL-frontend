export type User = {
  username: string;
  role: 'Admin' | 'Developer';
  queryNum: number;
  token: string;
}

export type Reposity = {
  description: string;
  gitUrl: string;
  id: number;
  queryNum: number;
  startTime: string;
  endTime: string;
  state: 'Dev' | 'Abandon';
}

export type Record = {
  id: number;
  repoCommitId: string;
  userId: number;
  gitUrl: string;
  fileScoreList: Array<{
    score: number;
    filepath: string;
  }>;
  queryTime: string;
  state: 'initializing' | 'querying' | 'complete';
}

export type RecordListItem = {
  recordId: number;
  queryTime: string;
}
