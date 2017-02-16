import React from 'react'
import renderHTML from 'react-render-html'
import {Timeline, TimelineEvent} from 'react-event-timeline'

import FlatButton from 'material-ui/FlatButton'

import Header from '../header.jsx'

/**
 * Component to schedule events for a conference
 * @author Guillaume Pouilloux <gui.pouilloux@gmail.com>
 */
const Schedule = React.createClass({

  propTypes: {
    sessions: React.PropTypes.array.isRequired,
    fetchSessions: React.PropTypes.func.isRequired
  },

  componentDidMount() {
    this.props.fetchSessions()
  },

  render() {
    const sessionsComponent = this.props.sessions.map(session => {
      return (
        <TimelineEvent title={session.title}
                       createdAt={`${session.time.start.format('HH:mm')} - ${session.time.end.format('HH:mm')} (${session.time.end.diff(session.time.start, 'minutes')} minutes)`}
                       icon={<i className='fa fa-calendar-o' style={{marginTop: '2px', marginLeft: '2px'}} aria-hidden='true'/>}
                       iconColor='#000000'
                       contentStyle={{color: '#000000'}}
                       container='card'
                       onTouchTap={() => console.log('timeline event touched')}
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
      </div>
    )
  },

  //////////////////////
  // PRIVATE          //
  //////////////////////

  _onSaveSchedule() {
    console.log('TODO save')
  }

})

export default Schedule
