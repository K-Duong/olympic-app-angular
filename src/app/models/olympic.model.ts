export interface Participation {
  id: string,
  year: number,
  city: string,
  medalsCount: number,
  athleteCount: number
}

export interface Olympic {
  id: number,
  country: string,
  participations: Participation[]
}


export interface Indicator {
  type: string,
  label: string,
  value: number,
}

export interface Metadata {
  title: string,
  indicators: Indicator[]
}
