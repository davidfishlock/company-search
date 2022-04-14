import React from 'react'
import classes from './LoadingIndicator.module.css'

const LoadingIndicator: React.FC = () => {
  return (
    <div aria-busy="true" aria-live="polite" aria-label="Loading" className={classes.loading}></div>
  )
}

export default LoadingIndicator
