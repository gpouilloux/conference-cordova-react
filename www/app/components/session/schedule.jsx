import React from 'react'
import renderHTML from 'react-render-html'
import {Timeline, TimelineEvent} from 'react-event-timeline'
import moment from 'moment'

import FlatButton from 'material-ui/FlatButton'
import Snackbar from 'material-ui/Snackbar'

import Header from '../header.jsx'

/**
 * Component to schedule events for a conference
 * @author Guillaume Pouilloux <gui.pouilloux@gmail.com>
 */
const Schedule = React.createClass({

  getInitialState() {
    return {
      openSuccessCreatedEvent: false,
      openFailCreatedEvent: false,
      openSuccessDeletedEvent: false,
      openFailDeletedEvent: false
    }
  },

  propTypes: {
    sessions: React.PropTypes.array.isRequired,
    fetchSessions: React.PropTypes.func.isRequired,
    setAttendedSession: React.PropTypes.func.isRequired
  },

  componentDidMount() {
    this.props.fetchSessions()
    this._listExistingEvents()
  },

  render() {
    const snackbarAutoHideDuration = 4000

    const sessionsComponent = this.props.sessions.map(session => {
      session.isAttended = session.isAttended
      const iconCalendar = session.isAttended ? 'fa-calendar-check-o' : 'fa-calendar-o'

      return (
        <TimelineEvent key={session.id}
                       title={session.title}
                       createdAt={`${session.time.start.format('HH:mm')} - ${session.time.end.format('HH:mm')} (${session.time.end.diff(session.time.start, 'minutes')} minutes)`}
                       icon={<i className={`fa ${iconCalendar}`} style={{marginTop: '2px', marginLeft: '2px'}} aria-hidden='true'/>}
                       iconColor={session.isAttended ? '#000000' : '#7bb1ea'}
                       contentStyle={{color: '#000000'}}
                       container='card'
                       onTouchTap={() => this._onTouchEvent(session)}
                      >
          {renderHTML(`<div style='max-height:100px; text-overflow: ellipsis; overflow: hidden'>${session.desc || ''}</div>`)}
        </TimelineEvent>
      )
    })

    return (
      <div>
        <Header pageTitle='Schedule'
          iconElementRight={<FlatButton label='Save' />}
          onRightIconButtonTouchTap={this._onSaveSchedule}
        />
        <Timeline>
          {sessionsComponent}
        </Timeline>
        <Snackbar
          open={this.state.openSuccessCreatedEvent}
          message='This event has been added to your calendar'
          autoHideDuration={snackbarAutoHideDuration}
          onRequestClose={() => this.setState({openSuccessCreatedEvent: false})}
        />
        <Snackbar
          open={this.state.openFailCreatedEvent}
          message='Sorry, we were unable to add this event in your calendar'
          autoHideDuration={snackbarAutoHideDuration}
          onRequestClose={() => this.setState({openFailCreatedEvent: false})}
        />
        <Snackbar
          open={this.state.openSuccessDeletedEvent}
          message='This event has been deleted from your calendar'
          autoHideDuration={snackbarAutoHideDuration}
          onRequestClose={() => this.setState({openSuccessDeletedEvent: false})}
        />
        <Snackbar
          open={this.state.openFailDeletedEvent}
          message='Sorry, we were unable to delete this event from your calendar'
          autoHideDuration={snackbarAutoHideDuration}
          onRequestClose={() => this.setState({openFailDeletedEvent: false})}
        />
      </div>
    )
  },

  //////////////////////
  // PRIVATE          //
  //////////////////////

  _onSaveSchedule() {
    //console.log('TODO save')
  },

  _onTouchEvent(session) {
    if (session.isAttended) {
      // delete the event
      const onSuccessDeletedEvent = () => {
        this.setState({openSuccessDeletedEvent: true})
        this.props.setAttendedSession(session.id, false)
      }
      const onFailDeletedEvent = () => this.setState({openFailDeletedEvent: true})

      window.plugins.calendar.deleteEvent(session.title, session.confRoom,
        session.desc, session.time.start.toDate(), session.time.end.toDate(),
        onSuccessDeletedEvent, onFailDeletedEvent)

    } else {
      // create the event
      const onSuccessCreatedEvent = () => {
        this.setState({openSuccessCreatedEvent: true})
        this.props.setAttendedSession(session.id, true)
      }
      const onFailCreatedEvent = () => this.setState({openFailCreatedEvent: true})

      window.plugins.calendar.createEvent(session.title, session.confRoom,
        session.desc, session.time.start.toDate(), session.time.end.toDate(),
        onSuccessCreatedEvent, onFailCreatedEvent)
    }
  },

  _listExistingEvents() {
    const onSuccessListEvents = events => {
      events.forEach(event => {
        const sessionFromEvent = this.props.sessions.filter(session => session.title === event.title)[0]
        if (sessionFromEvent) {
          this.props.setAttendedSession(sessionFromEvent.id, true)
        }
      })
    }

    const now = moment().hours(0).minutes(0).seconds(0).milliseconds(0)
    window.plugins.calendar.listEventsInRange(now.toDate(), now.add(1, 'days').toDate(),
      onSuccessListEvents)
  }

})

export default Schedule
