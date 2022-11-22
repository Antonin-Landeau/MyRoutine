export interface IUser {
  user_id?: number;
  user_email?: string;
  user_password?: string;
  user_firstname?: string;
  user_lastname?: string;
  user_pseudo?: string;
  user_birthDate?: Date;
  user_color?: string;
  user_avatar?: string;
}

export interface IDecodedToken {
  id: number;
  iat: number;
  exp: number;
}

export interface IChallenge {
  id: number;
  title: string;
  description: string;
  thumbnail: string;
  mission?: [];
}

export interface IMission {
  id: number;
  m_order: string;
  points: number;
  isStackable: boolean;
  challenge_id: number;
  iteration: number;
  score?: number;
}

export interface IModal {
  isOpen: boolean;
  title: string;
  description: string;
  action: {
    btnTitle: string;
    action: () => void;
  };
}
