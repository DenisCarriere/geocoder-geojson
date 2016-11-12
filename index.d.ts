interface SearchEntities {
  search: string
  format?: string
  language?: string
  limit?: number
}

interface GetEntities {
  ids: string | Array<string>,
  languages?: string | Array<string>,
  properties?: Array<string>,
  format?: string
}

declare module "wikidata-sdk" {
  export function searchEntities(
    search: string | SearchEntities,
    language?: string,
    limit?: number,
    format?: string,
    uselang?: string): any;

  export function getEntities(
    ids: string | Array<string>,
    languages?: string | Array<string>,
    properties?: Array<string>,
    format?: string): any;
}