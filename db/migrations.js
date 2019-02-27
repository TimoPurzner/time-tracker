export default {
    queries: [
        {version:1, query:"create table if not exists categories (id integer primary key not null, title text UNIQUE NOT NULL, time number DEFAULT 0);"},
        {version:2, query:"create table if not exists categories (id integer primary key not null, title text UNIQUE NOT NULL, time number DEFAULT 0);"},
    ]
}
