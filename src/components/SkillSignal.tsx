import { BrainCircuit, CloudCog, Database, Workflow } from 'lucide-react'

const nodes = [
  { label: 'Intelligence', icon: BrainCircuit, className: 'skill-signal-node-top' },
  { label: 'Orchestration', icon: Workflow, className: 'skill-signal-node-right' },
  { label: 'Infrastructure', icon: CloudCog, className: 'skill-signal-node-bottom' },
  { label: 'Data', icon: Database, className: 'skill-signal-node-left' },
]

export default function SkillSignal() {
  return (
    <div className="skill-signal" aria-label="AI system capability map">
      <div className="skill-signal-grid" aria-hidden="true" />
      <div className="skill-signal-orbit skill-signal-orbit-outer" aria-hidden="true" />
      <div className="skill-signal-orbit skill-signal-orbit-inner" aria-hidden="true" />
      <div className="skill-signal-core">
        <span className="font-mono text-[9px] font-semibold uppercase text-white/55">system</span>
        <strong className="font-heading text-2xl text-white">AI</strong>
        <span className="skill-signal-live"><i aria-hidden="true" /> online</span>
      </div>
      {nodes.map(({ label, icon: Icon, className }) => (
        <div key={label} className={`skill-signal-node ${className}`}>
          <Icon size={14} aria-hidden="true" />
          <span>{label}</span>
        </div>
      ))}
      <div className="skill-signal-scan" aria-hidden="true" />
    </div>
  )
}
