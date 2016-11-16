SELECT DISTINCT * WHERE { 
  # Search Places
  ?place wdt:P31/wdt:P279* ?subclass
  FILTER (?subclass in (wd:Q486972))
  # Q486972   = human settlements
  # Q3957     = town > human settlements
  # Q515      = city > human settlements
  # Q188509   = suburb > human settlements
  # Q123705   = neighborhood > human settlements

  # Search by Nearest
  SERVICE wikibase:around { 
    ?place wdt:P625 ?location . 
    bd:serviceParam wikibase:center "Point(-71.221112 46.814006)"^^geo:wktLiteral .
    bd:serviceParam wikibase:radius "15" . 
    bd:serviceParam wikibase:distance ?distance .
  }

  # Filter by Exact Name
  OPTIONAL {
    ?place rdfs:label ?name_en FILTER (lang(?name_en) = "en") .
    ?place rdfs:label ?name_fr FILTER (lang(?name_fr) = "fr") .
    ?place rdfs:label ?name_de FILTER (lang(?name_de) = "de") .
  }
  FILTER (regex(?name_en, "^Quebec City$") || regex(?name_fr, "^Québec$") || regex(?name_de, "^Québec$")) .

  # Get Descriptions
  SERVICE wikibase:label {
    bd:serviceParam wikibase:language "en,fr,de"
  }

} ORDER BY ASC(?dist)