import { IsNumber, IsEnum, IsString } from 'class-validator';
import { DtoOptionalProperty } from 'src/shared/dto-property';
import { ValidInstanceOf } from 'src/shared/validators/valid-instance-of.validator';

enum AggregationOperatorEnum {
  COUNT = 'COUNT',
  MAX = 'MAX',
  MIN = 'MIN',
  SUM = 'SUM',
  AVG = 'AVG',
}

enum SortOrderEnum {
  ASCENDING = 'ascending',
  DESCENDING = 'descending',
}

class FilterValue {
  @DtoOptionalProperty()
  @IsNumber()
  gte?: number;

  @DtoOptionalProperty()
  @IsNumber()
  lte?: number;

  @DtoOptionalProperty()
  @IsNumber()
  eq?: number;
}

class Filters {
  @DtoOptionalProperty({ type: FilterValue })
  temperature?: FilterValue;

  @DtoOptionalProperty({ type: FilterValue })
  humidity?: FilterValue;

  @DtoOptionalProperty({ type: FilterValue })
  rainfall?: FilterValue;

  @DtoOptionalProperty({ type: FilterValue })
  timestamp?: FilterValue;

  @DtoOptionalProperty({ type: FilterValue })
  windspeed?: FilterValue;

  @DtoOptionalProperty({ type: FilterValue })
  visibility?: FilterValue;
}

class Sort {
  @DtoOptionalProperty({ example: 'temperature' })
  @IsString()
  column?: string;

  @DtoOptionalProperty({
    example: SortOrderEnum.ASCENDING,
    type: 'enum',
    enum: SortOrderEnum,
  })
  @IsEnum(SortOrderEnum)
  order?: SortOrderEnum;
}

class Aggregate {
  @DtoOptionalProperty({ example: 'temperature' })
  @IsString()
  column?: string;

  @DtoOptionalProperty({
    type: 'enum',
    enum: AggregationOperatorEnum,
    example: AggregationOperatorEnum.MAX,
  })
  @IsEnum(AggregationOperatorEnum)
  operator?: AggregationOperatorEnum;
}

export class SensorSearchDTO {
  @DtoOptionalProperty({ type: Filters })
  @ValidInstanceOf(Filters)
  filters?: Filters;

  @DtoOptionalProperty({ type: Sort })
  @ValidInstanceOf(Sort)
  sort?: Sort;

  @DtoOptionalProperty({ type: Aggregate })
  @ValidInstanceOf(Aggregate)
  aggregate?: Aggregate;
}
