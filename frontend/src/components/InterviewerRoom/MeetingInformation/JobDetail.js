import React from 'react';
import PropTypes from 'prop-types';
import { Box, Typography } from '@material-ui/core';

const JobDetail = (props) => {
  return (
    <Box pt={2}>
      <Typography variant="h5" paragraph>
        Full Stack Developer
      </Typography>
      <Typography variant="body1" paragraph>
        We are looking for a highly skilled computer programmer who is
        comfortable with both front and back end programming. Full
        Stack Developers are responsible for developing and designing
        front end web architecture, ensuring the responsiveness of
        applications and working alongside graphic designers for web
        design features, among other duties. Full Stack Developers
        will be required to see out a project from conception to final
        product, requiring good organizational skills and attention to
        detail.
      </Typography>
      <Typography variant="h6" paragraph>
        Requirements
      </Typography>
      <ul>
        <li>
          <Typography>Degree in Computer Science</Typography>
        </li>
        <li>
          <Typography>
            Proficiency with fundamental front end languages such as
            HTML, CSS and JavaScript
          </Typography>
        </li>
        <li>
          <Typography>
            Familiarity with JavaScript frameworks such as Angular JS,
            React and Amber
          </Typography>
        </li>
        <li>
          <Typography>
            Familiarity with database technology such as MySQL, Oracle
            and MongoDB.
          </Typography>
        </li>
      </ul>
    </Box>
  );
};

export default JobDetail;
