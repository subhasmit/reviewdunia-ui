export interface MatchResult {
  id: string
  title: string
  thumbnail: string
  scorePercentage: number
}

export interface UploadScreenshotResponse {
  request_id: string
  matches: MatchResult[]
}
