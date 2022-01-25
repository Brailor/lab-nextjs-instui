import React from 'react'
import {Calendar} from '@instructure/ui-calendar'
import {IconButton}from '@instructure/ui-buttons'
import moment from 'moment'


class Example extends React.Component {
    state = {
      todayDate: new Date().toISOString(),
      renderedDate: new Date().toISOString()
    }
  
    generateMonth = () => {
      const date = parseDate(this.state.renderedDate)
        .startOf('month')
        .startOf('week')
  
      return Array.apply(null, Array(Calendar.DAY_COUNT)).map(() => {
        const currentDate = date.clone()
        date.add(1, 'days')
        return currentDate
      })
    }
  
    renderWeekdayLabels = () => {
      const date = parseDate(this.state.renderedDate).startOf('week')
  
      return Array.apply(null, Array(7)).map(() => {
        const currentDate = date.clone()
        date.add(1, 'day')
  
        return (
          <span alt={currentDate.format('dddd')}>
            {currentDate.format('dd')}
          </span>
        )
      })
    }
  
    handleRenderNextMonth = (event) => {
      this.modifyRenderedMonth(1)
    }
  
    handleRenderPrevMonth = (event) => {
      this.modifyRenderedMonth(-1)
    }
  
    modifyRenderedMonth = (step) => {
      this.setState(({ renderedDate }) => {
        const date = parseDate(renderedDate)
        date.add(step, 'month')
        return { renderedDate: date.toISOString() }
      })
    }
  
    renderDay (date) {
      const {
        renderedDate,
        todayDate,
      } = this.state
  
      return (
        <Calendar.Day
          key={date.toISOString()}
          date={date.toISOString()}
          isOutsideMonth={!date.isSame(renderedDate, 'month')}
          isToday={date.isSame(todayDate, 'day')}
          label={`${date.format('D')} ${date.format('MMMM')} ${date.format('YYYY')}`}
        >
          {date.format('D')}
        </Calendar.Day>
      )
    }
  
    render () {
      const date = parseDate(this.state.renderedDate)
  
      const buttonProps = (type = 'prev') => ({
        size: 'small',
        withBackground: false,
        withBorder: false,
        renderIcon: type === 'prev'
          ? <IconButton color="primary" />
          : <IconButton color="primary" />,
        screenReaderLabel: type === 'prev' ? 'Previous month' : 'Next month'
      })
  
      return (
        <Calendar
          renderPrevMonthButton={<IconButton {...buttonProps('prev')} />}
          renderNextMonthButton={<IconButton {...buttonProps('next')} />}
          renderNavigationLabel={
            <span>
              <div>{date.format('MMMM')}</div>
              <div>{date.format('YYYY')}</div>
            </span>
          }
          renderWeekdayLabels={this.renderWeekdayLabels()}
          onRequestRenderNextMonth={this.handleRenderNextMonth}
          onRequestRenderPrevMonth={this.handleRenderPrevMonth}
        >
          {this.generateMonth().map(date => this.renderDay(date))}
        </Calendar>
      )
    }
  }

const locale = 'en-us'
const timezone = 'America/Denver'

const parseDate = (dateStr) => {
    // return dateStr
  return moment.tz(dateStr, [moment.ISO_8601], locale, timezone)
}

export default Example