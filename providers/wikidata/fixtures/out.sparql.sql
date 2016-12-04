SELECT DISTINCT ?place ?location ?distance ?placeDescription ?name_en ?name_fr ?name_es ?name_de ?name_it ?name_ru WHERE {
  # Search Instance of & Subclasses
  ?place wdt:P31/wdt:P279* ?subclass
  FILTER (?subclass in (wd:Q486972))

  # Search by Nearest
  SERVICE wikibase:around {
    ?place wdt:P625 ?location .
    bd:serviceParam wikibase:center "Point(-75 45)"^^geo:wktLiteral .
    bd:serviceParam wikibase:radius "100" .
    bd:serviceParam wikibase:distance ?distance .
  }

  # Filter by Exact Name
  OPTIONAL {?place rdfs:label ?name_en FILTER (lang(?name_en) = "en") . }
  OPTIONAL {?place rdfs:label ?name_fr FILTER (lang(?name_fr) = "fr") . }
  OPTIONAL {?place rdfs:label ?name_es FILTER (lang(?name_es) = "es") . }
  OPTIONAL {?place rdfs:label ?name_de FILTER (lang(?name_de) = "de") . }
  OPTIONAL {?place rdfs:label ?name_it FILTER (lang(?name_it) = "it") . }
  OPTIONAL {?place rdfs:label ?name_ru FILTER (lang(?name_ru) = "ru") . }

  FILTER (regex(?name_en, "^Ottawa$") || regex(?name_fr, "^Ottawa$") || regex(?name_es, "^Ottawa$") || regex(?name_de, "^Ottawa$") || regex(?name_it, "^Ottawa$") || regex(?name_ru, "^Ottawa$")) .

  # Get Descriptions
  SERVICE wikibase:label {
    bd:serviceParam wikibase:language "en,fr,es,de,it,ru"
  }

} ORDER BY ASC(?distance)
