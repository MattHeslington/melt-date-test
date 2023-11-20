<script>
	import { mode, setMode } from 'mode-watcher'
	import { Moon, Sun } from 'lucide-svelte'
</script>

<header class="w-full flex items-center justify-between">
	<h1 class="text-xl font-semibold tracking-tight">MeltUI Date State Tests</h1>
	<button
		on:click={() => setMode($mode === 'dark' ? 'light' : 'dark')}
		class="h-9 w-9 border border-slate-6 rounded-md grid place-content-center">
		{#if $mode === 'dark'}
			<Sun size={20} />
		{:else}
			<Moon size={20} />
		{/if}
	</button>
</header>
