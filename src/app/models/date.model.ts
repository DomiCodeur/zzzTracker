export class DateModel {
  id: number;
  name: string;
  date: Date;
  isSelected?: boolean;

  constructor(id: number, name: string, date: Date, isSelected?: boolean) {
    this.id = id;
    this.name = name;
    this.date = date;
    this.isSelected = isSelected || false;
  }

  getDateString(): string {
    return this.date.toISOString().slice(0, 10);
  }
}
