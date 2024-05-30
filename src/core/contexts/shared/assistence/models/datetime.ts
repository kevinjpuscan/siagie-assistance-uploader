export class DateTime {
  private readonly date: Date;
  constructor(
    private readonly dateDB: string,
    private readonly hourZone: number = -5
  ) {
    if (!this.isValid(dateDB)) {
      throw new Error("Invalid date format");
    }
    this.date = new Date(dateDB);
  }

  isValid(dateDb) {
    const regex = new RegExp(
      "^\\d{4}-\\d{2}-\\d{2}T\\d{2}:\\d{2}:\\d{2}.\\d{3}Z$"
    );
    return regex.test(dateDb);
  }
  getHour() {
    return this.date.getHours();
  }
  getMinute() {
    return this.date.getMinutes();
  }
  getSecond() {
    return this.date.getSeconds();
  }
  getDay() {
    return this.date.getDate();
  }
  getMonth() {
    return this.date.getMonth();
  }
  getYear() {
    return this.date.getFullYear();
  }
}
