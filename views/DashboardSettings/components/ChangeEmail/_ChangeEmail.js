import React, { useState, useEffect, useContext } from 'react'

import AuthContext from '@contexts/AuthContext'
import TextField from '@components/TextField'
import { useAlert } from '@contexts/AlertContext'
import { emailChange } from '@services/auth'

import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import CardHeader from '@material-ui/core/CardHeader'
import Button from '@material-ui/core/Button'
import Divider from '@material-ui/core/Divider'

function EmailChange() {
  const { user, login } = useContext(AuthContext)
  const { setAlert } = useAlert()
  const [errors, setErrors] = useState('')

  const [email, setEmail] = useState('')

  useEffect(() => {
    setEmail(user.email)
  }, [user.email])

  function onChange(event) {
    setEmail(event.target.value)
  }

  async function onSubmit(event) {
    try {
      event.preventDefault()

      const emailData = {
        id: user.id,
        email
      }

      const res = await emailChange(emailData)
      const { token } = res.data
      login(token)
      setAlert({ message: 'Email changed successfully' })
    } catch (error) {
      setErrors(error.response.data)
    }
  }

  return (
    <Card>
      <CardHeader subheader="Change your email adress" title="Email" />
      <Divider />
      <form noValidate onSubmit={onSubmit}>
        <CardContent>
          <TextField
            type="email"
            error={errors && errors.email}
            placeholder="Email"
            label="Email"
            name="email"
            value={email}
            onChange={onChange}
          />
        </CardContent>
        <Divider />
        <CardContent>
          <Button type="submit" variant="outlined" color="primary">
            Save
          </Button>
        </CardContent>
      </form>
    </Card>
  )
}

export default EmailChange
