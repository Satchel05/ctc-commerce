const Svg = ({ size, children }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    {children}
  </svg>
)

export const ArrowLeft = () => (
  <Svg size={24}>
    <path d="M19 12H5" />
    <path d="m12 19-7-7 7-7" />
  </Svg>
)

export const XIcon = () => (
  <Svg size={20}>
    <path d="M18 6 6 18" />
    <path d="m6 6 12 12" />
  </Svg>
)

export const ArrowUpRight = () => (
  <Svg size={12}>
    <path d="M7 7h10v10" />
    <path d="M7 17 17 7" />
  </Svg>
)
