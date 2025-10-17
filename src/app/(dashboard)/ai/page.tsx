'use client'
import { useState, useEffect } from 'react'
import { ManagerPlan, WorkerResult, AgentMessage, Agent, Task, Project } from '@/lib/types'
import AIApprovalModal from '@/components/modals/AIApprovalModal'
import NoteChip from '@/components/brand/NoteChip'

export default function AITeamPage() {
  const [project, setProject] = useState<Project | null>(null)
  const [manager, setManager] = useState<Agent | null>(null)
  const [tasks, setTasks] = useState<Task[]>([])
  const [messages, setMessages] = useState<AgentMessage[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  
  // Form state
  const [goal, setGoal] = useState('')
  const [includeReflections, setIncludeReflections] = useState(false)
  const [currentPlan, setCurrentPlan] = useState<ManagerPlan | null>(null)
  
  // Approval modal state
  const [approvalModal, setApprovalModal] = useState<{
    isOpen: boolean
    result: WorkerResult | null
    runId?: string
  }>({
    isOpen: false,
    result: null
  })
  
  // Filter state
  const [messageFilter, setMessageFilter] = useState<'all' | 'plan' | 'action' | 'result'>('all')
  const [showJSON, setShowJSON] = useState(false)

  // Load initial data
  useEffect(() => {
    loadProject()
  }, [])

  const loadProject = async () => {
    try {
      // For MVP, create a default project if none exists
      const response = await fetch('/api/projects', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: 'My AI Project' })
      })
      
      if (response.ok) {
        const projectData = await response.json()
        setProject(projectData)
        loadManager(projectData.id)
        loadTasks(projectData.id)
        loadMessages(projectData.id)
      }
    } catch (err) {
      console.error('Error loading project:', err)
    }
  }

  const loadManager = async (projectId: string) => {
    try {
      const response = await fetch(`/api/ai/manager?projectId=${projectId}`)
      if (response.ok) {
        const managerData = await response.json()
        setManager(managerData)
      }
    } catch (err) {
      console.error('Error loading manager:', err)
    }
  }

  const loadTasks = async (projectId: string) => {
    try {
      const response = await fetch(`/api/tasks?projectId=${projectId}`)
      if (response.ok) {
        const tasksData = await response.json()
        setTasks(tasksData)
      }
    } catch (err) {
      console.error('Error loading tasks:', err)
    }
  }

  const loadMessages = async (projectId: string) => {
    try {
      const response = await fetch(`/api/ai/messages?projectId=${projectId}`)
      if (response.ok) {
        const messagesData = await response.json()
        setMessages(messagesData)
      }
    } catch (err) {
      console.error('Error loading messages:', err)
    }
  }

  const createManager = async () => {
    if (!project) return
    
    setLoading(true)
    try {
      const response = await fetch('/api/ai/manager/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ projectId: project.id })
      })
      
      if (response.ok) {
        const managerData = await response.json()
        setManager(managerData)
      } else {
        const errorData = await response.json()
        setError(errorData.message || 'Failed to create manager')
      }
    } catch (err) {
      setError('Failed to create manager')
    } finally {
      setLoading(false)
    }
  }

  const generatePlan = async () => {
    if (!project || !manager || !goal.trim()) return
    
    setLoading(true)
    try {
      const response = await fetch('/api/ai/manager/plan', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          projectId: project.id,
          goal: goal.trim(),
          includeReflections
        })
      })
      
      if (response.ok) {
        const { plan, runId } = await response.json()
        setCurrentPlan(plan)
        loadMessages(project.id) // Refresh messages
        loadTasks(project.id) // Refresh tasks
      } else {
        const errorData = await response.json()
        setError(errorData.message || 'Failed to generate plan')
      }
    } catch (err) {
      setError('Failed to generate plan')
    } finally {
      setLoading(false)
    }
  }

  const assignToWorker = async (task: Task) => {
    if (!project || !manager) return
    
    setLoading(true)
    try {
      // First spawn a worker
      const spawnResponse = await fetch('/api/ai/worker/spawn', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          projectId: project.id,
          role: 'worker',
          skills: ['coding', 'testing'],
          tools: ['cursor', 'github']
        })
      })
      
      if (!spawnResponse.ok) {
        throw new Error('Failed to spawn worker')
      }
      
      const worker = await spawnResponse.json()
      
      // Then execute the task
      const executeResponse = await fetch('/api/ai/worker/execute', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          projectId: project.id,
          agentId: worker.id,
          taskId: task.id
        })
      })
      
      if (executeResponse.ok) {
        const { result, runId } = await executeResponse.json()
        setApprovalModal({
          isOpen: true,
          result,
          runId
        })
        loadMessages(project.id) // Refresh messages
      } else {
        const errorData = await executeResponse.json()
        setError(errorData.message || 'Failed to execute task')
      }
    } catch (err) {
      setError('Failed to assign task to worker')
    } finally {
      setLoading(false)
    }
  }

  const filteredMessages = messages.filter(msg => {
    if (messageFilter === 'all') return true
    return msg.kind === messageFilter
  })

  return (
    <div className="p-6">
      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-semibold tracking-tight text-slate-900">AI Assistants</h1>
          <p className="mt-2 text-lg text-slate-600">
            An AI manager plans. AI workers draft. You approve every change.
          </p>
        </div>

        {/* Error Display */}
        {error && (
          <div className="mb-6 bg-red-50 border border-red-200 rounded-lg p-4">
            <p className="text-red-800">{error}</p>
            <button
              onClick={() => setError(null)}
              className="mt-2 text-red-600 hover:text-red-800 text-sm"
            >
              Dismiss
            </button>
          </div>
        )}

        <div className="grid gap-6 lg:grid-cols-2">
          {/* Left Column - Manager & Planning */}
          <div className="space-y-6">
            {/* Manager Card */}
            <div className="rounded-2xl bg-white/70 p-6 shadow-soft">
              <h3 className="text-lg font-medium text-slate-900 mb-4">AI Manager</h3>
              
              {!manager ? (
                <div className="text-center py-8">
                  <p className="text-slate-600 mb-4">Add an AI Manager to turn goals into a plan.</p>
                  <button
                    onClick={createManager}
                    disabled={loading}
                    className="px-4 py-2 bg-mint text-slate-900 rounded-lg hover:bg-mint/90 disabled:opacity-50"
                  >
                    {loading ? 'Creating...' : 'Get a planning partner—operates with consent'}
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-slate-600">Status:</span>
                    <NoteChip label={manager.status} tone="mint" />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      What's your goal?
                    </label>
                    <textarea
                      value={goal}
                      onChange={(e) => setGoal(e.target.value)}
                      placeholder="Describe what you want to achieve..."
                      className="w-full p-3 border border-slate-300 rounded-lg resize-none"
                      rows={3}
                    />
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id="includeReflections"
                      checked={includeReflections}
                      onChange={(e) => setIncludeReflections(e.target.checked)}
                      className="rounded border-slate-300 text-mint focus:ring-mint/50"
                    />
                    <label htmlFor="includeReflections" className="text-sm text-slate-600">
                      Include private reflections in context
                    </label>
                  </div>
                  
                  <button
                    onClick={generatePlan}
                    disabled={loading || !goal.trim()}
                    className="w-full px-4 py-2 bg-slate-900 text-white rounded-lg hover:bg-slate-800 disabled:opacity-50"
                  >
                    {loading ? 'Generating Plan...' : 'Generate Plan'}
                  </button>
                </div>
              )}
            </div>

            {/* Plan Display */}
            {currentPlan && (
              <div className="rounded-2xl bg-white/70 p-6 shadow-soft">
                <h3 className="text-lg font-medium text-slate-900 mb-4">Generated Plan</h3>
                <div className="space-y-4">
                  <div className="bg-slate-50 rounded-lg p-4">
                    <h4 className="font-medium text-slate-900 mb-2">Summary</h4>
                    <p className="text-slate-700">{currentPlan.summary}</p>
                  </div>
                  
                  {currentPlan.risks.length > 0 && (
                    <div>
                      <h4 className="font-medium text-slate-900 mb-2">Risks</h4>
                      <ul className="space-y-1">
                        {currentPlan.risks.map((risk, index) => (
                          <li key={index} className="text-sm text-slate-600">• {risk}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Tasks Table */}
            {tasks.length > 0 && (
              <div className="rounded-2xl bg-white/70 p-6 shadow-soft">
                <h3 className="text-lg font-medium text-slate-900 mb-4">Tasks</h3>
                <div className="space-y-3">
                  {tasks.map((task) => (
                    <div key={task.id} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                      <div className="flex-1">
                        <h4 className="font-medium text-slate-900">{task.title}</h4>
                        {task.description && (
                          <p className="text-sm text-slate-600 mt-1">{task.description}</p>
                        )}
                      </div>
                      <div className="flex items-center space-x-3">
                        <NoteChip 
                          label={task.ownerAgentId ? 'AI' : 'Human'} 
                          tone={task.ownerAgentId ? 'mint' : 'neutral'} 
                        />
                        <NoteChip label={task.status} tone="neutral" />
                        {!task.ownerAgentId && (
                          <button
                            onClick={() => assignToWorker(task)}
                            disabled={loading}
                            className="px-3 py-1 text-sm bg-mint text-slate-900 rounded hover:bg-mint/90 disabled:opacity-50"
                          >
                            {loading ? 'Assigning...' : 'Assign to AI'}
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
                <p className="text-xs text-slate-500 mt-3">
                  Draft only. You approve before anything posts.
                </p>
              </div>
            )}
          </div>

          {/* Right Column - Activity Feed */}
          <div className="rounded-2xl bg-white/70 p-6 shadow-soft">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-medium text-slate-900">AI Activity</h3>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setShowJSON(!showJSON)}
                  className="text-xs text-slate-500 hover:text-slate-700"
                >
                  {showJSON ? 'Hide JSON' : 'Show JSON'}
                </button>
              </div>
            </div>
            
            {/* Filters */}
            <div className="flex space-x-1 mb-4">
              {[
                { id: 'all', label: 'All' },
                { id: 'plan', label: 'Plan' },
                { id: 'action', label: 'Action' },
                { id: 'result', label: 'Result' }
              ].map(filter => (
                <button
                  key={filter.id}
                  onClick={() => setMessageFilter(filter.id as any)}
                  className={`px-3 py-1 rounded text-xs font-medium transition-colors ${
                    messageFilter === filter.id
                      ? 'bg-mint text-slate-900'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                  }`}
                >
                  {filter.label}
                </button>
              ))}
            </div>
            
            {/* Messages */}
            <div className="space-y-3 max-h-96 overflow-y-auto">
              {filteredMessages.length === 0 ? (
                <div className="text-center py-8 text-slate-500">
                  No AI activity yet
                </div>
              ) : (
                filteredMessages.map((message) => (
                  <div key={message.id} className="border border-slate-200 rounded-lg p-3">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-medium text-slate-600 uppercase">
                        {message.kind}
                      </span>
                      <span className="text-xs text-slate-500">
                        {new Date(message.createdAt).toLocaleTimeString()}
                      </span>
                    </div>
                    <p className="text-sm text-slate-700 mb-2">{message.text}</p>
                    {message.runId && (
                      <div className="text-xs text-slate-500">
                        Run ID: {message.runId} | Model: {message.model || 'deepseek-chat'}
                      </div>
                    )}
                    {showJSON && message.data && (
                      <pre className="text-xs text-slate-500 mt-2 bg-slate-50 p-2 rounded overflow-x-auto">
                        {JSON.stringify(message.data, null, 2)}
                      </pre>
                    )}
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Approval Modal */}
      <AIApprovalModal
        isOpen={approvalModal.isOpen}
        onClose={() => setApprovalModal({ isOpen: false, result: null })}
        result={approvalModal.result!}
        runId={approvalModal.runId}
        onApprove={() => {
          console.log('Approved:', approvalModal.result)
        }}
        onReject={() => {
          console.log('Rejected:', approvalModal.result)
        }}
      />
    </div>
  )
}

