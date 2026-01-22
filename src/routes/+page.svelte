<!-- src/routes/+page.svelte -->
<script lang="ts">
  import { reveal } from "$lib/actions/reveal";
  import { themeOverride } from "$lib/stores/theme";
  import { Card, CardContent, CardHeader } from "$lib/components/ui/card";
  import { Badge } from "$lib/components/ui/badge";
  import { Separator } from "$lib/components/ui/separator";
  import { Avatar, AvatarFallback, AvatarImage } from "$lib/components/ui/avatar";
  import { Tooltip, TooltipContent, TooltipTrigger } from "$lib/components/ui/tooltip";
  import Spinner from "$lib/components/ui/spinner/spinner.svelte";
  import {
    Github,
    Linkedin,
    Mail,
    MapPin,
    History,
    Sun,
    Moon
  } from "@lucide/svelte";

  import { profile, links as rawLinks } from "$lib/data/profile";

  // Attach the actual icon components to links (keeps icons out of the data file)
  const iconMap = { Email: Mail, LinkedIn: Linkedin, GitHub: Github };
  const links = rawLinks.map((l) => ({ ...l, icon: iconMap[l.label as keyof typeof iconMap] }));

  // ============================================================================
  // Utility Functions
  // ============================================================================

  function initials(name: string): string {
    return name
      .split(" ")
      .filter(Boolean)
      .slice(0, 2)
      .map((part) => part[0]?.toUpperCase())
      .join("");
  }

  function isExternal(href: string): boolean {
    return href.startsWith("http://") || href.startsWith("https://");
  }

  function systemIsDark(): boolean {
    return typeof window !== "undefined" && window.matchMedia?.("(prefers-color-scheme: dark)").matches;
  }

  // ============================================================================
  // Reactive Declarations
  // ============================================================================

  $: resolvedIsDark = $themeOverride === null ? systemIsDark() : $themeOverride;
</script>

<svelte:head>
  <title>{profile.name}</title>
  <meta name="description" content={profile.blurb} />
</svelte:head>

<main class="min-h-screen bg-background text-foreground">
  <div class="mx-auto max-w-2xl px-6 py-16 sm:py-24" use:reveal={{ delay: 30, y: 10 }}>
    <div use:reveal={{ delay: 80, y: 10 }}>
      <div class="border-muted/60 shadow-sm transition-transform duration-200 motion-reduce:transition-none hover:-translate-y-0.5">
        <div use:reveal={{ delay: 120, y: 8 }}>
          <CardHeader class="space-y-6">
            <div class="flex items-start justify-between gap-4">
              <div class="flex items-center gap-4">
                <Avatar class="h-12 w-12">
                  {#if profile.avatarUrl}
                    <AvatarImage src={profile.avatarUrl} alt={profile.name} />
                  {/if}
                  <AvatarFallback>{initials(profile.name)}</AvatarFallback>
                </Avatar>

                <div class="space-y-1">
                  <h1 class="mb-2 text-2xl font-semibold tracking-tight sm:text-3xl">
                    <span class="border-b-2 border-accent/80 pb-1">{profile.name}</span>
                  </h1>
                  <p class="text-sm text-muted-foreground">{profile.title}</p>

                  <div class="flex items-center gap-2 text-xs text-muted-foreground">
                    <MapPin class="h-3.5 w-3.5" />
                    <span>{profile.location}</span>
                  </div>
                </div>
              </div>

              <Tooltip>
                <TooltipTrigger asChild>
                  <button
                    on:click={() => themeOverride.toggle()}
                    class="inline-flex h-9 w-9 items-center justify-center rounded-md hover:bg-accent hover:text-accent-foreground transition-transform duration-150 motion-reduce:transition-none active:scale-[0.98] hover:scale-[1.02] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                    aria-label="Toggle theme"
                  >
                    {#if resolvedIsDark}
                      <Moon class="h-4 w-4" />
                    {:else}
                      <Sun class="h-4 w-4" />
                    {/if}
                  </button>
                </TooltipTrigger>
                <TooltipContent>{resolvedIsDark ? "Light mode" : "Dark mode"}</TooltipContent>
              </Tooltip>
            </div>

            <p class="text-sm leading-6 sm:text-base">{@html profile.blurb}</p>

            <div class="flex flex-wrap gap-2">
              {#each profile.tags as t}
                <Badge variant="secondary">{t}</Badge>
              {/each}
            </div>
          </CardHeader>
        </div>

        <div use:reveal={{ delay: 180, y: 8 }}>
          <CardContent class="space-y-6">
            <Separator />

            <div class="grid gap-3 text-sm text-muted-foreground">
              <div class="flex items-start gap-2">
                <Spinner class="text-purple-500" />
                <p><span class="text-foreground">Now:</span> {@html profile.now}</p>
              </div>

              <div class="flex items-start gap-2">
                <History class="mt-0.5 h-4 w-4" />
                <p><span class="text-foreground">Previously:</span> {@html profile.previously}</p>
              </div>
            </div>

            <Separator />

            <div class="flex flex-wrap items-center gap-2">
              {#each links as link}
                <Tooltip>
                  <TooltipTrigger asChild>
                    <a
                      href={link.href}
                      target={isExternal(link.href) ? "_blank" : undefined}
                      rel="noreferrer"
                      class="inline-flex items-center gap-2 rounded-md border px-3 py-2 text-sm transition-transform duration-150 motion-reduce:transition-none hover:bg-accent hover:text-accent-foreground active:scale-[0.98] hover:scale-[1.01] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                    >
                      <svelte:component this={link.icon} class="h-4 w-4" />
                      <span>{link.label}</span>
                    </a>
                  </TooltipTrigger>
                  <TooltipContent>{link.hint}</TooltipContent>
                </Tooltip>
              {/each}
            </div>
          </CardContent>
        </div>
      </Card>
    </div>
  </div>
</main>