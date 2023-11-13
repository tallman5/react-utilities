export interface AzMap {
}

export interface Atlas {
    Map: AzMap;
}

export interface DataTable {
    setCell(row: number, column: number, value: any): void;
}

export interface Google {
    charts: any;
    visualization: any;
}

export interface GoogleChart {
    draw(data: any, options: any): void;
}

export interface Window {
    atlas: Atlas;
    google: Google;
}
