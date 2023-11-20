<script>
	// import Calendar from './calendar.svelte'
	import RangeCalendar from './rangeCalendar.svelte'
	import RangePicker from './rangePicker.svelte'
	import { createTabs, melt } from '@melt-ui/svelte'
	import { crossfade } from 'svelte/transition'
	import { cubicInOut } from 'svelte/easing'

	const {
		elements: { root, list, content, trigger },
		states: { value }
	} = createTabs({
		defaultValue: 'range'
	})

	const triggers = [
		{ id: 'range', title: 'Range Calendar (not working)' },
		{ id: 'picker', title: 'Date Range Picker (working)' }
	]

	const [send, receive] = crossfade({
		duration: 150,
		easing: cubicInOut
	})
</script>

<section use:melt={$root} class="max-w-[760px]">
	<div use:melt={$list} class="flex justify-start items-center space-x-6 text-lg tracking-tight mb-4">
		{#each triggers as triggerItem}
			<button
				use:melt={$trigger(triggerItem.id)}
				class={`relative col-span-1 grid place-content-center text-lg font-bold ${
					$value === triggerItem.id && 'bg-slate-2 duration-300'
				}`}>
				{triggerItem.title}
				{#if $value === triggerItem.id}
					<div
						in:send={{ key: 'trigger' }}
						out:receive={{ key: 'trigger' }}
						class="absolute -bottom-[1px] left-0 right-0 h-[1px] bg-slate-8" />
				{/if}
			</button>
		{/each}
	</div>
	<!-- <Calendar /> -->
	<div use:melt={$content('range')}>
		<RangeCalendar />
	</div>
	<div use:melt={$content('picker')}>
		<RangePicker />
	</div>
</section>
