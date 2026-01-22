<script lang="ts">
	import './layout.css';
	import { TooltipProvider } from '$lib/components/ui/tooltip';
	import { profile } from '$lib/data/profile';

	function stripHtml(input: string): string {
		return input.replace(/<[^>]*>/g, '').replace(/\s+/g, ' ').trim();
	}

	const title = profile.name;
	const description = stripHtml(profile.blurb);
	const ogImageUrl = 'https://kimlindberg.com/og.png';
	const siteUrl = 'https://kimlindberg.com/';
	const ogImageWidth = 1200;
	const ogImageHeight = 630;

	let { children } = $props();
</script>

<svelte:head>
	<title>{title}</title>
	<meta name="description" content={description} />

	<!-- Open Graph -->
	<meta property="og:title" content={title} />
	<meta property="og:description" content={description} />
	<meta property="og:type" content="website" />
	<meta property="og:url" content={siteUrl} />
	<meta property="og:image" content={ogImageUrl} />
	<meta property="og:image:width" content={String(ogImageWidth)} />
	<meta property="og:image:height" content={String(ogImageHeight)} />

	<!-- Twitter / X -->
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:title" content={title} />
	<meta name="twitter:description" content={description} />
	<meta name="twitter:image" content={ogImageUrl} />

	<link rel="icon" type="image/png" href="/favicon.png" />
</svelte:head>

<TooltipProvider>{@render children()}</TooltipProvider>
