export interface Chat {
  id: string;
  title: string;
  created_at: Date;
  messages: Array<{
    id: string;
    parts: any; // Adjust type as needed
    created_at: Date;
  }>;
}

export interface GetUserChatsResponse {
  created_at: Date;
  id: string;
  title: string;
  _count: number;
  messages: {
    parts: any;
  }[];
}
