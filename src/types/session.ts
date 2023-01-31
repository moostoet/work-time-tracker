// export type Session = {
//   _id: string
//   name: string
//   hourlyRate: number
// } | {
//   _id: string
//   name: string
//   hourlyRate: number
//   startTime: Date
// } | {
//   _id: string
//   name: string
//   hourlyRate: number
//   startTime: Date
//   endTime: Date
//   hours: number
// }

export interface Session {
  _id: string;
  name: string;
  hourlyRate: number;
  startTime?: string;
  endTime?: string;
  hours?: number;
}