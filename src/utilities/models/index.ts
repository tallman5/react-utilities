interface AzMap {

}

interface Atlas {
    Map: AzMap;
}

interface DataTable {
    setCell(row: number, column: number, value: any): void;
}

interface Google {
    charts: any;
    visualization: any;
}

interface GoogleChart {
    draw(data: any, options: any): void;
}

interface Window {
    atlas: Atlas;
    google: Google;
}
