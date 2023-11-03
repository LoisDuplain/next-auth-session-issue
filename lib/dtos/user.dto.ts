import { UUID } from "crypto";
import { PermissionDTO } from "./permission.dto";
import { GroupDTO } from "./group.dto";
import { StatusDTO } from "./status.dto";
import { EntityDTO } from "./emtity.dto";

export type UserDTO = EntityDTO & {
  id: UUID;
  username: string;
  first_name: string;
  last_name: string;
  full_name: string;
  email: string;
  group_id: UUID;
  group?: GroupDTO;
  permissions?: PermissionDTO[];
  picture?: string | null | undefined;
};

export type CreateUserDTO = Pick<UserDTO, "username" | "first_name" | "last_name" | "email"> & {
  password: string;
};
export type CreateUserResponseDTO = {
  user: UserDTO;
} & StatusDTO;

export type UpdateUserDTO = Pick<UserDTO, "username" | "first_name" | "last_name" | "email">;
export type UpdateUserResponseDTO = {
  user: UserDTO;
} & StatusDTO;

export type ChangeUserPasswordDTO = {
  password: string;
};
export type ChangeUserPasswordResponseDTO = StatusDTO;

export type ChangeUserGroupDTO = {
  group_id: string;
}
export type ChangeUserGroupResponseDTO = StatusDTO;
