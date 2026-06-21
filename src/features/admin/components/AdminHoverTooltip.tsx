import type { AdminHoverTooltipProps } from '@/typing/adminHomeView'

const tooltipOffset = 14

export function AdminHoverTooltip({
  date,
  label,
  clientX,
  clientY,
  preferBelow = false,
}: AdminHoverTooltipProps) {
  const showBelow = preferBelow
  const caretClassName = showBelow
    ? 'absolute [left:50%] [top:-5px] [width:10px] [height:10px] [background:var(--fr-surface)] [border-left:var(--fr-border-width-sm)_solid_var(--fr-border)] [border-top:var(--fr-border-width-sm)_solid_var(--fr-border)]'
    : 'absolute [left:50%] [bottom:-5px] [width:10px] [height:10px] [background:var(--fr-surface)] [border-right:var(--fr-border-width-sm)_solid_var(--fr-border)] [border-bottom:var(--fr-border-width-sm)_solid_var(--fr-border)]'

  return (
    <div
      className="pointer-events-none fixed [z-index:50] [padding:var(--fr-space-2)_var(--fr-space-3)] [background:var(--fr-surface)] [border:var(--fr-border-width-sm)_solid_var(--fr-border)] [border-radius:var(--fr-radius-md)] [box-shadow:var(--fr-shadow-md)]"
      style={{
        left: clientX,
        top: clientY,
        transform: showBelow
          ? `translate(-50%, ${tooltipOffset}px)`
          : `translate(-50%, calc(-100% - ${tooltipOffset}px))`,
      }}
      role="tooltip"
    >
      {date !== undefined && (
        <p className="[margin:var(--fr-space-0)] [font-size:var(--fr-text-xs)] [font-weight:var(--fr-weight-medium)] [line-height:var(--fr-leading-snug)] [color:var(--fr-text-secondary)] whitespace-nowrap">
          {date}
        </p>
      )}
      <p className="[margin:var(--fr-space-0)] [font-size:var(--fr-text-sm)] [font-weight:var(--fr-weight-semibold)] [line-height:var(--fr-leading-snug)] [color:var(--fr-text-primary)] whitespace-nowrap">
        {label}
      </p>
      <div
        className={caretClassName}
        style={{ transform: 'translateX(-50%) rotate(45deg)' }}
        aria-hidden
      />
    </div>
  )
}
