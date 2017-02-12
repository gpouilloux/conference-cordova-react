import React from 'react'

/**
 * Social icons relative to a speaker
 * @author Guillaume Pouilloux <gui.pouilloux@gmail.com>
 */
const SocialIcons = React.createClass({

  propTypes: {
    socialIcons: React.PropTypes.array.isRequired
  },

  render() {
    const socialIcons = this.props.socialIcons.map(socialIcon => {
      return (
        <a key={socialIcon.class} href={socialIcon.link} target='_blank' style={{color: 'black', margin: '10px'}}>
          <i className={`fa ${this._socialNameToIcon[socialIcon.class]} aria-hidden='true' `} />
        </a>
      )
    })

    return (
      <div style={{marginTop: '10px'}}>
        {socialIcons}
      </div>
    )
  },

  //////////////////////
  // PRIVATE          //
  //////////////////////

  _socialNameToIcon: {
    'facebook': 'fa-facebook',
    'google-plus': 'fa-google-plus',
    'twitter': 'fa-twitter',
    'linkedin': 'fa-linkedin',
    'github': 'fa-github',
    'link': 'fa-external-link'
  }

})

export default SocialIcons
