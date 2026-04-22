import { useMemo } from 'react'
import { motion } from 'framer-motion'
import { TrendingUp, Users, Calendar, Award, Download, BarChart3, PieChart, Activity } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { SemesterSelector } from '@/components/SemesterSelector'
import { useSemester } from '@/contexts/SemesterContext'
import { getStatsBySemester } from '@/data/semesterData'
import {
  LineChart,
  Line,
  PieChart as RePieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend
} from 'recharts'

const engagementTrend = [
  { month: 'Jan', engagement: 75, attendance: 82, participation: 70 },
  { month: 'Feb', engagement: 78, attendance: 85, participation: 73 },
  { month: 'Mar', engagement: 82, attendance: 88, participation: 78 },
  { month: 'Apr', engagement: 85, attendance: 87, participation: 82 },
  { month: 'May', engagement: 88, attendance: 90, participation: 85 },
  { month: 'Jun', engagement: 90, attendance: 92, participation: 88 }
]

const courseCompletion = [
  { course: 'Math 101', enrolled: 45, completed: 38, rate: 84.4, status: 'On Track' },
  { course: 'Physics 202', enrolled: 38, completed: 28, rate: 73.7, status: 'At Risk' },
  { course: 'CS 301', enrolled: 52, completed: 50, rate: 96.2, status: 'Excellent' },
  { course: 'Chemistry 150', enrolled: 41, completed: 33, rate: 80.5, status: 'On Track' },
  { course: 'English 101', enrolled: 48, completed: 44, rate: 91.7, status: 'Excellent' },
]

const attendanceDistribution = [
  { name: 'Excellent (90-100%)', value: 45, color: '#22c55e' },
  { name: 'Good (80-89%)', value: 30, color: '#3b82f6' },
  { name: 'Average (70-79%)', value: 15, color: '#f59e0b' },
  { name: 'Poor (<70%)', value: 10, color: '#ef4444' }
]


export default function AnalyticsPage() {
  const { selectedSemester } = useSemester()

  // Get dynamic semester stats
  const stats = useMemo(() => getStatsBySemester(selectedSemester.id), [selectedSemester.id])

  const keyMetrics = useMemo(() => [
    { label: 'Total Students', value: stats.totalStudents.toString(), change: '+12%', icon: Users, color: 'text-blue-600', bgColor: 'bg-blue-100' },
    { label: 'Avg Engagement', value: `${stats.avgEngagement}%`, change: '+5%', icon: Activity, color: 'text-green-600', bgColor: 'bg-green-100' },
    { label: 'Active Sessions', value: stats.activeSessions.toString(), change: '+8%', icon: Calendar, color: 'text-purple-600', bgColor: 'bg-purple-100' },
    { label: 'Top Performers', value: stats.topPerformers.toString(), change: '+15%', icon: Award, color: 'text-orange-600', bgColor: 'bg-orange-100' }
  ], [stats])

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="container mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h1 className="text-3xl font-bold mb-2">Reports</h1>
              <p className="text-muted-foreground">Comprehensive insights into student engagement and performance</p>
            </div>
            <div className="flex gap-3 items-center">
              <SemesterSelector />
              <Button>
                <Download className="h-4 w-4 mr-2" />
                Export Report
              </Button>
            </div>
          </div>
          <div className="text-sm text-muted-foreground">
            Viewing data for: <span className="font-semibold text-foreground">{selectedSemester.name}</span>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {keyMetrics.map((metric, index) => (
            <motion.div
              key={metric.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">{metric.label}</CardTitle>
                  <div className={`p-2 rounded-lg ${metric.bgColor}`}>
                    <metric.icon className={`h-4 w-4 ${metric.color}`} />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">{metric.value}</div>
                  <p className="text-xs text-green-600 flex items-center gap-1 mt-1">
                    <TrendingUp className="h-3 w-3" />
                    {metric.change} from last month
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <div className="grid lg:grid-cols-2 gap-6 mb-6">
          {/* Engagement Trend */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="h-5 w-5" />
                Engagement Trends
              </CardTitle>
              <CardDescription>Monthly engagement, attendance, and participation metrics</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={engagementTrend}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="engagement" stroke="#8b5cf6" strokeWidth={2} />
                  <Line type="monotone" dataKey="attendance" stroke="#3b82f6" strokeWidth={2} />
                  <Line type="monotone" dataKey="participation" stroke="#10b981" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Course Completion */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="h-5 w-5" />
                Course Completion
              </CardTitle>
              <CardDescription>Enrollment and completion rates by course</CardDescription>
            </CardHeader>
            <CardContent>
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 font-semibold">Course</th>
                    <th className="text-left py-3 font-semibold">Enrolled</th>
                    <th className="text-left py-3 font-semibold">Completed</th>
                    <th className="text-left py-3 font-semibold">Rate</th>
                    <th className="text-left py-3 font-semibold">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {courseCompletion.map((row) => (
                    <tr key={row.course} className="border-b last:border-0 hover:bg-muted/30 transition-colors">
                      <td className="py-3 font-medium">{row.course}</td>
                      <td className="py-3 text-muted-foreground">{row.enrolled}</td>
                      <td className="py-3 text-muted-foreground">{row.completed}</td>
                      <td className="py-3">
                        <div className="flex items-center gap-2">
                          <div className="flex-1 bg-secondary rounded-full h-1.5 w-16">
                            <div className="bg-primary h-1.5 rounded-full" style={{ width: `${row.rate}%` }} />
                          </div>
                          <span className="font-medium">{row.rate}%</span>
                        </div>
                      </td>
                      <td className="py-3">
                        <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                          row.status === 'Excellent' ? 'bg-green-100 text-green-700' :
                          row.status === 'On Track' ? 'bg-blue-100 text-blue-700' :
                          'bg-red-100 text-red-700'
                        }`}>{row.status}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </CardContent>
          </Card>
        </div>

        {/* Attendance Distribution */}
        <Card className="mt-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <PieChart className="h-5 w-5" />
              Attendance Distribution
            </CardTitle>
            <CardDescription>Student attendance rate breakdown</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <RePieChart>
                <Pie
                  data={attendanceDistribution}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {attendanceDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </RePieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Insights Summary */}
        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Key Insights</CardTitle>
            <CardDescription>AI-generated insights from your data</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-start gap-3 p-4 bg-green-50 border border-green-200 rounded-lg">
                <TrendingUp className="h-5 w-5 text-green-600 mt-0.5" />
                <div>
                  <div className="font-semibold text-green-900">Positive Trend</div>
                  <p className="text-sm text-green-700">Overall engagement has increased by 15% over the past 3 months, with CS 301 showing the highest improvement.</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <Users className="h-5 w-5 text-blue-600 mt-0.5" />
                <div>
                  <div className="font-semibold text-blue-900">High Participation</div>
                  <p className="text-sm text-blue-700">45 students (13%) are top performers with engagement scores above 90%. Consider implementing peer mentoring programs.</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-4 bg-orange-50 border border-orange-200 rounded-lg">
                <Calendar className="h-5 w-5 text-orange-600 mt-0.5" />
                <div>
                  <div className="font-semibold text-orange-900">Attention Needed</div>
                  <p className="text-sm text-orange-700">Weekend sessions show 40% lower attendance. Consider adjusting session schedules or offering incentives for weekend participation.</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
