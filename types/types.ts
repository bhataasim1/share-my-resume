import { LucideIcon } from "lucide-react";
import { Dispatch, SetStateAction } from "react";

export interface NavItem {
  title?: string;
  href: string;
  disabled?: boolean;
  external?: boolean;
  icon?: LucideIcon;
  label: string;
  description?: string;
  children?: NavItem[];
}

export interface SidebarItem extends NavItem {
  onClick?: () => void;
}

export interface NavItemProps {
  item: NavItem;
  index: number;
  setSidebarOpen?: Dispatch<SetStateAction<boolean>>;
  path: string;
  initialOpen?: boolean;
}

export type ModelFormInputType =
  | "text"
  | "textarea"
  | "email"
  | "password"
  | "number";

export type UserRegisterType = {
  name: string;
  email: string;
  password: string;
  username: string;
};

export type userUpdateProfileType = {
  bio: string;
  skills: string[];
};

export type userImageUploadType = {
  avatar: string;
};

export type UserResposneType = {
  id: string;
  name: string;
  username: string;
  email: string;
  UserDetail: {
    avatar: string | null;
    bio: string | null;
    skills: string[];
  };
};

export type SkillType = {
  label: string;
  value: string;
}[];
