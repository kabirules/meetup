export class Meta {
    next: string; // "",
    method: string; //"Cities",
    total_count: number; // 12,
    link: string; // "https://api.meetup.com/2/cities",
    count: number; // 12,
    description: string; // "Returns Meetup cities. This method supports search by latitude/longitude/radius, by country/state, by query term/zip, or a combination of all of these. Location-only searches by lat and lon return all cities within a radius of the provided coordinates. Searches with a query return up to 10 cities matching the term, and can be sorted by size or distance to a given coordinate. 'smart' ordering can be used to return the match(es) with the highest member_count, unless a smaller size match exists nearby the given coordinates. Query searches are supported for country but not country and state",
    lon: number; // "None", number??
    title: string; //"Cities",
    url: string; //"https://api.meetup.com/2/cities?offset=0&sign=True&format=json&photo-host=public&page=20&radius=50&order=size&desc=false",
    signed_url: string; //"https://api.meetup.com/2/cities?offset=0&format=json&photo-host=public&page=20&radius=50&order=size&desc=false&sig_id=&sig=",
    id: string; //"",
    updated: number; // 1441147409000,
    lat: number; // "None"
}