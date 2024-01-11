import { useEffect, useState } from 'react'
import { utilService } from '../../../../services/util.service'

export function Timeline({ defaultWidth, group, board }) {
	const [isHovered, setIsHovered] = useState(false)
	const [dates, setDates] = useState(getGroupDateSummary(group))

	useEffect(() => {
		setDates(getGroupDateSummary(group))
	}, [board])

	useEffect(() => {
		calculateDateProgress()
		getTimelineRange(dates)
	}, [dates])

	function getGroupDateSummary(group) {
		let dates = []
		const hasTimeline = group.tasks.some(task => task.date)

		if (!hasTimeline) return

		group.tasks.forEach(task => {
			const { date } = task

			if (!date) return
			if (dates.includes(date)) return
			dates.push(date)
		})
		const earliestDate = Math.min(...dates)
		const latestDate = Math.max(...dates)
		return {
			earliestDate,
			latestDate,
		}
	}

	function calculateDateProgress() {
		if (!dates) return 0
		const { earliestDate, latestDate } = dates
		if (isNaN(earliestDate) || isNaN(latestDate)) return
		const currentDate = Date.now()

		if (currentDate >= latestDate) {
			return `100%`
		}

		const totalDuration = latestDate - earliestDate || 1
		const timePassedSinceStart = currentDate - earliestDate
		const progress = (timePassedSinceStart / totalDuration) * 100
		const result = Math.round(progress)
		return `${result}%`
	}

	function getTimelineRange(dates) {
		if (!dates) return
		const { earliestDate, latestDate } = dates

		if (!utilService.isValidTimestamp(earliestDate) || !utilService.isValidTimestamp(latestDate)) return

		const startMonth = utilService.timeStampToDate(earliestDate).slice(0, 3)
		const endMonth = utilService.timeStampToDate(latestDate).slice(0, 3)

		const startDay = utilService.timeStampToDate(earliestDate).slice(4)
		const endDay = utilService.timeStampToDate(latestDate).slice(4)
		if (startMonth === endMonth) {
			if (startDay === endDay) {
				return `${startMonth} ${startDay}`
			}
			return ` ${startMonth} ${startDay}-${endDay}`
		} else {
			return `${startMonth} ${startDay} - ${endMonth} ${endDay}`
		}
	}

	function getTimestampInDays() {
		if (!dates) return
		const { earliestDate, latestDate } = dates
		const estTime = latestDate - earliestDate
		const days = utilService.millisecondsToDays(estTime)
		return days === 0 ? 1 : days
	}

	return (
		<li
			className="timeline-picker flex align-center justify-center pointer"
			onMouseEnter={() => setIsHovered(true)}
			onMouseLeave={() => setIsHovered(false)}
			style={{ width: defaultWidth }}
		>
			<div className="timeline-container">
				<div className="span-container flex align-center justify-center">
					<div
						className="progress"
						style={
							!dates
								? { backgroundColor: '#ABABAB' }
								: {
									background: `linear-gradient(to right, ${group.color} ${calculateDateProgress()}, #333333 ${calculateDateProgress()})`,
								}
						}
					>
						<span style={{ width: '50%' }}></span>
					</div>
					<span className="range-preview flex row justify-center">
						{!dates && <span>-</span>}
						{dates &&
							(isHovered ? <span>{getTimestampInDays()}d</span> : <span>{getTimelineRange(dates)}</span>)}
					</span>
				</div>
			</div>
		</li>
	)
}
