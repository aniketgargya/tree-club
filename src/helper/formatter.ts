const removeErrorLabel = (message: string): string => message.replace('GraphQL error: ', '');

export { removeErrorLabel };