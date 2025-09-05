import React, { useState } from 'react';
import { Button } from './ui/Button';
import { Icon } from './ui/Icon';
import { StatusIndicator } from './ui/StatusIndicator';
import { DataCard } from './ui/DataCard';
import { cn } from '@/lib/utils';

interface Insight {
  id: string;
  insightType: string;
  affectedArea: string;
  severity: number;
  confidence: number;
  timestamp: Date;
  status: 'Draft' | 'Pending Review' | 'Approved' | 'Disseminated' | 'Rescinded';
  geometry?: any;
  hotspotScore?: number;
  lgu?: string;
  municipality?: string;
  description?: string;
  evidence?: EvidenceItem[];
  recommendations?: Recommendation[];
  notes?: string[];
}

interface EvidenceItem {
  id: string;
  type: 'sensor' | 'satellite' | 'weather' | 'social' | 'historical';
  source: string;
  description: string;
  confidence: number;
  timestamp: Date;
  data?: any;
}

interface Recommendation {
  id: string;
  type: 'sms' | 'radio' | 'email' | 'alert';
  priority: 'low' | 'medium' | 'high' | 'critical';
  content: string;
  recipients?: string[];
  estimatedReach?: number;
}

interface InsightDetailPanelProps {
  insight: Insight | null;
  onApprove: (insightId: string) => void;
  onRescind: (insightId: string) => void;
  onEditGeometry: (insightId: string) => void;
  onAddNote: (insightId: string, note: string) => void;
  onClose: () => void;
  className?: string;
  loading?: boolean;
}

const InsightDetailPanel: React.FC<InsightDetailPanelProps> = ({
  insight,
  onApprove,
  onRescind,
  onEditGeometry,
  onAddNote,
  onClose,
  className,
  loading = false,
}) => {
  const [newNote, setNewNote] = useState('');
  const [activeTab, setActiveTab] = useState<'overview' | 'evidence' | 'recommendations' | 'notes'>('overview');

  if (!insight) {
    return (
      <div className={cn('flex flex-col h-full bg-white dark:bg-slate-900 border-l border-gray-200 dark:border-slate-700', className)}>
        <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-slate-700">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-slate-100">Insight Details</h2>
          <Button variant="tertiary" size="sm" onClick={onClose}>
            <Icon name="XMarkIcon" size="sm" />
          </Button>
        </div>
        <div className="flex-1 flex items-center justify-center text-gray-500 dark:text-slate-400">
          <div className="text-center">
            <Icon name="InformationCircleIcon" size="lg" className="mb-2" />
            <p>Select an insight to view details</p>
          </div>
        </div>
      </div>
    );
  }

  const handleAddNote = () => {
    if (newNote.trim()) {
      onAddNote(insight.id, newNote.trim());
      setNewNote('');
    }
  };

  const getEvidenceIcon = (type: EvidenceItem['type']) => {
    switch (type) {
      case 'sensor': return 'CogIcon';
      case 'satellite': return 'EyeIcon';
      case 'weather': return 'CloudIcon';
      case 'social': return 'UserIcon';
      case 'historical': return 'ChartBarIcon';
      default: return 'InformationCircleIcon';
    }
  };

  const getRecommendationIcon = (type: Recommendation['type']) => {
    switch (type) {
      case 'sms': return 'ChatBubbleLeftIcon';
      case 'radio': return 'RadioIcon';
      case 'email': return 'EnvelopeIcon';
      case 'alert': return 'BellIcon';
      default: return 'InformationCircleIcon';
    }
  };

  // Mock icons for missing ones
  const CloudIcon = 'CloudIcon';
  const ChatBubbleLeftIcon = 'ChatBubbleLeftIcon';
  const RadioIcon = 'RadioIcon';
  const EnvelopeIcon = 'EnvelopeIcon';

  if (loading) {
    return (
      <div className={cn('flex flex-col h-full bg-white dark:bg-slate-900 border-l border-gray-200 dark:border-slate-700', className)}>
        <div className="p-4 border-b border-gray-200 dark:border-slate-700">
          <div className="animate-pulse">
            <div className="h-6 bg-gray-200 dark:bg-slate-700 rounded w-3/4 mb-2"></div>
            <div className="h-4 bg-gray-200 dark:bg-slate-700 rounded w-1/2"></div>
          </div>
        </div>
        <div className="flex-1 p-4">
          <div className="animate-pulse space-y-4">
            <div className="h-20 bg-gray-200 dark:bg-slate-700 rounded"></div>
            <div className="h-32 bg-gray-200 dark:bg-slate-700 rounded"></div>
            <div className="h-24 bg-gray-200 dark:bg-slate-700 rounded"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={cn('flex flex-col h-full bg-white dark:bg-slate-900 border-l border-gray-200 dark:border-slate-700', className)}>
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-200">
        <div>
          <h2 className="text-lg font-semibold text-gray-900">Insight #{insight.id}</h2>
          <div className="flex items-center space-x-2 mt-1">
            <StatusIndicator status={insight.status as any} />
            <span className="text-sm text-gray-600">
              {insight.timestamp.toLocaleString()}
            </span>
          </div>
        </div>
        <Button variant="tertiary" size="sm" onClick={onClose}>
          <Icon name="XMarkIcon" size="sm" />
        </Button>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-gray-200">
        {[
          { id: 'overview', label: 'Overview', icon: 'EyeIcon' },
          { id: 'evidence', label: 'Evidence', icon: 'ChartBarIcon' },
          { id: 'recommendations', label: 'Recommendations', icon: 'BellIcon' },
          { id: 'notes', label: 'Notes', icon: 'InformationCircleIcon' },
        ].map((tab) => (
          <Button
            key={tab.id}
            variant={activeTab === tab.id ? 'secondary' : 'tertiary'}
            size="sm"
            className={cn(
              "flex-1 rounded-none border-b-2",
              activeTab === tab.id ? "border-blue-500" : "border-transparent"
            )}
            onClick={() => setActiveTab(tab.id as any)}
          >
            <Icon name={tab.icon as any} size="sm" className="mr-2" />
            {tab.label}
          </Button>
        ))}
      </div>

      {/* Content */}
      <div className="flex-1 overflow-auto">
        {activeTab === 'overview' && (
          <div className="p-4 space-y-4">
            {/* Basic Info */}
            <div className="grid grid-cols-2 gap-4">
              <DataCard
                title="Insight Type"
                value={insight.insightType}
                icon="InformationCircleIcon"
              />
              <DataCard
                title="Affected Area"
                value={insight.affectedArea}
                icon="MapIcon"
              />
              <DataCard
                title="Severity"
                value={`Level ${insight.severity}`}
                status={insight.severity >= 4 ? 'critical' : insight.severity >= 3 ? 'warning' : 'normal'}
                icon="ExclamationTriangleIcon"
              />
              <DataCard
                title="Confidence"
                value={`${insight.confidence}%`}
                icon="ChartBarIcon"
              />
            </div>

            {/* Description */}
            {insight.description && (
              <div className="bg-gray-50 dark:bg-slate-800 rounded-lg p-4">
                <h3 className="text-sm font-medium text-gray-900 dark:text-slate-100 mb-2">Description</h3>
                <p className="text-sm text-gray-700 dark:text-slate-300">{insight.description}</p>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex flex-nowrap items-center justify-between gap-2 pt-4 border-t border-gray-200 dark:border-slate-700">
              <div className="flex flex-nowrap gap-2">
                {insight.status === 'Pending Review' && (
                  <>
                    <Button
                      onClick={() => onApprove(insight.id)}
                      variant="primary"
                    >
                      <Icon name="CheckCircleIcon" size="sm" className="mr-2" />
                      Approve
                    </Button>
                    <Button
                      variant="destructive-outline"
                      onClick={() => onRescind(insight.id)}
                    >
                      <Icon name="XCircleIcon" size="sm" className="mr-2" />
                      Rescind
                    </Button>
                  </>
                )}
              </div>
              <Button
                variant="secondary"
                onClick={() => onEditGeometry(insight.id)}
              >
                <Icon name="MapIcon" size="sm" className="mr-2" />
                Edit Geometry
              </Button>
            </div>
          </div>
        )}

        {activeTab === 'evidence' && (
          <div className="p-4">
            <h3 className="text-sm font-medium text-gray-900 dark:text-slate-100 mb-4">Evidence Sources</h3>
            {insight.evidence && insight.evidence.length > 0 ? (
              <div className="space-y-3">
                {insight.evidence.map((evidence) => (
                  <div key={evidence.id} className="bg-gray-50 dark:bg-slate-800 rounded-lg p-4">
                    <div className="flex items-start space-x-3">
                      <Icon name={getEvidenceIcon(evidence.type) as any} size="sm" className="mt-1" />
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-sm font-medium text-gray-900 dark:text-slate-100">{evidence.source}</span>
                          <span className="text-xs text-gray-600 dark:text-slate-400">
                            {evidence.confidence}% confidence
                          </span>
                        </div>
                        <p className="text-sm text-gray-700 dark:text-slate-300 mb-2">{evidence.description}</p>
                        <div className="text-xs text-gray-500 dark:text-slate-500">
                          {evidence.timestamp.toLocaleString()}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-gray-500 dark:text-slate-400">
                <Icon name="InformationCircleIcon" size="lg" className="mb-2" />
                <p>No evidence data available</p>
              </div>
            )}
          </div>
        )}

        {activeTab === 'recommendations' && (
          <div className="p-4">
            <h3 className="text-sm font-medium text-gray-900 dark:text-slate-100 mb-4">Communication Recommendations</h3>
            {insight.recommendations && insight.recommendations.length > 0 ? (
              <div className="space-y-3">
                {insight.recommendations.map((rec) => (
                  <div key={rec.id} className="bg-gray-50 dark:bg-slate-800 rounded-lg p-4">
                    <div className="flex items-start space-x-3">
                      <Icon name={getRecommendationIcon(rec.type) as any} size="sm" className="mt-1" />
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm font-medium text-gray-900 dark:text-slate-100 capitalize">
                            {rec.type} Message
                          </span>
                          <span className={cn(
                            'text-xs px-2 py-1 rounded-full',
                            rec.priority === 'critical' && 'bg-red-100 dark:bg-red-900/50 text-red-800 dark:text-red-300',
                            rec.priority === 'high' && 'bg-orange-100 dark:bg-orange-900/50 text-orange-800 dark:text-orange-300',
                            rec.priority === 'medium' && 'bg-yellow-100 dark:bg-yellow-900/50 text-yellow-800 dark:text-yellow-300',
                            rec.priority === 'low' && 'bg-green-100 dark:bg-green-900/50 text-green-800 dark:text-green-300'
                          )}>
                            {rec.priority}
                          </span>
                        </div>
                        <p className="text-sm text-gray-700 dark:text-slate-300 mb-2">{rec.content}</p>
                        {rec.recipients && (
                          <div className="text-xs text-gray-600 dark:text-slate-400">
                            Recipients: {rec.recipients.join(', ')}
                          </div>
                        )}
                        {rec.estimatedReach && (
                          <div className="text-xs text-gray-600 dark:text-slate-400">
                            Estimated reach: {rec.estimatedReach.toLocaleString()} people
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-gray-500 dark:text-slate-400">
                <Icon name="InformationCircleIcon" size="lg" className="mb-2" />
                <p>No recommendations available</p>
              </div>
            )}
          </div>
        )}

        {activeTab === 'notes' && (
          <div className="p-4">
            <h3 className="text-sm font-medium text-gray-900 dark:text-slate-100 mb-4">Operator Notes</h3>

            {/* Add Note */}
            <div className="mb-4">
              <textarea
                value={newNote}
                onChange={(e) => setNewNote(e.target.value)}
                placeholder="Add a note about this insight..."
                className="w-full px-3 py-2 border border-gray-300 dark:border-slate-600 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-slate-800 text-gray-900 dark:text-slate-100"
                rows={3}
              />
              <Button
                onClick={handleAddNote}
                disabled={!newNote.trim()}
                className="mt-2"
                size="sm"
              >
                Add Note
              </Button>
            </div>

            {/* Existing Notes */}
            {insight.notes && insight.notes.length > 0 ? (
              <div className="space-y-3">
                {insight.notes.map((note, index) => (
                  <div key={index} className="bg-gray-50 dark:bg-slate-800 rounded-lg p-3">
                    <p className="text-sm text-gray-700 dark:text-slate-300">{note}</p>
                    <div className="text-xs text-gray-500 dark:text-slate-500 mt-1">
                      Added {new Date().toLocaleString()}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-gray-500 dark:text-slate-400">
                <Icon name="InformationCircleIcon" size="lg" className="mb-2" />
                <p>No notes yet</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export { InsightDetailPanel };
export type { Insight, EvidenceItem, Recommendation };
