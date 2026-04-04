import { type ChangeEvent, type FormEvent, useId, useState } from 'react'
import styles from '../styles/JoshwPortfolio.module.css'

interface ContactFormProps {
  recipientEmail: string
}

type FormValues = {
  name: string
  email: string
  message: string
}

type FormErrors = Partial<Record<keyof FormValues, string>>

const initialValues: FormValues = {
  name: '',
  email: '',
  message: '',
}

export function ContactForm({ recipientEmail }: ContactFormProps) {
  const [values, setValues] = useState<FormValues>(initialValues)
  const [errors, setErrors] = useState<FormErrors>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [statusMessage, setStatusMessage] = useState('')
  const formId = useId()

  const handleChange =
    (field: keyof FormValues) => (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const nextValue = event.target.value
      setValues((current) => ({ ...current, [field]: nextValue }))
      setErrors((current) => ({ ...current, [field]: undefined }))
    }

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const validationErrors = validate(values)

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors)
      setIsSubmitted(false)
      setStatusMessage('')
      return
    }

    setIsSubmitting(true)

    try {
      submitContactMessage(values, recipientEmail)
      setValues(initialValues)
      setErrors({})
      setIsSubmitted(true)
      setStatusMessage('A prefilled email draft should now be open to msparekh25@gmail.com.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className={styles.contactFormWrap}>
      <p className={styles.formIntro}>
        Send a note directly to <span>{recipientEmail}</span>.
      </p>

      <form className={styles.contactForm} onSubmit={handleSubmit} noValidate>
        <div className={styles.formField}>
          <label className={styles.formLabel} htmlFor={`${formId}-name`}>
            Name
          </label>
          <input
            id={`${formId}-name`}
            className={styles.formInput}
            name="name"
            type="text"
            autoComplete="name"
            value={values.name}
            onChange={handleChange('name')}
            aria-invalid={Boolean(errors.name)}
            aria-describedby={errors.name ? `${formId}-name-error` : undefined}
          />
          {errors.name ? (
            <p id={`${formId}-name-error`} className={styles.formError}>
              {errors.name}
            </p>
          ) : null}
        </div>

        <div className={styles.formField}>
          <label className={styles.formLabel} htmlFor={`${formId}-email`}>
            Email
          </label>
          <input
            id={`${formId}-email`}
            className={styles.formInput}
            name="email"
            type="email"
            autoComplete="email"
            value={values.email}
            onChange={handleChange('email')}
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? `${formId}-email-error` : undefined}
          />
          {errors.email ? (
            <p id={`${formId}-email-error`} className={styles.formError}>
              {errors.email}
            </p>
          ) : null}
        </div>

        <div className={styles.formField}>
          <label className={styles.formLabel} htmlFor={`${formId}-message`}>
            Message
          </label>
          <textarea
            id={`${formId}-message`}
            className={styles.formTextarea}
            name="message"
            rows={6}
            value={values.message}
            onChange={handleChange('message')}
            aria-invalid={Boolean(errors.message)}
            aria-describedby={errors.message ? `${formId}-message-error` : `${formId}-message-hint`}
          />
          <p id={`${formId}-message-hint`} className={styles.formHint}>
            Briefly describe the role, project, or conversation you want to have.
          </p>
          {errors.message ? (
            <p id={`${formId}-message-error`} className={styles.formError}>
              {errors.message}
            </p>
          ) : null}
        </div>

        <button className={styles.primaryCta} type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Sending…' : 'Send Message'}
        </button>

        <div className={styles.formStatus} aria-live="polite">
          {isSubmitted ? (
            <p className={styles.successMessage}>
              Thanks for reaching out. {statusMessage}
            </p>
          ) : null}
        </div>
      </form>
    </div>
  )
}

function validate(values: FormValues) {
  const nextErrors: FormErrors = {}

  if (!values.name.trim()) {
    nextErrors.name = 'Please enter your name.'
  }

  if (!values.email.trim()) {
    nextErrors.email = 'Please enter your email address.'
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
    nextErrors.email = 'Please enter a valid email address.'
  }

  if (!values.message.trim()) {
    nextErrors.message = 'Please add a short message.'
  } else if (values.message.trim().length < 20) {
    nextErrors.message = 'Please include a bit more detail so Mann can follow up helpfully.'
  }

  return nextErrors
}

function submitContactMessage(values: FormValues, recipientEmail: string) {
  const subject = encodeURIComponent(`Portfolio inquiry from ${values.name}`)
  const body = encodeURIComponent(
    `Name: ${values.name}\nEmail: ${values.email}\n\n${values.message}`,
  )

  window.location.assign(`mailto:${recipientEmail}?subject=${subject}&body=${body}`)
}
