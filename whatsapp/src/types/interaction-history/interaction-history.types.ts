export type InteractionHistoryType = {
  userQuery: string;
  botResponse: string;
  retrieval: string[];
  tool_calls?: any;
};
