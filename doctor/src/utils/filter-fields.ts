type DTO = Record<string, any>;

export function filterField(dto: DTO, allowedFields: string[]): Partial<DTO> {
  const filterFields: Partial<DTO> = {};

  allowedFields.forEach((field) => {
    if (dto.hasOwnProperty(field)) {
      filterFields[field] = dto[field];
    }
  });

  return filterFields;
}
