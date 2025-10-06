export default defineEventHandler(async (event) => {
  const { loops } = event.context
  const body = await readBody(event)

  // Validate email
  const email = body.email?.trim()
  if (!email) {
    throw createError({
      statusCode: 400,
      message: 'Email is required'
    })
  }

  // Basic email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(email)) {
    throw createError({
      statusCode: 400,
      message: 'Invalid email address'
    })
  }

  try {
    // Add contact to Loops
    const response = await loops.createContact(email, {
      source: 'website',
      subscribed: true
    })

    return {
      success: true,
      message: 'Successfully subscribed to newsletter!',
      data: response
    }
  } catch (error: unknown) {
    console.error('Loops API error:', error)

    // Handle duplicate email gracefully
    const errorObj = error as { message?: string; status?: number }
    if (errorObj.message?.includes('already exists') || errorObj.status === 409) {
      return {
        success: true,
        message: 'You are already subscribed!'
      }
    }

    throw createError({
      statusCode: errorObj.status || 500,
      message: errorObj.message || 'Failed to subscribe. Please try again later.'
    })
  }
})
