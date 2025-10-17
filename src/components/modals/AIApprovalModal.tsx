'use client'
import { useState } from 'react'
import * as Dialog from '@radix-ui/react-dialog'
import { WorkerResult } from '@/lib/types'

interface AIApprovalModalProps {
  isOpen: boolean
  onClose: () => void
  result: WorkerResult
  runId?: string
  onApprove?: () => void
  onReject?: () => void
}

export default function AIApprovalModal({
  isOpen,
  onClose,
  result,
  runId,
  onApprove,
  onReject
}: AIApprovalModalProps) {
  const [activeTab, setActiveTab] = useState<'summary' | 'artifacts' | 'next'>('summary')

  const handleApprove = () => {
    onApprove?.()
    onClose()
  }

  const handleReject = () => {
    onReject?.()
    onClose()
  }

  return (
    <Dialog.Root open={isOpen} onOpenChange={onClose}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/50 z-50" />
        <Dialog.Content className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-2xl shadow-soft w-full max-w-4xl max-h-[80vh] overflow-hidden z-50">
          <div className="p-6">
            <Dialog.Title className="text-xl font-semibold text-slate-900 mb-2">
              AI drafted changes
            </Dialog.Title>
            <Dialog.Description className="text-sm text-slate-600 mb-6">
              Review these artifacts. No external changes occur without your approval.
            </Dialog.Description>

            {/* Tabs */}
            <div className="flex space-x-1 mb-6">
              {[
                { id: 'summary', label: 'Summary' },
                { id: 'artifacts', label: 'Artifacts' },
                { id: 'next', label: 'Next Steps' }
              ].map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    activeTab === tab.id
                      ? 'bg-mint text-slate-900'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Content */}
            <div className="max-h-96 overflow-y-auto">
              {activeTab === 'summary' && (
                <div className="space-y-4">
                  <div className="bg-slate-50 rounded-lg p-4">
                    <h3 className="font-medium text-slate-900 mb-2">Summary</h3>
                    <p className="text-slate-700">{result.summary}</p>
                  </div>
                  {runId && (
                    <div className="text-xs text-slate-500">
                      Run ID: {runId}
                    </div>
                  )}
                </div>
              )}

              {activeTab === 'artifacts' && (
                <div className="space-y-4">
                  {result.artifacts.length === 0 ? (
                    <div className="text-slate-500 text-center py-8">
                      No artifacts generated
                    </div>
                  ) : (
                    result.artifacts.map((artifact, index) => (
                      <div key={index} className="border border-slate-200 rounded-lg overflow-hidden">
                        <div className="bg-slate-50 px-4 py-2 border-b border-slate-200">
                          <div className="flex items-center justify-between">
                            <span className="font-medium text-slate-900">{artifact.path}</span>
                            <span className="text-xs bg-slate-200 text-slate-700 px-2 py-1 rounded">
                              {artifact.type}
                            </span>
                          </div>
                        </div>
                        <div className="p-4">
                          <pre className="text-sm text-slate-700 whitespace-pre-wrap overflow-x-auto">
                            {artifact.content}
                          </pre>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              )}

              {activeTab === 'next' && (
                <div className="space-y-4">
                  {result.next.length === 0 ? (
                    <div className="text-slate-500 text-center py-8">
                      No next steps suggested
                    </div>
                  ) : (
                    <ul className="space-y-2">
                      {result.next.map((step, index) => (
                        <li key={index} className="flex items-start space-x-3">
                          <span className="w-6 h-6 bg-mint text-slate-900 rounded-full flex items-center justify-center text-xs font-medium mt-0.5">
                            {index + 1}
                          </span>
                          <span className="text-slate-700">{step}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              )}
            </div>

            {/* Actions */}
            <div className="flex items-center justify-between mt-6 pt-6 border-t border-slate-200">
              <div className="text-xs text-slate-500">
                Draft only. You approve before anything posts.
              </div>
              <div className="flex space-x-3">
                <button
                  onClick={handleReject}
                  className="px-4 py-2 text-slate-600 hover:text-slate-900 transition-colors"
                >
                  Reject
                </button>
                <button
                  onClick={handleApprove}
                  disabled={true}
                  className="px-4 py-2 bg-slate-300 text-slate-500 rounded-lg cursor-not-allowed"
                  title="Coming in Phase 4"
                >
                  Approve & Apply
                </button>
              </div>
            </div>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}

