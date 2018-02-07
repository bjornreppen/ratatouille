import React, { PureComponent } from 'react'
import { List, ListItem, Avatar } from 'material-ui'

export default class Kontrollpanel extends PureComponent {
  renderLayerControl(name) {
    const color = this.props.color[name]
    const visible = this.props.visibility[name]
    const style = !visible ? { color: 'rgba(0,0,0,0.26)' } : {}
    return (
      <ListItem
        primaryText={name}
        key={name}
        secondaryText={this.props.kode}
        rightAvatar={<Avatar backgroundColor={color} />}
        style={style}
        onClick={e => {
          this.props.onVisibilityChange(name, !visible)
        }}
      />
    )
  }
  //            onChange={(e)=>this.props.onColorChange(name,e)}

  render() {
    return (
      <List>
        {this.props.categories &&
          this.props.categories.map(name => this.renderLayerControl(name))}
      </List>
    )
  }
}