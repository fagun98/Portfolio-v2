import SectionShell from '@/components/SectionShell'
import TechChip from '@/components/TechChip'
import MagneticButton from '@/components/MagneticButton'
import { EDUCATION, SECTION_LABELS } from '@/lib/data'
import type { EducationItem } from '@/lib/data'
import { cn } from '@/lib/utils'

function InstitutionMark({ item }: { item: EducationItem }) {
  const isPurdue = item.brand === 'purdue'

  return (
    <div
      className={cn(
        'flex h-12 w-12 shrink-0 items-center justify-center rounded-lg font-heading text-sm font-black text-white shadow-[0_10px_24px_rgba(26,26,26,0.08)]',
        isPurdue ? 'bg-[#CEB888] text-ink' : 'bg-[#800000]',
      )}
      aria-hidden="true"
    >
      {isPurdue ? 'P' : item.initials}
    </div>
  )
}

export default function Education() {
  return (
    <SectionShell id="education" label={SECTION_LABELS.education}>
      <h2 className="font-heading text-3xl font-semibold text-ink lg:text-5xl">{SECTION_LABELS.education.split(' - ')[1]}</h2>
      <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2">
        {EDUCATION.map((item) => (
          <article key={item.university} className="glass-panel rounded-2xl border border-border p-6">
            <div className="flex items-start gap-4">
              <InstitutionMark item={item} />
              <div>
                <MagneticButton
                  href={item.link}
                  external
                  className="border-transparent px-0 py-0 font-heading text-lg font-semibold text-ink shadow-none hover:border-transparent hover:text-amber hover:shadow-none"
                >
                  {item.university}
                </MagneticButton>
                <p className="mt-1 text-base text-ink/80">{item.degree}</p>
                <p className="mt-1 text-sm text-muted">{item.dates}</p>
                <p className="mt-1 text-sm text-muted">{item.location}</p>
              </div>
            </div>

            <p className="mt-5 text-sm leading-6 text-ink/70">{item.copy}</p>

            <div className="mt-5 flex flex-wrap gap-2">
              <span className="inline-flex rounded-full bg-amber/10 px-3 py-1 text-xs font-semibold text-amber-dark">{item.gpa}</span>
              {item.achievement && (
                <span className="inline-flex rounded-full bg-amber/10 px-3 py-1 text-xs font-semibold text-amber-dark">
                  {item.achievement}
                </span>
              )}
            </div>

            <div className="mt-5 flex flex-wrap gap-2">
              {item.coursework.map((course) => (
                <TechChip key={course} label={course} />
              ))}
            </div>
          </article>
        ))}
      </div>
    </SectionShell>
  )
}
