import { ApiProperty } from "@nestjs/swagger";
export class Todo {
    @ApiProperty({ default: 'f3e97b6b-45d1-4a6e-8a22-811212db31b0' })
    id: string;

    @ApiProperty()
    name: string;

    @ApiProperty({ default: false })
    completed: boolean;

    @ApiProperty({ default: false })
    isActive: boolean;
}