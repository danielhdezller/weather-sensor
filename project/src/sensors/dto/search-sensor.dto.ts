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
  @DtoOptionalProperty()
  @ValidInstanceOf(FilterValue)
  temperature?: FilterValue;
}

class Sort {
  @DtoOptionalProperty()
  @IsString()
  column?: string;

  @DtoOptionalProperty()
  @IsEnum(SortOrderEnum)
  order?: SortOrderEnum;
}

class Aggregate {
  @DtoOptionalProperty()
  @IsString()
  column?: string;

  @DtoOptionalProperty()
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
