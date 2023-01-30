import mixpanel from 'mixpanel-browser';

export const EVENTS = {
  REQUEST_OTP:"Request OTP",
  SIGNED_IN: "Signed In",
  LOGIN_ISSUE: "Login Issue",
  SIGNED_UP: "Signed Up",
  VIEWED_PRICING: "Viewed Pricing",
  CLICKED_PAY: "Clicked Pay Button"
}

const _MIXPANEL_TOKEN = '2c91e98b6d0b2814042994af76445638'
const _DEBUG = true;
export function track(event, prop) {
  mixpanel.init(_MIXPANEL_TOKEN, {debug: _DEBUG});
  mixpanel.track(event, prop)
}

export function track_error(event, error) {
  mixpanel.init(_MIXPANEL_TOKEN, {debug: _DEBUG});
  mixpanel.track(event, { "error": error })
}

/**
 *
 * @param user CurrentUser object from UsersStore
 */
export function register(user) {
  let user_data = {
    '$email': user.personal_email,
    '$phone': user.mobile,
    '$first_name': user.first_name,
    '$last_name': user.last_name,
  }
  mixpanel.init(_MIXPANEL_TOKEN, {debug: _DEBUG});
  mixpanel.register(user_data)
}