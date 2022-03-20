import { useState } from 'react'
import { useMutation } from '@apollo/client'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

import {
  startPhoneVerification,
  startPhoneVerificationVariables,
} from './__generated__/startPhoneVerification'
import PhoneLoginPresenter from './PhoneLoginPresenter'
import { PHONE_SIGN_IN } from './PhoneQueries'

const PhoneLoginContainer: React.FC = () => {
  let navigate = useNavigate()
  const [countryCode, setCountryCode] = useState<string>('+380')
  const [phoneNumber, setPhoneNumber] = useState<string>('')
  const onCompleted = (data) => {
    const { StartPhoneVerification } = data
    const phone = `${countryCode}${phoneNumber}`
    if (StartPhoneVerification.ok) {
      toast.success('SMS Sent! Redirecting you...')
      setTimeout(() => {
        navigate('/verify-phone', { state: { phone } })
      }, 2000)
    } else {
      toast.error(StartPhoneVerification.error)
    }
  }

  const [phoneMutation, { loading }] = useMutation<
    startPhoneVerification,
    startPhoneVerificationVariables
  >(PHONE_SIGN_IN, {
    onCompleted,
  })

  const onSubmit: React.FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault()
    const phone = `${countryCode}${phoneNumber}`
    const isValid = /^\+[1-9]{1}[0-9]{7,11}$/.test(phone)
    if (isValid) {
      phoneMutation({
        variables: {
          phoneNumber: `${countryCode}${phoneNumber}`,
        },
      })
    } else {
      toast.error('Please write a valid phone number')
    }
  }

  const onInputChange: React.ChangeEventHandler<HTMLInputElement | HTMLSelectElement> = (event) => {
    const {
      target: { name, value },
    } = event
    if (name === 'countryCode') {
      setCountryCode(value)
    } else {
      setPhoneNumber(value)
    }
  }

  return (
    <PhoneLoginPresenter
      countryCode={countryCode}
      phoneNumber={phoneNumber}
      onInputChange={onInputChange}
      onSubmit={onSubmit}
      loading={loading}
    />
  )
}

export default PhoneLoginContainer
