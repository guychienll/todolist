import { ENUM_ITEM_PROCESS_TYPE } from "../enum/ENUM_ITEM_PROCESS_TYPE";

export interface Item {
  id: string;
  title: string;
  process: ENUM_ITEM_PROCESS_TYPE;
}
