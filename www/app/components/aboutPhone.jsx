import React from 'react'

import {Table, TableBody, TableRow, TableRowColumn} from 'material-ui/Table'

import Header from './header.jsx'

/**
 * Component to display device related information
 * using Device and Network information Cordova plugins
 * @author Guillaume Pouilloux <gui.pouilloux@gmail.com>
 */
const AboutPhone = React.createClass({

  render() {
    return (
      <div>
        <Header pageTitle="About the phone" />
          <Table selectable={false}>
          <TableBody displayRowCheckbox={false}>
              <TableRow>
                <TableRowColumn>Platform</TableRowColumn>
                <TableRowColumn>{window.device.platform}</TableRowColumn>
              </TableRow>
              <TableRow>
                <TableRowColumn>Version</TableRowColumn>
                <TableRowColumn>{window.device.version}</TableRowColumn>
              </TableRow>
              <TableRow>
                <TableRowColumn>UUID</TableRowColumn>
                <TableRowColumn>{window.device.uuid}</TableRowColumn>
              </TableRow>
              <TableRow>
                <TableRowColumn>Model</TableRowColumn>
                <TableRowColumn>{window.device.model}</TableRowColumn>
              </TableRow>
              <TableRow>
                <TableRowColumn>Connection</TableRowColumn>
                <TableRowColumn>{window.navigator.connection.type}</TableRowColumn>
              </TableRow>
            </TableBody>
          </Table>
      </div>
    )
  }
})

export default AboutPhone
