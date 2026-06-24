declare module 'solarlunar' {
  export function solar2lunar(year: number, month: number, day: number): any;
  export function lunar2solar(year: number, month: number, day: number, isLeapMonth?: boolean): any;
}
