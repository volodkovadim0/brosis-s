export class UserDTO {
  id: number;
  vk_id: number;
  email: string;
  name: string;
  grant: IGrant;
  avatar_url: string;
  token: string;
}

export enum IGrant {
  ADMIN = 0,
  USER = 1,
}
