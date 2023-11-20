<script>
	import '../app.css'
	import '@fontsource-variable/inter'
	import { ModeWatcher } from 'mode-watcher'
	import Header from './header.svelte'
</script>

<ModeWatcher />

<main class="w-screen min-h-screen p-5">
	<Header />
	<slot />
</main>
