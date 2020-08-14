import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core'

const propsToColor = color => {
  switch(color){
    case 'primary.dark':
    case 'primary.light':
    
  }
}

const Button = withStyles(theme => ({
  root: props => props.color
}))

Button.propTypes = {

}

export default Button
