import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';
import { Transform } from 'class-transformer';

export class UpdateTodoTitleDto {
  @Transform(({ value }: { value?: string }) => value?.trim())
  @IsNotEmpty({ message: 'タイトルは必須です' })
  @IsString()
  @MinLength(1, { message: 'タイトルは1文字以上必要です' })
  @MaxLength(100, { message: 'タイトルは100文字以内で入力してください' })
  readonly title: string;
}
