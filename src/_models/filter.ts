export interface Filter {
  query?: string
  liked?: boolean
  status?: string[]
  includeAttempted?: boolean
  per?: number
  page?: number
}
