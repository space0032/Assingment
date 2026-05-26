export interface CourseRow {
  id:         string
  title:      string
  progress:   number
  icon_name:  string
  created_at: string
}

export interface NavItem {
  id:       string
  label:    string
  icon:     string
  href:     string
}

export interface ActivityPoint {
  date:  string
  count: number
}
