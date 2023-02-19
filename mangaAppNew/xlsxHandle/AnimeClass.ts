export default class AnimeClass{
    name: string;
    chapter: string;
    score: number;
    date0: Date;
    weblist: string;
    date1: Date;
    chapter1: string;
    date2: Date;
    chapter2: string;
    date3: Date;
    chapter3: string;
    date4: Date;
    chapter4: string;

    constructor(row:any){
        this.name = row.name;
        this.chapter = row.chapter;
        this.score = row.score;
        this.date0 = row.date0;
        this.weblist = row.weblist;
        this.date1 = row.date1;
        this.chapter1 = row.chapter1;
        this.date2 = row.date2;
        this.chapter2 = row.chapter2;
        this.date3 = row.date3;
        this.chapter3 = row.chapter3;
        this.date4 = row.date4;
        this.chapter4 = row.chapter4;
    }

}