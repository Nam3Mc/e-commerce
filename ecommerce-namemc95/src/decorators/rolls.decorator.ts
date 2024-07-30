import { SetMetadata } from "@nestjs/common";
import { Roll } from "src/enums/rolls.enum";

export const Rolls = (...rolls: Roll[]) => SetMetadata("rolls", rolls);