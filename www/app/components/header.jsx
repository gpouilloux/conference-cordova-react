import React from 'react'
import { hashHistory } from 'react-router'

import LinkWithoutUnderline from './custom/linkWithoutUnderline.jsx'
import AppBar from 'material-ui/AppBar'
import Drawer from 'material-ui/Drawer'
import MenuItem from 'material-ui/MenuItem'
import IconButton from 'material-ui/IconButton'
import NavigationClose from 'material-ui/svg-icons/navigation/close'

/**
 * Header component
 * @author Guillaume Pouilloux <gui.pouilloux@gmail.com>
 */
const Header = React.createClass({

  getInitialState() {
    return {
      isMenuOpen: false
    }
  },

  propTypes: {
    pageTitle: React.PropTypes.string.isRequired,
    hasReturnButton: React.PropTypes.bool
  },

  render() {
    const appBar =
    <div>
      <AppBar
        title={this.props.pageTitle}
        iconClassNameRight="muidocs-icon-navigation-expand-more"
        onLeftIconButtonTouchTap={this._toggleMenu}/>
      <Drawer open={this.state.isMenuOpen} onRequestChange={this._handleDrawerRequestChange}>
        <LinkWithoutUnderline to="/">
          <MenuItem onTouchTap={this._closeMenu}>Conference</MenuItem>
        </LinkWithoutUnderline>
        <LinkWithoutUnderline to="/sessions">
          <MenuItem onTouchTap={this._closeMenu}>Sessions</MenuItem>
        </LinkWithoutUnderline>
        <LinkWithoutUnderline to="/speakers">
          <MenuItem onTouchTap={this._closeMenu}>Speakers</MenuItem>
        </LinkWithoutUnderline>
        <LinkWithoutUnderline to="/aboutPhone">
          <MenuItem onTouchTap={this._closeMenu}>About the phone</MenuItem>
        </LinkWithoutUnderline>
      </Drawer>
    </div>

    const appBarWithReturn =
      <AppBar
          title={this.props.pageTitle}
          iconElementLeft={<IconButton><NavigationClose /></IconButton>}
          onLeftIconButtonTouchTap={hashHistory.goBack}
        />

    return this.props.hasReturnButton ? appBarWithReturn : appBar
  },

  //////////////////////
  // PRIVATE          //
  //////////////////////

  _toggleMenu() {
    this.setState({
      isMenuOpen: !this.state.isMenuOpen
    })
  },

  _closeMenu() {
    this.setState({
      isMenuOpen: false
    })
  },

  _handleDrawerRequestChange(open) {
    this.setState({
      isMenuOpen: open
    })
  }
})

export default Header
