<script>
	import { fade } from 'svelte/transition'
	import { createDateRangePicker, melt } from '@melt-ui/svelte'
	import { ChevronRight, ChevronLeft, Calendar } from 'lucide-svelte'

	const updateFunction = ({ curr, prev }) => {
		console.log('rangePicker current', curr)
		console.log('rangePicker prev', prev)
		return curr
	}

	const {
		elements: { calendar, heading, grid, cell, field, prevButton, nextButton, endSegment, startSegment, trigger, content, label },
		states: { months, headingValue, daysOfWeek, segmentContents, open },
		options: { locale },
		helpers: { isDateDisabled, isDateUnavailable }
	} = createDateRangePicker({
		forceVisible: true,
		onValueChange: updateFunction
	})
</script>

<div>
	<span use:melt={$label}>Date</span>
	<div use:melt={$field}>
		{#key $locale}
			{#each $segmentContents.start as seg}
				<div use:melt={$startSegment(seg.part)}>
					{seg.value}
				</div>
			{/each}
		{/key}
		<div aria-hidden="true" class="separator">-</div>
		{#key $locale}
			{#each $segmentContents.end as seg}
				<div use:melt={$endSegment(seg.part)}>
					{seg.value}
				</div>
			{/each}
		{/key}
		<div>
			<button use:melt={$trigger}>
				<Calendar size={16} />
			</button>
		</div>
	</div>
</div>
{#if $open}
	<div transition:fade={{ duration: 100 }} use:melt={$content}>
		<div use:melt={$calendar}>
			<header>
				<button use:melt={$prevButton}>
					<ChevronLeft size={24} />
				</button>
				<div use:melt={$heading}>
					{$headingValue}
				</div>
				<button use:melt={$nextButton}>
					<ChevronRight size={24} />
				</button>
			</header>
			<div>
				{#each $months as month}
					<table use:melt={$grid}>
						<thead aria-hidden="true">
							<tr>
								{#each $daysOfWeek as day}
									<th>
										<div>
											{day}
										</div>
									</th>
								{/each}
							</tr>
						</thead>
						<tbody>
							{#each month.weeks as weekDates}
								<tr>
									{#each weekDates as date}
										<td role="gridcell" aria-disabled={$isDateDisabled(date) || $isDateUnavailable(date)}>
											<div use:melt={$cell(date, month.value)}>
												{date.day}
											</div>
										</td>
									{/each}
								</tr>
							{/each}
						</tbody>
					</table>
				{/each}
			</div>
		</div>
	</div>
{/if}

<pre>
    <code class="language-js">
        {`
    const updateFunction = ({ curr, prev }) => {
        console.log('rangePicker current', curr)
        console.log('rangePicker prev', prev)
        return curr
    }

	const {
		elements: { calendar, heading, grid, cell, field, prevButton, nextButton, endSegment, startSegment, trigger, content, label },
		states: { months, headingValue, daysOfWeek, segmentContents, open },
		options: { locale },
		helpers: { isDateDisabled, isDateUnavailable }
	} = createDateRangePicker({
		forceVisible: true,
		onValueChange: updateFunction
	})
        `}

    </code>
</pre>

<style lang="postcss">
	section {
		@apply flex w-full flex-col items-center gap-3;
	}

	[data-melt-datefield-field] div:last-of-type {
		@apply ml-4 flex w-full items-center justify-end;
	}

	[data-melt-popover-content] {
		@apply z-10 min-w-[320px] rounded-lg shadow-sm;
	}

	[data-melt-popover-trigger] {
		@apply rounded-md bg-slate-1 p-1  transition-all hover:bg-slate-7;
	}

	[data-melt-datefield-label] {
		@apply font-medium;
	}

	[data-melt-datefield-label][data-invalid] {
		@apply text-red-500;
	}

	[data-melt-datefield-field] {
		@apply mt-0.5 flex w-full min-w-[160px] items-center rounded-lg border border-slate-6 p-1.5 shadow-md;
	}

	[data-melt-datefield-field] .separator {
		@apply px-2;
	}

	[data-melt-datefield-field][data-invalid] {
		@apply border-red-400;
	}

	[data-melt-datefield-segment][data-invalid] {
		@apply text-red-500;
	}

	[data-melt-datefield-segment]:not([data-segment='literal']) {
		@apply px-0.5;
	}

	[data-melt-datefield-validation] {
		@apply self-start text-red-500;
	}

	[data-melt-calendar] {
		@apply w-full rounded-lg bg-slate-2 border border-slate-6 p-3 shadow-sm;
	}

	header {
		@apply flex items-center justify-between pb-2;
	}

	header + div {
		@apply flex items-center gap-6;
	}

	[data-melt-calendar-prevbutton] {
		@apply rounded-lg p-1 transition-all hover:bg-slate-6;
	}

	[data-melt-calendar-nextbutton] {
		@apply rounded-lg p-1 transition-all hover:bg-slate-6;
	}

	[data-melt-calendar-prevbutton][data-disabled] {
		@apply pointer-events-none rounded-lg p-1 opacity-40;
	}

	[data-melt-calendar-nextbutton][data-disabled] {
		@apply pointer-events-none rounded-lg p-1 opacity-40;
	}

	[data-melt-calendar-heading] {
		@apply font-semibold;
	}

	th {
		@apply text-sm font-semibold;

		& div {
			@apply flex h-6 w-6 items-center justify-center p-4;
		}
	}

	[data-melt-calendar-grid] {
		@apply w-full;
	}

	[data-melt-calendar-cell] {
		@apply flex h-6 w-6 cursor-pointer select-none items-center justify-center rounded-lg p-4 hover:bg-slate-6 focus:ring focus:ring-blue-400;
	}

	[data-melt-calendar-cell][data-highlighted] {
		@apply bg-blue-200;
	}

	[data-melt-calendar-cell][data-range-highlighted] {
		@apply bg-blue-200;
	}

	[data-melt-calendar-cell][data-disabled] {
		@apply pointer-events-none opacity-40;
	}

	[data-melt-calendar-cell][data-unavailable] {
		@apply pointer-events-none text-red-400 line-through;
	}

	[data-melt-calendar-cell][data-selected] {
		@apply bg-slate-7;
	}

	[data-melt-calendar-cell][data-outside-visible-months] {
		@apply pointer-events-none cursor-default opacity-40 hover:bg-transparent;
	}

	[data-melt-calendar-cell][data-outside-month] {
		@apply pointer-events-none cursor-default opacity-0 hover:bg-transparent;
	}
</style>
