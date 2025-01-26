export const allowedFields: { [key: string]: string[] } = {
  doctor: [
    'bio',
    'email',
    'name',
    'phone',
    'profile_picture',
    'qualification',
    'years_of_experience',
    'speciality_id',
    'is_active',
  ],
};

/**
 * Retrieve the allowed fields for the specific entity
 * @param entity - The entity name
 * @returns An array of allowed fields or an empty array if the entity is not defined.
 */
export function getAllowedFields(entity: string): string[] {
  return allowedFields[entity] || [];
}

/**
 * Checks if an object contains valid fields for updating a specific entity.
 * @param entity - The entity name.
 * @param updateFields - The incoming update object.
 * @returns A boolean indicating if the object contains valid fields.
 */
export function hasAllowedFieldsForEntity(
  entity: string,
  updateFields: Record<string, any>
): boolean {
  const allowedFields = getAllowedFields(entity);

  return Object.keys(updateFields).some((fields) =>
    allowedFields.includes(fields)
  );
}
