<!-- src/routes/+page.svelte -->
<script lang="ts">
	import { reveal } from '$lib/actions/reveal';
	import { themeOverride } from '$lib/stores/theme';
	import { Badge } from '$lib/components/ui/badge';
	import { Separator } from '$lib/components/ui/separator';
	import { Avatar, AvatarFallback, AvatarImage } from '$lib/components/ui/avatar';
	import { Tooltip, TooltipContent, TooltipTrigger } from '$lib/components/ui/tooltip';
	import Spinner from '$lib/components/ui/spinner/spinner.svelte';
	import { Github, Linkedin, Mail, MapPin, History, Sun, Moon } from '@lucide/svelte';

	import { profile, links as rawLinks } from '$lib/data/profile';

	const iconMap = { Email: Mail, LinkedIn: Linkedin, GitHub: Github };
	const links = rawLinks.map((l) => ({ ...l, icon: iconMap[l.label as keyof typeof iconMap] }));

	function initials(name: string): string {
		return name
			.split(' ')
			.filter(Boolean)
			.slice(0, 2)
			.map((part) => part[0]?.toUpperCase())
			.join('');
	}

	function isExternal(href: string): boolean {
		return href.startsWith('http://') || href.startsWith('https://');
	}

	function systemIsDark(): boolean {
		return (
			typeof window !== 'undefined' && window.matchMedia?.('(prefers-color-scheme: dark)').matches
		);
	}

	$: resolvedIsDark = $themeOverride === null ? systemIsDark() : $themeOverride;
</script>

<svelte:head>
	<title>{profile.name}</title>
	<meta name="description" content={profile.blurb} />
</svelte:head>

<main class="min-h-screen bg-background text-foreground">
	<!-- Wider + more breathing room -->
	<div class="mx-auto max-w-3xl px-6 py-20 sm:py-28" use:reveal={{ delay: 30, y: 10 }}>
		<div use:reveal={{ delay: 80, y: 10 }}>
			<section
				class="transition-transform duration-200 hover:-translate-y-0.5 motion-reduce:transition-none"
			>
				<div use:reveal={{ delay: 120, y: 8 }}>
					<!-- More spacing in header -->
					<header class="space-y-8">
						<div class="flex items-start justify-between gap-6">
							<div class="flex items-center gap-5">
								<!-- Slightly bigger avatar -->
								<Avatar class="h-14 w-14">
									{#if profile.avatarUrl}
										<AvatarImage src={profile.avatarUrl} alt={profile.name} />
									{/if}
									<AvatarFallback>{initials(profile.name)}</AvatarFallback>
								</Avatar>

								<div class="space-y-2">
									<!-- Bigger H1 + a bit more spacing -->
									<h1 class="mb-3 text-3xl font-semibold tracking-tight sm:text-4xl">
										<span class="border-b-2 border-accent/80 pb-1">{profile.name}</span>
									</h1>

									<!-- Title slightly larger -->
									<p class="text-base text-muted-foreground">{profile.title}</p>

									<div class="flex items-center gap-2 text-sm text-muted-foreground">
										<MapPin class="h-4 w-4" />
										<span>{profile.location}</span>
									</div>
								</div>
							</div>
						</div>

						<!-- Blurb bigger + looser leading -->
						<p class="text-base leading-7 sm:text-lg sm:leading-8">
							{@html profile.blurb}
						</p>
					</header>
				</div>

				<div use:reveal={{ delay: 180, y: 8 }}>
					<!-- Content spaced out more -->
					<section class="mt-10 space-y-8">
						<Separator />

						<div class="grid gap-4 text-base text-muted-foreground">
							<div class="flex items-start gap-3">
								<Spinner class="text-purple-500" />
								<p>
									<span class="font-medium text-foreground">Now:</span>
									{@html profile.now}
								</p>
							</div>

							<div class="flex items-start gap-3">
								<History class="mt-0.5 h-4 w-4" />
								<p>
									<span class="font-medium text-foreground">Previously:</span>
									{@html profile.previously}
								</p>
							</div>
						</div>

						<Separator />

						<div class="flex flex-wrap items-center gap-3">
							{#each links as link}
								<Tooltip>
									<TooltipTrigger asChild>
										<a
											href={link.href}
											target={isExternal(link.href) ? '_blank' : undefined}
											rel="noreferrer"
											class="inline-flex items-center gap-2 rounded-md border px-4 py-2.5 text-base transition-transform duration-150 hover:scale-[1.01] hover:bg-accent hover:text-accent-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:outline-none active:scale-[0.98] motion-reduce:transition-none"
										>
											<svelte:component this={link.icon} class="h-4 w-4" />
											<span>{link.label}</span>
										</a>
									</TooltipTrigger>
									<TooltipContent>{link.hint}</TooltipContent>
								</Tooltip>
							{/each}
						</div>

						<footer class="pt-2">
							<Separator class="mb-4" />

							<div class="flex items-center justify-between gap-4">
								<p class="text-sm leading-6 text-muted-foreground">
									© {new Date().getFullYear()}
									<span class="font-medium text-accent">{profile.name}</span>. Built with SvelteKit
									+ Tailwind. Deployed on Vercel.
								</p>

								<Tooltip>
									<TooltipTrigger asChild>
										<button
											on:click={() => themeOverride.toggle()}
											class="inline-flex h-9 w-9 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:outline-none"
											aria-label="Toggle theme"
										>
											{#if resolvedIsDark}
												<Moon class="h-4 w-4" />
											{:else}
												<Sun class="h-4 w-4" />
											{/if}
										</button>
									</TooltipTrigger>
									<TooltipContent>
										{resolvedIsDark ? 'Switch to light mode' : 'Switch to dark mode'}
									</TooltipContent>
								</Tooltip>
							</div>
						</footer>
					</section>
				</div>
			</section>
		</div>
	</div>
</main>
