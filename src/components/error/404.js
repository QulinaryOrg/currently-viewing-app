import React from 'react';
import CssBaseline from 'material-ui/CssBaseline';
import { withStyles } from 'material-ui/styles';
import Paper from 'material-ui/Paper';
import Grid from 'material-ui/Grid';

const styles = (theme) => ({
  root: {
    paddingTop: '20vh'
  },
  paper: {
    padding: theme.spacing.unit * 2,
    textAlign: 'center'
  }
});

function Error404(props) {
  const { classes } = props;

  return (
    <div className={classes.root}>
      <CssBaseline />
      <Grid 
        container 
        spacing={24}
        alignItems="center"
        direction="row"
        justify="center"
      >

        <Grid item md={6} xs={12}>
          <Paper className={classes.paper}>
            <p className="error-message">Page not found!</p>
            <p><a href="/">Back to application ...</a></p>
            <br />
          </Paper>
        </Grid>

      </Grid>
    </div>
  );
}

export default withStyles(styles)(Error404);
