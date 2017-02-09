import React from 'react'
import { Link } from 'react-router'

import AppBar from 'material-ui/AppBar'
import Drawer from 'material-ui/Drawer'
import MenuItem from 'material-ui/MenuItem'

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
  },

  render() {
    return (
      <div>
        <AppBar
          title={this.props.pageTitle}
          iconClassNameRight="muidocs-icon-navigation-expand-more"
          onLeftIconButtonTouchTap={this._toggleMenu}/>
        <Drawer open={this.state.isMenuOpen} onRequestChange={this._handleDrawerRequestChange}>
          <Link to="/">
            <MenuItem onTouchTap={this._closeMenu}>Conférence</MenuItem>
          </Link>
          <Link to="/sessions">
            <MenuItem onTouchTap={this._closeMenu}>Sessions</MenuItem>
          </Link>
          <Link to="/speakers">
            <MenuItem onTouchTap={this._closeMenu}>Présentateurs</MenuItem>
          </Link>
        </Drawer>
      </div>
    )
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
