import { ApiProperty } from "@nestjs/swagger";
import { MaxLength, IsNotEmpty, IsString } from "class-validator";

export class CreateTodoDto {
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    @MaxLength(100)
    name: string;

    @ApiProperty({ required: false, default: false })
    completed?: boolean;

    @ApiProperty({ required: false, default: false })
    isActive?: boolean;

}