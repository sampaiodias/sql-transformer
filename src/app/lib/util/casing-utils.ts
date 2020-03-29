export function toPascal(text: string): string {
  return text
    .replace(
      /\w\S*/g,
      m => m.charAt(0).toUpperCase() + m.substr(1).toLowerCase()
    )
    .replace(/ /g, '');
}

export function toCamel(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-zA-Z0-9]+(.)/g, (m, chr) => chr.toUpperCase());
}

export function toSnake(text: string): string {
  return (
    text &&
    text
      .match(
        /[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g
      )
      .map(x => x.toLowerCase())
      .join('_')
  );
}

export function toKebab(text: string): string {
  return (
    text &&
    text
      .match(
        /[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g
      )
      .map(x => x.toLowerCase())
      .join('-')
  );
}
