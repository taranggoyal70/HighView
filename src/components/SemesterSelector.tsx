import { Calendar } from 'lucide-react'
import { useSemester } from '@/contexts/SemesterContext'
import { Button } from '@/components/ui/button'

export function SemesterSelector() {
  const { selectedSemester, setSelectedSemester, semesters } = useSemester()

  return (
    <div className="flex items-center gap-2">
      <Calendar className="h-4 w-4 text-muted-foreground" />
      <div className="flex gap-1">
        {semesters.map((semester) => (
          <Button
            key={semester.id}
            variant={selectedSemester.id === semester.id ? 'default' : 'outline'}
            size="sm"
            onClick={() => setSelectedSemester(semester)}
            className="text-xs"
          >
            {semester.name}
          </Button>
        ))}
      </div>
    </div>
  )
}
