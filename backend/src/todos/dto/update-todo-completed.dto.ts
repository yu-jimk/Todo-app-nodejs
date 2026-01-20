import { IsBoolean } from 'class-validator';

export class UpdateTodoCompletedDto {
  @IsBoolean()
  readonly completed: boolean;
}
