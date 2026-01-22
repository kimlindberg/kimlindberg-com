export const profile = {
  name: "Kim Lindberg",
  title: "Senior Software Engineer · Technical Leadership",
  blurb: "<strong>Senior software engineer</strong> shaped by years of <strong>building and leading</strong> <strong>complex software systems</strong> across <strong>multiple products</strong> and <strong>organizations</strong>.",
  location: "Dubai, United Arab Emirates · Remote",
  now: "Open to <strong>senior technical roles</strong> with <strong>meaningful ownership</strong>.",
  previously: "Senior Software Engineering Director @ Careem.",
  tags: ["Complex systems", "Technical leadership", "Ownership", "Execution"],
  avatarUrl: "/favicon.png"
} as const;

export const links = [
  {
    label: "Email",
    href: "mailto:hello@kimlindberg.com?subject=Hello%20from%20kimlindberg.com",
    hint: "Direct contact"
  },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/kimlindberg", hint: "Profile + history" },
  { label: "GitHub", href: "https://github.com/kimlindberg", hint: "Code + repos" }
] as const;