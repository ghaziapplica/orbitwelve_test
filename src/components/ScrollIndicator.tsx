"use client"

export function ScrollIndicator() {
  const handleClick = () => {
    const nextScrollPosition = window.scrollY + window.innerHeight
    window.scrollTo({ top: nextScrollPosition, behavior: "smooth" })
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      aria-label="Scroll to next section"
      className="group flex flex-col items-center gap-2 text-primary-foreground"
    >
      <span className="relative h-10 w-6 rounded-full border-2 border-current/90">
        <span className="absolute left-1/2 top-2 h-2 w-1 -translate-x-1/2 rounded-full bg-current/90 animate-bounce" />
      </span>

      <svg
        className="h-5 w-5 opacity-90 transition-opacity group-hover:opacity-100"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        aria-hidden="true"
      >
        <path d="M6 9l6 6 6-6" />
      </svg>
      <svg
        className="h-5 w-5 -mt-2 opacity-70 transition-opacity group-hover:opacity-90"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        aria-hidden="true"
      >
        <path d="M6 9l6 6 6-6" />
      </svg>
    </button>
  )
}
