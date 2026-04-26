import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Download, Search, ChevronDown, X } from 'lucide-react'
import { Button } from '../components/ui/button'

// ── Mock data matching wireframe ──────────────────────────────────────────────

const SEMESTERS = ['Spring 2025', 'Fall 2024', 'Summer 2024', 'Spring 2024']

const PILLARS = {
  ai: { score: 64, completed: 41, inProgress: 30, notStarted: 23 },
  experiential: { score: 51, completed: 30, inProgress: 36, notStarted: 28 },
  session: { score: 72, completed: 52, inProgress: 26, notStarted: 16 },
}

const ALERTS = [
  { id: 1, color: 'bg-red-500', text: "4 students haven't logged in for 30+ days", sub: 'Re-engagement outreach recommended' },
  { id: 2, color: 'bg-amber-600', text: '7 students at networking stage with no events booked', sub: 'Curated Connections — Apr 4 has open spots' },
  { id: 3, color: 'bg-indigo-600', text: "Crocs micro-internship closes Apr 15 — 3 eligible students haven't applied", sub: 'Prompt to apply' },
]

interface Student {
  id: string
  name: string
  initials: string
  school: string
  year: string
  ai: number
  experiential: number
  sessionAttendance: number
  status: 'On track' | 'At risk'
  lastActive: string
  email: string
  phone: string
  major: string
  note: string
  eventsAttended: number
  applications: number
  mentorSessions: number
  jobShadows: number
  opportunities: { title: string; subtitle: string }[]
  staffNotes: { text: string; date: string; author: string }[]
}

const STUDENTS: Student[] = [
  {
    id: '1', name: 'Jamie Reyes', initials: 'JR', school: 'CU Denver', year: 'Junior',
    ai: 75, experiential: 60, sessionAttendance: 85, status: 'On track', lastActive: 'Today',
    email: 'j.reyes@ucdenver.edu', phone: '(720) 555-0143', major: 'Business Administration', note: 'Scholarship recipient',
    eventsAttended: 7, applications: 3, mentorSessions: 4, jobShadows: 1,
    opportunities: [
      { title: 'Brand Strategy Micro-Internship', subtitle: 'Crocs Inc. · Applied Mar 28' },
      { title: 'Curated Connections — Spring', subtitle: 'Registered · Apr 4' },
    ],
    staffNotes: [
      { text: 'Strong communicator — ready for client-facing micro-internship', date: 'Mar 12', author: 'A. Reeves' },
      { text: 'Connected with mentor Danielle K. — check in after Apr session', date: 'Feb 28', author: 'A. Reeves' },
    ],
  },
  {
    id: '2', name: 'Marcus Lee', initials: 'ML', school: 'MSU Denver', year: 'Sophomore',
    ai: 35, experiential: 25, sessionAttendance: 20, status: 'At risk', lastActive: '18 days ago',
    email: 'm.lee@msudenver.edu', phone: '(720) 555-0192', major: 'Finance', note: '',
    eventsAttended: 2, applications: 1, mentorSessions: 1, jobShadows: 0,
    opportunities: [],
    staffNotes: [{ text: "Needs outreach — hasn't engaged in 3 weeks", date: 'Apr 3', author: 'A. Reeves' }],
  },
  {
    id: '3', name: 'Sofia Alvarez', initials: 'SA', school: 'Regis University', year: 'Senior',
    ai: 70, experiential: 68, sessionAttendance: 75, status: 'On track', lastActive: '2 days ago',
    email: 's.alvarez@regis.edu', phone: '(303) 555-0174', major: 'Marketing', note: '',
    eventsAttended: 5, applications: 4, mentorSessions: 3, jobShadows: 2,
    opportunities: [{ title: 'Marketing Internship — Denver Post', subtitle: 'Applied · Apr 10' }],
    staffNotes: [{ text: 'Strong candidate for summer internship program', date: 'Mar 25', author: 'A. Reeves' }],
  },
  {
    id: '4', name: 'Darius Kim', initials: 'DK', school: 'CU Denver', year: 'Freshman',
    ai: 10, experiential: 8, sessionAttendance: 12, status: 'At risk', lastActive: '34 days ago',
    email: 'd.kim@ucdenver.edu', phone: '(720) 555-0155', major: 'Computer Science', note: '',
    eventsAttended: 0, applications: 0, mentorSessions: 0, jobShadows: 0,
    opportunities: [],
    staffNotes: [{ text: 'No activity since first week — urgent follow-up needed', date: 'Mar 10', author: 'A. Reeves' }],
  },
]

// ── Sub-components ────────────────────────────────────────────────────────────

function SegmentedBar({ score, filled, empty }: { score: number; filled: string; empty: string }) {
  const segments = 5
  const filledCount = Math.round((score / 100) * segments)
  return (
    <div className="flex gap-1 my-3">
      {Array.from({ length: segments }).map((_, i) => (
        <div key={i} className={`h-2 flex-1 rounded-sm ${i < filledCount ? filled : empty}`} />
      ))}
    </div>
  )
}

function MiniBar({ value, color }: { value: number; color: string }) {
  return (
    <div className="flex-1 bg-gray-200 rounded-full h-1.5">
      <div className={`h-1.5 rounded-full ${color}`} style={{ width: `${value}%` }} />
    </div>
  )
}

function PillarProgressBar({ label, value, color }: { label: string; value: number; color: string }) {
  return (
    <div className="flex items-center gap-3">
      <span className="text-sm text-gray-600 w-36">{label}</span>
      <div className="flex-1 bg-gray-200 rounded-full h-2">
        <div className={`h-2 rounded-full ${color}`} style={{ width: `${value}%` }} />
      </div>
      <span className="text-sm font-semibold w-10 text-right">{value}%</span>
    </div>
  )
}

function InlineProfile({ student, onClose }: { student: Student; onClose: () => void }) {
  return (
    <tr>
      <td colSpan={7} className="p-0 border-b">
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.3 }}
          className="overflow-hidden"
        >
          <div className="border rounded-xl m-4 overflow-hidden shadow-sm">
            {/* Profile Header */}
            <div className="flex flex-col md:flex-row items-start gap-4 p-5 border-b">
              <div className="w-12 h-12 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-700 font-bold text-lg flex-shrink-0">
                {student.initials}
              </div>
              <div className="flex-1 min-w-0">
                <div className="font-bold text-lg">{student.name}</div>
                <div className="text-sm text-gray-500">
                  {student.year} · {student.major} · {student.school}
                  {student.note && ` · ${student.note}`}
                </div>
                <div className="text-sm text-indigo-600 mt-0.5">
                  {student.email} · {student.phone}
                </div>
              </div>
              <div className="flex items-center gap-2 flex-shrink-0">
                <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                  student.status === 'On track' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-600'
                }`}>{student.status}</span>
                <button onClick={onClose} className="text-sm border rounded-lg px-3 py-1.5 hover:bg-gray-50 transition-colors">
                  Close
                </button>
              </div>
            </div>

            {/* Profile Body */}
            <div className="grid md:grid-cols-2 divide-y md:divide-y-0 md:divide-x">
              {/* Left Column */}
              <div className="p-5 space-y-6">
                <div>
                  <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">Progress Across Pillars</p>
                  <div className="space-y-2.5">
                    <PillarProgressBar label="AI" value={student.ai} color="bg-indigo-600" />
                    <PillarProgressBar label="Experiential learning" value={student.experiential} color="bg-green-600" />
                    <PillarProgressBar label="Session attendance" value={student.sessionAttendance} color="bg-amber-600" />
                  </div>
                </div>

                <div>
                  <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">Quick Stats</p>
                  <div className="grid grid-cols-2 gap-3">
                    {[
                      { label: 'Events attended', value: student.eventsAttended },
                      { label: 'Applications', value: student.applications },
                      { label: 'Mentor sessions', value: student.mentorSessions },
                      { label: 'Job shadows', value: student.jobShadows },
                    ].map(stat => (
                      <div key={stat.label} className="bg-gray-50 rounded-lg p-3">
                        <div className="text-xs text-gray-500 mb-1">{stat.label}</div>
                        <div className="text-2xl font-bold">{stat.value}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right Column */}
              <div className="p-5 space-y-6">
                <div>
                  <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">Active Opportunities</p>
                  {student.opportunities.length === 0 ? (
                    <p className="text-sm text-gray-400">No active opportunities</p>
                  ) : (
                    <div className="space-y-3">
                      {student.opportunities.map((opp, i) => (
                        <div key={i}>
                          <div className="font-semibold text-sm">{opp.title}</div>
                          <div className="text-xs text-gray-500">{opp.subtitle}</div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <div>
                  <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">Staff Notes</p>
                  <div className="space-y-3">
                    {student.staffNotes.map((note, i) => (
                      <div key={i}>
                        <div className="text-sm">{note.text}</div>
                        <div className="text-xs text-gray-400 mt-0.5">{note.date} · {note.author}</div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex gap-2 flex-wrap pt-2">
                  <Button size="sm" className="bg-indigo-600 hover:bg-indigo-700 text-white">Draft check-in</Button>
                  <Button size="sm" variant="outline">Log note</Button>
                  <Button size="sm" variant="outline">Flag for follow-up</Button>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </td>
    </tr>
  )
}

// ── Main Page ─────────────────────────────────────────────────────────────────

export default function CohortPage() {
  const [semester, setSemester] = useState('Spring 2025')
  const [search, setSearch] = useState('')
  const [yearFilter, setYearFilter] = useState('All years')
  const [statusFilter, setStatusFilter] = useState('All status')
  const [selectedId, setSelectedId] = useState<string | null>(null)

  const filtered = STUDENTS.filter(s => {
    const matchSearch = s.name.toLowerCase().includes(search.toLowerCase())
    const matchYear = yearFilter === 'All years' || s.year === yearFilter
    const matchStatus = statusFilter === 'All status' || s.status === statusFilter
    return matchSearch && matchYear && matchStatus
  })

  const toggleStudent = (id: string) => setSelectedId(prev => prev === id ? null : id)

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="container mx-auto max-w-5xl">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>

          {/* ── Header ── */}
          <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-8">
            <div>
              <h1 className="text-2xl font-bold">Cohort overview</h1>
              <p className="text-sm text-gray-500 mt-1">
                {semester} · 94 active students · Greater Denver
              </p>
            </div>
            <div className="flex items-center gap-3">
              <div className="relative">
                <select
                  value={semester}
                  onChange={e => setSemester(e.target.value)}
                  className="appearance-none border rounded-lg pl-4 pr-8 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary bg-white"
                >
                  {SEMESTERS.map(s => <option key={s} value={s}>{s}</option>)}
                </select>
                <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
              </div>
              <Button className="bg-indigo-600 hover:bg-indigo-700 text-white gap-2">
                <Download className="h-4 w-4" />
                Export report
              </Button>
            </div>
          </div>

          {/* ── 3 Stat Boxes ── */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <div className="bg-gray-50 rounded-xl p-5">
              <div className="text-sm text-gray-500 mb-2">Total students</div>
              <div className="text-4xl font-bold">94</div>
              <div className="text-sm text-green-600 mt-2">+12 vs last term</div>
            </div>
            <div className="bg-gray-50 rounded-xl p-5">
              <div className="text-sm text-gray-500 mb-2">Engagement rate</div>
              <div className="text-4xl font-bold">78%</div>
              <div className="text-sm text-green-600 mt-2">+5 pts vs last term</div>
            </div>
            <div className="bg-gray-50 rounded-xl p-5">
              <div className="text-sm text-gray-500 mb-2">At-risk students</div>
              <div className="text-4xl font-bold">11</div>
              <div className="text-sm text-amber-600 mt-2">Needs follow-up</div>
            </div>
          </div>

          {/* ── Cohort Pillar Progress ── */}
          <div className="mb-8">
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-4">Cohort Pillar Progress</p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

              {/* AI */}
              <div className="bg-indigo-50 rounded-xl p-5">
                <div className="text-sm font-semibold text-indigo-700 mb-1">AI</div>
                <div className="text-4xl font-bold text-indigo-900">{PILLARS.ai.score}%</div>
                <div className="text-xs text-indigo-500 mb-1">cohort avg</div>
                <SegmentedBar score={PILLARS.ai.score} filled="bg-indigo-700" empty="bg-indigo-200" />
                <div className="space-y-1.5 mt-3 text-sm">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-indigo-700 flex-shrink-0" />
                    <span className="text-gray-600">Completed</span>
                    <span className="ml-auto font-bold">{PILLARS.ai.completed} <span className="font-normal text-gray-500">students</span></span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-indigo-300 flex-shrink-0" />
                    <span className="text-gray-600">In progress</span>
                    <span className="ml-auto font-bold">{PILLARS.ai.inProgress} <span className="font-normal text-gray-500">students</span></span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-indigo-100 border border-indigo-300 flex-shrink-0" />
                    <span className="text-gray-600">Not started</span>
                    <span className="ml-auto font-bold">{PILLARS.ai.notStarted} <span className="font-normal text-gray-500">students</span></span>
                  </div>
                </div>
              </div>

              {/* Experiential Learning */}
              <div className="bg-green-50 rounded-xl p-5">
                <div className="text-sm font-semibold text-green-700 mb-1">Experiential learning</div>
                <div className="text-4xl font-bold text-green-900">{PILLARS.experiential.score}%</div>
                <div className="text-xs text-green-500 mb-1">cohort avg</div>
                <SegmentedBar score={PILLARS.experiential.score} filled="bg-green-700" empty="bg-green-200" />
                <div className="space-y-1.5 mt-3 text-sm">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-green-700 flex-shrink-0" />
                    <span className="text-gray-600">Completed</span>
                    <span className="ml-auto font-bold">{PILLARS.experiential.completed} <span className="font-normal text-gray-500">students</span></span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-green-300 flex-shrink-0" />
                    <span className="text-gray-600">In progress</span>
                    <span className="ml-auto font-bold">{PILLARS.experiential.inProgress} <span className="font-normal text-gray-500">students</span></span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-green-100 border border-green-300 flex-shrink-0" />
                    <span className="text-gray-600">Not started</span>
                    <span className="ml-auto font-bold">{PILLARS.experiential.notStarted} <span className="font-normal text-gray-500">students</span></span>
                  </div>
                </div>
              </div>

              {/* Session Attendance */}
              <div className="bg-amber-50 rounded-xl p-5">
                <div className="text-sm font-semibold text-amber-700 mb-1">Session attendance</div>
                <div className="text-4xl font-bold text-amber-900">{PILLARS.session.score}%</div>
                <div className="text-xs text-amber-500 mb-1">cohort avg</div>
                <SegmentedBar score={PILLARS.session.score} filled="bg-amber-700" empty="bg-amber-200" />
                <div className="space-y-1.5 mt-3 text-sm">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-amber-700 flex-shrink-0" />
                    <span className="text-gray-600">Completed</span>
                    <span className="ml-auto font-bold">{PILLARS.session.completed} <span className="font-normal text-gray-500">students</span></span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-amber-300 flex-shrink-0" />
                    <span className="text-gray-600">In progress</span>
                    <span className="ml-auto font-bold">{PILLARS.session.inProgress} <span className="font-normal text-gray-500">students</span></span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-amber-100 border border-amber-300 flex-shrink-0" />
                    <span className="text-gray-600">Not started</span>
                    <span className="ml-auto font-bold">{PILLARS.session.notStarted} <span className="font-normal text-gray-500">students</span></span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ── Alerts & Follow-ups ── */}
          <div className="border rounded-xl p-6 mb-8">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold">Alerts & follow-ups</h2>
              <span className="text-sm text-gray-400">{ALERTS.length * 3 + 2} flagged</span>
            </div>
            <div className="divide-y">
              {ALERTS.map(alert => (
                <div key={alert.id} className="py-3 flex items-start gap-3">
                  <span className={`w-2.5 h-2.5 rounded-full flex-shrink-0 mt-1.5 ${alert.color}`} />
                  <div>
                    <div className="text-sm font-medium">{alert.text}</div>
                    <div className="text-xs text-gray-400 mt-0.5">{alert.sub}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ── Student Roster ── */}
          <div className="border rounded-xl overflow-hidden">
            {/* Roster Header */}
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-3 p-5 border-b">
              <h2 className="text-lg font-bold">Student roster</h2>
              <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
                <div className="relative flex-1 md:flex-none">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search students..."
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                    className="pl-9 pr-4 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary w-full md:w-48"
                  />
                </div>
                <div className="relative">
                  <select
                    value={yearFilter}
                    onChange={e => setYearFilter(e.target.value)}
                    className="appearance-none border rounded-lg pl-3 pr-8 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary bg-white"
                  >
                    {['All years', 'Freshman', 'Sophomore', 'Junior', 'Senior'].map(y => <option key={y}>{y}</option>)}
                  </select>
                  <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
                </div>
                <div className="relative">
                  <select
                    value={statusFilter}
                    onChange={e => setStatusFilter(e.target.value)}
                    className="appearance-none border rounded-lg pl-3 pr-8 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary bg-white"
                  >
                    {['All status', 'On track', 'At risk'].map(s => <option key={s}>{s}</option>)}
                  </select>
                  <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
                </div>
              </div>
            </div>

            {/* Legend */}
            <div className="flex items-center gap-5 px-5 py-3 border-b bg-gray-50/50 text-sm text-gray-600">
              <div className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-indigo-600" />AI</div>
              <div className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-green-600" />Experiential learning</div>
              <div className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-amber-600" />Session attendance</div>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="text-left px-5 py-3 text-xs font-semibold text-gray-400">Student</th>
                    <th className="text-left px-4 py-3 text-xs font-semibold text-gray-400">School</th>
                    <th className="text-left px-4 py-3 text-xs font-semibold text-gray-400">Year</th>
                    <th className="text-left px-4 py-3 text-xs font-semibold text-gray-400">Progress</th>
                    <th className="text-left px-4 py-3 text-xs font-semibold text-gray-400">Status</th>
                    <th className="text-left px-4 py-3 text-xs font-semibold text-gray-400">Last active</th>
                    <th className="px-4 py-3" />
                  </tr>
                </thead>
                <tbody>
                  {filtered.map(student => (
                    <>
                      <tr
                        key={student.id}
                        className={`border-b transition-colors ${selectedId === student.id ? 'bg-indigo-50/60' : 'hover:bg-gray-50/60'}`}
                      >
                        <td className="px-5 py-4">
                          <button
                            onClick={() => toggleStudent(student.id)}
                            className="font-semibold text-indigo-600 hover:underline text-left"
                          >
                            {student.name}
                          </button>
                        </td>
                        <td className="px-4 py-4 text-gray-500 max-w-[90px] truncate">{student.school}</td>
                        <td className="px-4 py-4 text-gray-700">{student.year}</td>
                        <td className="px-4 py-4">
                          <div className="space-y-1.5 w-36">
                            <div className="flex items-center gap-2">
                              <span className="text-xs text-gray-400 w-5">AI</span>
                              <MiniBar value={student.ai} color="bg-indigo-600" />
                            </div>
                            <div className="flex items-center gap-2">
                              <span className="text-xs text-gray-400 w-5">EL</span>
                              <MiniBar value={student.experiential} color="bg-green-600" />
                            </div>
                            <div className="flex items-center gap-2">
                              <span className="text-xs text-gray-400 w-5">SA</span>
                              <MiniBar value={student.sessionAttendance} color="bg-amber-600" />
                            </div>
                          </div>
                        </td>
                        <td className="px-4 py-4">
                          <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${
                            student.status === 'On track'
                              ? 'bg-green-100 text-green-700'
                              : 'bg-red-100 text-red-600'
                          }`}>{student.status}</span>
                        </td>
                        <td className="px-4 py-4 text-gray-500">{student.lastActive}</td>
                        <td className="px-4 py-4">
                          <button
                            onClick={() => toggleStudent(student.id)}
                            className="border rounded-lg px-3 py-1.5 text-xs font-medium hover:bg-gray-50 transition-colors"
                          >
                            {selectedId === student.id ? 'Close' : 'View'}
                          </button>
                        </td>
                      </tr>

                      <AnimatePresence>
                        {selectedId === student.id && (
                          <InlineProfile key={`profile-${student.id}`} student={student} onClose={() => setSelectedId(null)} />
                        )}
                      </AnimatePresence>
                    </>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

        </motion.div>
      </div>
    </div>
  )
}
