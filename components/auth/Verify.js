// import React, { useState, useEffect } from 'react'
// import PropTypes from 'prop-types'
// import jwtDecode from 'jwt-decode'
// import ReactGA from 'react-ga'

// import { useAuth } from '../../contexts/auth'
// import { verifyUser } from './_services'

// import { makeStyles } from '@material-ui/styles'
// import { Typography, Grid, Card, CardContent } from '@material-ui/core'

// const useStyles = makeStyles({
//   formControl: {
//     width: '100%'
//   },
//   card: {
//     maxWidth: '400px'
//   },
//   error: {
//     lineHeight: '20px',
//     display: 'inline',
//     margin: '0'
//   },
//   passwordButton: {
//     fontSize: '10px'
//   },
//   sendMailButton: {
//     margin: '20px 0'
//   }
// })

// function Verify({ token }) {
//   const classes = useStyles()
//   const { setAuth } = useAuth()
//   const [errors, setErrors] = useState()

//   useEffect(() => {
//     if (process.env.NODE_ENV === 'production') {
//       ReactGA.pageview(window.location.pathname + window.location.search)
//     }
//     verify()
//   }, [])

//   async function verify() {
//     const decode = jwtDecode(token)

//     try {
//       const res = await verifyUser(decode)
//       const { token } = res.data
//       const decoded = jwtDecode(token)
//       setAuth({ isAuthenticated: true, user: decoded })
//       localStorage.setItem('jwtToken', token)
//     } catch (err) {
//       setErrors(err.response.data)
//     }
//   }

//   return (
//     <Grid className={classes.root} container justify="center">
//       <Card>
//         <CardContent>
//           <Typography variant="subtitle1">
//             {(errors && errors.user) ||
//               (errors && errors.tokenExpired) ||
//               (errors && errors.alreadyVerified) ||
//               'Du hast deinen Account erfolgreich verifiziert.'}
//           </Typography>
//         </CardContent>
//       </Card>
//     </Grid>
//   )
// }

// Verify.propTypes = {
//   token: PropTypes.string
// }

// export default Verify
