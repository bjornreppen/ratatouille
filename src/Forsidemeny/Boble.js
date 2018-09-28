import { withRouter } from 'react-router'
import { withStyles } from '@material-ui/core'
import React from 'react'
import BildeAvatar from '../Kodetre/Kodeliste/Bildeavatar'
import classNames from 'classnames'

const styles = {
  rot: {
    padding: 8,
    textAlign: 'center',
  },
  hover: {
    backgroundColor: 'hsla(0, 0%, 0%, 0.03)',
  },
  hovernot: {},
}

class Boble extends React.Component {
  handleMouseEnter = () => this.setState({ hover: true })
  handleMouseLeave = () => this.setState({ hover: false })
  state = { hover: false }
  render() {
    const { kode, tittel, classes, history } = this.props
    return (
      <div
        onMouseEnter={this.handleMouseEnter}
        onMouseLeave={this.handleMouseLeave}
        onClick={() => history.push('/katalog/' + kode)}
        className={classNames(
          classes.rot,
          this.state.hover ? classes.hover : classes.hovernot
        )}
      >
        <div style={{ display: 'inline-block', paddingBottom: 8 }}>
          <BildeAvatar kode={kode} />
        </div>
        <div style={{}}>{tittel}</div>
      </div>
    )
  }
}
export default withRouter(withStyles(styles)(Boble))