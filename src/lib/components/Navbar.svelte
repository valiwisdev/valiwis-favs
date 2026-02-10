<script lang="ts">
	import { page } from '$app/state';
	import { House, BookOpen, ScrollText, Sparkles } from 'lucide-svelte';

	let menuOpen = $state(false);
	

	const links = [
		{ href: '/', label: 'Home', icon: House },
		{ href: '/books', label: 'Books', icon: BookOpen },
		{ href: '/manhuas', label: 'Manhuas', icon: ScrollText },
		{ href: '/manhwas', label: 'Manhwas', icon: Sparkles }
	];

	function isActive(href: string): boolean {
		if (href === '/') return page.url.pathname === '/';
		return page.url.pathname.startsWith(href);
	}
</script>

<nav class="sticky top-0 z-50 mb-8 border-b border-pink/20 bg-mantle/70 backdrop-blur-xl md:mb-0">
	<div class="mx-auto flex max-w-4xl items-center justify-between px-6 py-3">

		<button
			onclick={() => (menuOpen = !menuOpen)}
			class="flex flex-col gap-1.5 rounded-xl p-2.5 text-pink transition-all duration-300 hover:bg-pink/10 hover:text-flamingo md:hidden"
			aria-label="Toggle menu"
		>
			<span
				class="block h-0.5 w-5 rounded-full bg-current transition-all duration-300
					{menuOpen ? 'translate-y-2 rotate-45' : ''}"
			></span>
			<span
				class="block h-0.5 w-5 rounded-full bg-current transition-all duration-300
					{menuOpen ? 'scale-0 opacity-0' : 'opacity-100'}"
			></span>
			<span
				class="block h-0.5 w-5 rounded-full bg-current transition-all duration-300
					{menuOpen ? '-translate-y-2 -rotate-45' : ''}"
			></span>
		</button>

		<ul class="hidden gap-2 md:flex md:flex-1 md:justify-center">
			{#each links as { href, label, icon: Icon }}
				<li>
					<a
						{href}
						class="group relative flex items-center gap-2 rounded-full px-5 py-2 text-sm font-medium tracking-wide transition-all duration-300
							{isActive(href)
							? 'bg-pink/15 text-pink shadow-md shadow-pink/10'
							: 'text-subtext1 hover:bg-flamingo/10 hover:text-flamingo'}"
					>
						<Icon size={16} class="transition-transform duration-300 group-hover:scale-110" />
						<span class="italic">{label}</span>
						{#if isActive(href)}
							<span
								class="absolute -bottom-1 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full bg-pink"
							></span>
						{/if}
					</a>
				</li>
			{/each}
		</ul>
	</div>

	{#if menuOpen}
		<div class="border-t border-pink/10 bg-mantle/95 backdrop-blur-xl md:hidden">
			<ul class="flex flex-col gap-1.5 px-4 py-3">
				{#each links as { href, label, icon: Icon }}
					<li>
						<a
							{href}
							onclick={() => (menuOpen = false)}
							class="group flex items-center gap-3 rounded-2xl px-5 py-3.5 text-sm font-medium tracking-wide transition-all duration-300
								{isActive(href)
								? 'bg-pink/15 text-pink shadow-md shadow-pink/10'
								: 'text-subtext1 hover:bg-flamingo/10 hover:text-flamingo'}"
						>
							<Icon size={18} class="transition-transform duration-300 group-hover:scale-110" />
							<span class="italic">{label}</span>
							{#if isActive(href)}
								<span class="ml-auto text-xs text-pink/60">♡</span>
							{/if}
						</a>
					</li>
				{/each}
			</ul>
		</div>
	{/if}
</nav>