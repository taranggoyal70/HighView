import { useState } from 'react'
import { Search, MapPin, DollarSign, Calendar, Users } from 'lucide-react'

interface Opportunity {
  id: string
  title: string
  company: string
  type: 'Job shadows' | 'Micro-internships' | 'Networking' | 'Mentorship' | 'Hackathons'
  tags: string[]
  location: string
  pay?: string
  duration?: string
  spots?: number
  students?: number
  deadline?: string
  status?: 'New' | 'Closes Soon'
  isPaid?: boolean
}

const mockOpportunities: Opportunity[] = [
  {
    id: '1',
    title: 'Brand Strategy Micro-Internship',
    company: 'Crocs Inc.',
    type: 'Micro-internships',
    tags: ['Marketing', '6 weeks'],
    location: 'Remote',
    pay: '$18/hr',
    students: 3,
    deadline: 'Apr 15',
    status: 'Closes Soon',
    isPaid: true
  },
  {
    id: '2',
    title: 'Curated Connections — Spring',
    company: 'HighView × 8 Partners',
    type: 'Networking',
    tags: ['Apr 4'],
    location: 'Virtual',
    pay: 'Free',
    spots: 30,
    status: 'New',
    isPaid: false
  },
  {
    id: '3',
    title: 'HR Job Shadow',
    company: 'Pinnacol Assurance',
    type: 'Job shadows',
    tags: ['HR / People Ops', 'Half day'],
    location: 'Denver, CO',
    students: 1,
    isPaid: false
  },
  {
    id: '4',
    title: 'Embedded Project Team — AI Strategy',
    company: 'ChatWalrus',
    type: 'Micro-internships',
    tags: ['Tech / AI', '10 weeks'],
    location: 'Hybrid',
    pay: '$20/hr',
    students: 4,
    deadline: 'May 1',
    status: 'Closes Soon',
    isPaid: true
  }
]

const filterOptions = ['All', 'Job shadows', 'Micro-internships', 'Networking', 'Mentorship', 'Hackathons'] as const

export default function OpportunitiesPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [activeFilter, setActiveFilter] = useState<typeof filterOptions[number]>('All')

  const filteredOpportunities = mockOpportunities.filter(opp => {
    const matchesSearch = opp.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         opp.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         opp.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
    
    const matchesFilter = activeFilter === 'All' || opp.type === activeFilter
    
    return matchesSearch && matchesFilter
  })

  const openCount = filteredOpportunities.length

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl font-bold text-gray-900">
              PROGRAM & OPPORTUNITY
            </h1>
          </div>

          {/* Navigation Tabs */}
          <div className="flex items-center gap-8 mb-6">
            <div className="text-2xl font-bold text-gray-900">HighView</div>
            <nav className="flex gap-8">
              <a href="/" className="text-gray-600 hover:text-gray-900">Home</a>
              <a href="/explore" className="text-blue-600 font-semibold border-b-2 border-blue-600 pb-1">Explore</a>
              <a href="/mentors" className="text-gray-600 hover:text-gray-900">Mentors</a>
              <a href="/profile" className="text-gray-600 hover:text-gray-900">Profile</a>
            </nav>
            <div className="ml-auto">
              <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white font-semibold">
                JR
              </div>
            </div>
          </div>

          {/* Search Bar */}
          <div className="relative mb-6">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search opportunities, companies, roles..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* Filter Tabs */}
          <div className="flex gap-3">
            {filterOptions.map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  activeFilter === filter
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Results Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold text-gray-900">
            Open now <span className="text-gray-500 font-normal">{openCount} opportunities</span>
          </h2>
          <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
            Sort: Deadline ↓
          </button>
        </div>

        {/* Opportunities List */}
        <div className="space-y-4">
          {filteredOpportunities.map((opportunity) => (
            <div
              key={opportunity.id}
              className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-md transition-shadow cursor-pointer"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-gray-900 mb-1">
                    {opportunity.title}
                  </h3>
                  <p className="text-gray-600">{opportunity.company}</p>
                </div>
                {opportunity.status && (
                  <span
                    className={`px-3 py-1 rounded text-sm font-medium ${
                      opportunity.status === 'New'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-amber-100 text-amber-800'
                    }`}
                  >
                    {opportunity.status === 'Closes Soon' && opportunity.deadline
                      ? `Closes ${opportunity.deadline}`
                      : opportunity.status}
                  </span>
                )}
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-4">
                {opportunity.isPaid && (
                  <span className="px-3 py-1 bg-purple-100 text-purple-800 rounded text-sm font-medium">
                    Paid role
                  </span>
                )}
                <span
                  className={`px-3 py-1 rounded text-sm font-medium ${
                    opportunity.type === 'Networking'
                      ? 'bg-amber-100 text-amber-800'
                      : opportunity.type === 'Job shadows'
                      ? 'bg-gray-100 text-gray-800'
                      : 'bg-teal-100 text-teal-800'
                  }`}
                >
                  {opportunity.type === 'Job shadows' ? 'Observation' : opportunity.type}
                </span>
                {opportunity.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-gray-100 text-gray-700 rounded text-sm"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Details */}
              <div className="flex items-center gap-6 text-sm text-gray-600">
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  <span>{opportunity.location}</span>
                </div>
                {opportunity.pay && (
                  <div className="flex items-center gap-2">
                    <DollarSign className="w-4 h-4" />
                    <span>{opportunity.pay}</span>
                  </div>
                )}
                {opportunity.students !== undefined && (
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4" />
                    <span>{opportunity.students} {opportunity.students === 1 ? 'student' : 'students'}</span>
                  </div>
                )}
                {opportunity.spots !== undefined && (
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4" />
                    <span>{opportunity.spots} spots</span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {filteredOpportunities.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No opportunities found matching your search.</p>
          </div>
        )}
      </div>
    </div>
  )
}
