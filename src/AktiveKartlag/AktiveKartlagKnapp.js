import { Paper, Typography } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import { ExpandMore } from "@material-ui/icons";
import PropTypes from "prop-types";
import React from "react";
import { withRouter } from "react-router";
import Badge from "@material-ui/core/Badge";
import classNames from "classnames";

type Props = {
  erÅpen: PropTypes.Boolean,
  antallLag: PropTypes.numeric,
  classes: PropTypes.object.isRequired,
  onClick: PropTypes.func.isRequired
};

const styles = {
  ikon: {
    margin: "8px 22px 8px 14px",
    transition: "0.5s"
  },
  åpen: {
    transform: "rotate(0deg)"
  },
  lukket: {
    transform: "rotate(180deg)"
  },
  rot: {
    cursor: "pointer",
    display: "flex",
    flex: "none",
    alignItems: "flex-start",
    color: "hsla(0, 0%, 0%, 0.54)",
    "&:hover": {
      color: "hsla(0, 0%, 0%, 0.87)"
    },
    backgroundColor: "hsl(0, 0%, 96%)",
    transition: "0.3s",
    transitionTimingFunction: "ease-out"
  },
  badge: {
    top: 22,
    left: 20
  },
  tekst: {
    fontSize: 15,
    fontWeight: 500,
    height: 44,
    lineHeight: "44px",
    textAlign: "center"
  }
};

class AktiveKartlagKnapp extends React.Component<Props> {
  render() {
    const { onClick, erÅpen, antallLag, classes } = this.props;
    return (
      <Paper className={classes.rot} onMouseDown={onClick} square={erÅpen}>
        <ExpandMore
          color="inherit"
          className={classNames(
            classes.ikon,
            erÅpen ? classes.åpen : classes.lukket
          )}
        />
        <Typography color="inherit" className={classes.tekst}>
          Mine kartlag
        </Typography>
        {antallLag > 0 && (
          <Badge
            className={classes.badge}
            badgeContent={antallLag}
            color="primary"
          >
            &nbsp;
          </Badge>
        )}
      </Paper>
    );
  }
}

export default withStyles(styles)(withRouter(AktiveKartlagKnapp));
