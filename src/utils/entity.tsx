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
  id: string;
  repoCommitId: string;
  userId: number;
  gitUrl: string;
  fileScoreList: Array<{
    score: number;
    filePath: string;
  }>;
  queryTime: string;
  state: 'initializing' | 'querying' | 'complete';
}

export type RecordListItem = {
  recordId: string;
  queryTime: string;
}
