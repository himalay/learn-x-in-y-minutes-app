export interface Language {
    id?: number,
    name : string,
    title : string,
    url : string
};

export interface Content {
    contributors : Array < string >,
    language : string,
    filename : string,
    category : string,
    html : string
};