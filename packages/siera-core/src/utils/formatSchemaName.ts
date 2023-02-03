export const formatSchemaName = (schemaId?: string) =>
  schemaId
    ? schemaId
        .split(':')[2]
        .replace(/([a-z])([A-Z])/g, '$1 $2')
        .split(/-|_| /g)
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ')
    : 'Unknown credential'
