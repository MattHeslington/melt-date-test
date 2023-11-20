<script>
	import { createRangeCalendar, melt } from '@melt-ui/svelte'
	import { ChevronRight, ChevronLeft } from 'lucide-svelte'

	const updateFunction = ({ curr, prev }) => {
		alert('rangeCalendar changed')
		return curr
	}

	const {
		elements: { calendar, heading, grid, cell, prevButton, nextButton },
		states: { months, headingValue, daysOfWeek, value },
		helpers: { isDateDisabled, isDateUnavailable }
	} = createRangeCalendar({
		fixedWeeks: true,
		numberOfMonths: 2,
		onValueChange: updateFunction
	})
</script>

<div>Selected dates</div>
<div class="bg-slate-2 border border-slate-6 w-[216px] h-8 rounded-md mb-4 mt-2 flex justify-center items-center">
	{#if $value.start && $value.end}
		<span>{$value.start.toString()}</span>
		<span>{$value.end.toString()}</span>
	{/if}
</div>

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

<pre>
    <code class="language-js">
        {`const updateFunction = ({ curr, prev }) => {
		    alert('rangeCalendar changed')
		    return curr
	    }

        const {
            elements: { calendar, heading, grid, cell, prevButton, nextButton },
            states: { months, headingValue, daysOfWeek, value },
            helpers: { isDateDisabled, isDateUnavailable }
        } = createRangeCalendar({
            fixedWeeks: true,
            numberOfMonths: 2,
            onValueChange: updateFunction
        })
`}
    </code>
</pre>

<style lang="postcss">
	[data-melt-calendar] {
		@apply w-full rounded-md bg-slate-2 p-3 text-slate-12 shadow-sm border border-slate-6;
	}

	header {
		@apply flex items-center justify-between pb-2 h-12;
	}

	header + div {
		@apply flex flex-col items-center gap-6 md:flex-row;
	}

	[data-melt-calendar-prevbutton] {
		@apply rounded-md p-1 transition-all hover:bg-slate-7;
	}

	[data-melt-calendar-nextbutton] {
		@apply rounded-md p-1 transition-all hover:bg-slate-7;
	}

	[data-melt-calendar-prevbutton][data-disabled] {
		@apply pointer-events-none rounded-md p-1 opacity-40;
	}

	[data-melt-calendar-nextbutton][data-disabled] {
		@apply pointer-events-none rounded-md p-1 opacity-40;
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
		@apply flex h-12 w-12 cursor-pointer select-none items-center justify-center rounded-lg p-4 hover:bg-slate-7  
        /* focus:ring focus:ring-blue-7; */;
	}

	[data-melt-calendar-cell][data-highlighted] {
		@apply bg-slate-10;
	}

	[data-melt-calendar-cell][data-range-highlighted] {
		@apply bg-slate-10;
	}

	[data-melt-calendar-cell][data-disabled] {
		@apply pointer-events-none opacity-40;
	}

	[data-melt-calendar-cell][data-unavailable] {
		@apply pointer-events-none text-red-400 line-through;
	}

	[data-melt-calendar-cell][data-selected] {
		@apply bg-slate-9 text-slate-12;
	}

	[data-melt-calendar-cell][data-outside-visible-months] {
		@apply pointer-events-none cursor-default opacity-40 hover:bg-transparent;
	}

	[data-melt-calendar-cell][data-outside-month] {
		@apply pointer-events-none cursor-default opacity-0 hover:bg-transparent;
	}
</style>
