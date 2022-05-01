export const generateFile = (data: string, type = 'text/plain') => {
  return URL.createObjectURL(new Blob([data], { type }))
}