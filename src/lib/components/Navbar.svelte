<script lang="ts">
	import { page } from '$app/state';
	import { House, BookOpen, ScrollText, Sparkles, LibraryBig } from 'lucide-svelte';

	let menuOpen = $state(false);

	const links = [
		{ href: '/books', label: 'Books', icon: BookOpen, color: 'pink' },
		{ href: '/manhuas', label: 'Manhuas', icon: ScrollText, color: 'flamingo' },
		{ href: '/manhwas', label: 'Manhwas', icon: Sparkles, color: 'mauve' },
		{ href: '/library', label: 'Library', icon: LibraryBig, color: 'teal' }
	];

	function isActive(href: string): boolean {
		if (href === '/') return page.url.pathname === '/';
		return page.url.pathname.startsWith(href);
	}

	const colorMap: Record<string, { active: string; hover: string; dot: string; text: string }> = {
		pink: {
			active: 'bg-pink/12 text-pink shadow-lg shadow-pink/8 ring-1 ring-pink/20',
			hover: 'hover:bg-pink/8 hover:text-pink',
			dot: 'bg-pink',
			text: 'text-pink/50'
		},
		flamingo: {
			active: 'bg-flamingo/12 text-flamingo shadow-lg shadow-flamingo/8 ring-1 ring-flamingo/20',
			hover: 'hover:bg-flamingo/8 hover:text-flamingo',
			dot: 'bg-flamingo',
			text: 'text-flamingo/50'
		},
		mauve: {
			active: 'bg-mauve/12 text-mauve shadow-lg shadow-mauve/8 ring-1 ring-mauve/20',
			hover: 'hover:bg-mauve/8 hover:text-mauve',
			dot: 'bg-mauve',
			text: 'text-mauve/50'
		},
		teal: {
			active: 'bg-teal/12 text-teal shadow-lg shadow-teal/8 ring-1 ring-teal/20',
			hover: 'hover:bg-teal/8 hover:text-teal',
			dot: 'bg-teal',
			text: 'text-teal/50'
		}
	};
</script>

<nav class="top-0 z-50 relative mb-8 md:mb-0">
	<div class="bg-mantle/60 backdrop-blur-2xl">
		<div class="mx-auto flex max-w-4xl items-center justify-between px-6 py-3.5">

			<button
				onclick={() => (menuOpen = !menuOpen)}
				class="flex flex-col gap-1.5 rounded-xl p-2.5 text-pink/70 transition-all duration-300 hover:bg-pink/8 hover:text-pink md:hidden"
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

			<!-- Desktop nav -->
			<div class="hidden md:flex md:flex-1 md:items-center">
				<ul class="flex flex-1 justify-end gap-1">
					{#each links.slice(0, 2) as { href, label, icon: Icon, color }}
						{@const c = colorMap[color]}
						<li>
							<a
								{href}
								class="group relative flex items-center gap-2.5 rounded-xl px-4 py-2 text-sm font-medium tracking-wide transition-all duration-300
									{isActive(href)
									? c.active
									: `text-subtext0 ${c.hover}`}"
							>
								<Icon size={15} class="transition-transform duration-300 group-hover:scale-110" />
								<span class="italic">{label}</span>
								{#if isActive(href)}
									<span
										class="absolute -bottom-1.5 left-1/2 h-0.5 w-4 -translate-x-1/2 rounded-full {c.dot} opacity-80"
									></span>
								{/if}
							</a>
						</li>
					{/each}
				</ul>

				<a
					href="/"
					class="group relative mx-6 flex items-center justify-center rounded-2xl p-3 transition-all duration-300
						{isActive('/')
						? 'bg-pink/12 text-pink shadow-lg shadow-pink/10 ring-1 ring-pink/25'
						: 'text-subtext0 ring-1 ring-surface1/50 hover:bg-pink/8 hover:text-pink hover:ring-pink/20'}"
				>
					<House size={18} class="transition-transform duration-300 group-hover:scale-110 group-hover:rotate-[-8deg]" />
					{#if isActive('/')}
						<span
							class="absolute -bottom-1.5 left-1/2 h-0.5 w-4 -translate-x-1/2 rounded-full bg-pink opacity-80"
						></span>
					{/if}
				</a>

				<ul class="flex flex-1 gap-1">
					{#each links.slice(2) as { href, label, icon: Icon, color }}
						{@const c = colorMap[color]}
						<li>
							<a
								{href}
								class="group relative flex items-center gap-2.5 rounded-xl px-4 py-2 text-sm font-medium tracking-wide transition-all duration-300
									{isActive(href)
									? c.active
									: `text-subtext0 ${c.hover}`}"
							>
								<Icon size={15} class="transition-transform duration-300 group-hover:scale-110" />
								<span class="italic">{label}</span>
								{#if isActive(href)}
									<span
										class="absolute -bottom-1.5 left-1/2 h-0.5 w-4 -translate-x-1/2 rounded-full {c.dot} opacity-80"
									></span>
								{/if}
							</a>
						</li>
					{/each}
				</ul>
			</div>
		</div>
	</div>

	{#if menuOpen}
		<div class="border-t border-surface1/30 bg-mantle/95 backdrop-blur-2xl md:hidden">
			<ul class="flex flex-col gap-1 px-4 py-3">
				<li>
					<a
						href="/"
						onclick={() => (menuOpen = false)}
						class="group flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium tracking-wide transition-all duration-300
							{isActive('/')
							? 'bg-pink/12 text-pink shadow-md shadow-pink/8 ring-1 ring-pink/20'
							: 'text-subtext0 hover:bg-pink/8 hover:text-pink'}"
					>
						<div class="flex h-8 w-8 items-center justify-center rounded-lg bg-pink/8">
							<House size={16} class="transition-transform duration-300 group-hover:scale-110" />
						</div>
						<span class="italic">Home</span>
						{#if isActive('/')}
							<span class="ml-auto text-[10px] tracking-wider text-pink/40">&#9679;</span>
						{/if}
					</a>
				</li>
				{#each links as { href, label, icon: Icon, color }}
					{@const c = colorMap[color]}
					<li>
						<a
							{href}
							onclick={() => (menuOpen = false)}
							class="group flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium tracking-wide transition-all duration-300
								{isActive(href)
								? c.active
								: `text-subtext0 ${c.hover}`}"
						>
							<div class="flex h-8 w-8 items-center justify-center rounded-lg {isActive(href) ? `bg-${color}/15` : 'bg-surface0/50'}">
								<Icon size={16} class="transition-transform duration-300 group-hover:scale-110" />
							</div>
							<span class="italic">{label}</span>
							{#if isActive(href)}
								<span class="ml-auto text-[10px] tracking-wider {c.text}">&#9679;</span>
							{/if}
						</a>
					</li>
				{/each}
			</ul>
		</div>
	{/if}

	<!-- Gradient underline -->
	<div class="h-px w-full bg-linear-to-r from-transparent via-pink/25 to-transparent"></div>
</nav>