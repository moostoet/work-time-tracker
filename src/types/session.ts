export interface Session {
    _id: string
    name: string
    hours: number
    startTime: Date
    endTime: Date
    hourlyRate?: number
  }