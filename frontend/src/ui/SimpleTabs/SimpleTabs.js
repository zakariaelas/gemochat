import { withStyles, Tabs } from '@material-ui/core';

const SimpleTabs = withStyles((theme) => ({
  indicator: {
    backgroundColor: theme.palette.primary.main,
    height: 3,
  },
}))(Tabs);

export default SimpleTabs;
