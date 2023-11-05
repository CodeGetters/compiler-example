export interface tokenValItem {
    type: string;
    val: string;
    lineNum: number;
}

export interface lexicalList {
    tokens: tokenValItem[];
}

export interface categoryList {
    [item: number]: tokenValItem[];
}
