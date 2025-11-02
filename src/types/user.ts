export type TUserListResponse = {
  id: number;
  username: string;
  nickname: string;
  bod: string;
  email: string;
  address: string;
  role: {
    id: number;
    name: string;
    description: string;
  };
  createdAt: Date;
};
