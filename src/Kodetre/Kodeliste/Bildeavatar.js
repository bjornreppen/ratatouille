import typesystem from "@artsdatabanken/typesystem";
import { Avatar } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import React, { Component } from "react";
import config from "../../config";

const styles = {
  img: {
    objectFit: "contain",
    filter: "drop-shadow(1px 1px 1px #666)"
  },
  big: {},
  small: { width: 24, height: 24, fontSize: 13 },
  big_noborder: {
    borderRadius: 0,
    paddingBottom: 2
  },
  small_noborder: {
    borderRadius: 0,
    width: 24,
    height: 24,
    fontSize: 13,
    paddingBottom: 2
  }
};

class BildeAvatar extends Component {
  render() {
    const { farge, farge0, classes, kode, url } = this.props;
    const size = this.props.size || "big";
    const prefiks = kode.substring(0, 2);
    const parts = typesystem.splittKode(kode);
    const tekst = prefiks;
    if ("AO_OR".indexOf(prefiks) >= 0 && parts.length > 1)
      return (
        <Avatar
          alt="logo"
          classes={{
            root: classes[size + "_noborder"],
            img: classes.img
          }}
          src={config.avatar40px(url, "png")}
        />
      );
    return (
      <Avatar
        classes={{
          root: classes[size]
        }}
        style={{
          backgroundColor: !farge0 && farge,
          backgroundImage: farge0 && `linear-gradient(${farge}, ${farge0})`,
          filter: "drop-shadow(1px 1px 1px #666)"
        }}
      >
        {false && tekst}
      </Avatar>
    );
  }
}

export default withStyles(styles)(BildeAvatar);
