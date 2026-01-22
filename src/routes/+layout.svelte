<script lang="ts">
	import './layout.css';
	import { TooltipProvider } from "$lib/components/ui/tooltip";
 
	// subscribe to ensure theme is applied on navigation as well
	// theme.subscribe(() => {});

	let { children } = $props();
</script>

<svelte:head><link rel="icon" type="image/png" href="/favicon.png" /></svelte:head>
<TooltipProvider>{@render children()}</TooltipProvider>
