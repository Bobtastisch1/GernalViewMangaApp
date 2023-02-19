
export default class NumbersClass{
    name: string;
    link: string;
    tag: string;
    read: string;
    date: Date;
    score: number;
    art: number;
    reread: string;
    date2: Date;
    reread3: string;
    date3: Date;
    constructor(row:any){
        this.name = row.Name;
        this.link = row.Link;
        this.tag = row.Tag;
        this.read = row.Read;
        this.date = row.Date;
        this.score = row.Score;
        this.art = row.Art;
        this.reread = row.Reread;
        this.date2 = row.Date2;
        this.reread3 = row.Reread3;
        this.date3 = row.Date3;   
    }
}