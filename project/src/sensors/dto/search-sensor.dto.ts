import {
  IsNumber,
  IsEnum,
  IsObject,
  IsString,
  ValidateNested,
} from 'class-validator';
import { DtoOptionalProperty } from 'src/shared/dto-property';

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
  @IsNumber()
  gte?: number;

  @IsNumber()
  lte?: number;

  @IsNumber()
  eq?: number;
}

class Filters {
  @IsObject()
  temperature?: FilterValue;
}

class Sort {
  @IsString()
  column: string;

  @IsEnum(SortOrderEnum)
  order: SortOrderEnum;
}

class Aggregate {
  @IsString()
  column: string;

  @IsEnum(AggregationOperatorEnum)
  operator: AggregationOperatorEnum;
}

export class SensorSearchDTO {
  @DtoOptionalProperty({ type: Filters })
  @ValidateNested()
  @IsObject()
  filters: Filters;

  @DtoOptionalProperty({ type: Sort })
  @ValidateNested()
  @IsObject()
  sort: Sort;

  @DtoOptionalProperty({ type: Aggregate })
  @ValidateNested()
  @IsObject()
  aggregate: Aggregate;
}
