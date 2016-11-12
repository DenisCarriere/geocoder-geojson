type Formats = "json" | "xml"

interface SearchEntities {
  search: string
  format?: Formats
  language?: string
  limit?: number
}

interface GetEntities {
  ids: string | Array<string>,
  languages?: string | Array<string>,
  properties?: Array<string>,
  format?: Formats
}

declare module "wikidata-sdk" {
  export function searchEntities(
    search: string | SearchEntities,
    language?: string,
    limit?: number,
    format?: Formats,
    uselang?: string): any;

  export function getEntities(
    ids: string | Array<string>,
    languages?: string | Array<string>,
    properties?: Array<string>,
    format?: Formats): any;
}