export interface CreateIndexDto {
  indexTypeId: number;
  indexName: string;
  metric: string;
  dimension: number;
}
