import { UUID } from "crypto"

export type EntityDTO = {
  id: UUID;
  created_at: Date;
  created_by: UUID;
  updated_at: Date;
  updated_by: UUID;
  deleted_at?: Date;
  deleted_by?: UUID;
}