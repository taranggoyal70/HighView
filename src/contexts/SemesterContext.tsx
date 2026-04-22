import { createContext, useContext, useState, ReactNode } from 'react'

export interface Semester {
  id: string
  name: string
  year: number
  season: 'Fall' | 'Spring' | 'Summer' | 'Winter'
  startDate: string
  endDate: string
  isActive: boolean
}

export const semesters: Semester[] = [
  {
    id: 'fall-2024',
    name: 'Fall 2024',
    year: 2024,
    season: 'Fall',
    startDate: '2024-08-26',
    endDate: '2024-12-20',
    isActive: false
  },
  {
    id: 'spring-2025',
    name: 'Spring 2025',
    year: 2025,
    season: 'Spring',
    startDate: '2025-01-13',
    endDate: '2025-05-16',
    isActive: false
  },
  {
    id: 'summer-2025',
    name: 'Summer 2025',
    year: 2025,
    season: 'Summer',
    startDate: '2025-05-27',
    endDate: '2025-08-15',
    isActive: false
  },
  {
    id: 'fall-2025',
    name: 'Fall 2025',
    year: 2025,
    season: 'Fall',
    startDate: '2025-08-25',
    endDate: '2025-12-19',
    isActive: false
  },
  {
    id: 'spring-2026',
    name: 'Spring 2026',
    year: 2026,
    season: 'Spring',
    startDate: '2026-01-12',
    endDate: '2026-05-15',
    isActive: true
  },
  {
    id: 'summer-2026',
    name: 'Summer 2026',
    year: 2026,
    season: 'Summer',
    startDate: '2026-05-26',
    endDate: '2026-08-14',
    isActive: false
  }
]

interface SemesterContextType {
  selectedSemester: Semester
  setSelectedSemester: (semester: Semester) => void
  semesters: Semester[]
}

const SemesterContext = createContext<SemesterContextType | undefined>(undefined)

export function SemesterProvider({ children }: { children: ReactNode }) {
  const activeSemester = semesters.find(s => s.isActive) || semesters[semesters.length - 1]
  const [selectedSemester, setSelectedSemester] = useState<Semester>(activeSemester)

  return (
    <SemesterContext.Provider value={{ selectedSemester, setSelectedSemester, semesters }}>
      {children}
    </SemesterContext.Provider>
  )
}

export function useSemester() {
  const context = useContext(SemesterContext)
  if (context === undefined) {
    throw new Error('useSemester must be used within a SemesterProvider')
  }
  return context
}
