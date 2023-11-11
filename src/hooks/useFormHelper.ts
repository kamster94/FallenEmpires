export default function useFormHelper() {
  function createSlug(title?: string) {
    if (!title) {
      return undefined;
    }
    return title
      .toLowerCase()
      .replace(/ /g, '-')
      .replace(/[^\w-]+/g, '');
  }

  return {
    createSlug,
  };
}
