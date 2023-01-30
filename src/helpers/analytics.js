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
const _DEBUG = false;
export function track(event, prop) {
  mixpanel.init(_MIXPANEL_TOKEN, {debug: _DEBUG});
  mixpanel.track(event, prop)
}

export function identify_tracked_user(id){
  mixpanel.init(_MIXPANEL_TOKEN, {debug: _DEBUG});
  mixpanel.identify(id);
}

export function track_error(event, error) {
  mixpanel.init(_MIXPANEL_TOKEN, {debug: _DEBUG});
  mixpanel.track(event, { "error": error })
}

/**
 *
 * @param user CurrentUser object from UsersStore
 * @param user_data [Optional ]Actual user data to register. If not passed, we extract user data from user object
 */
export function register(user, user_data=null) {
  if(!user_data){
    user_data = {
      '$email': user.personal_email,
      '$phone': user.mobile,
      '$first_name': user.first_name,
      '$last_name': user.last_name,
    }
  }
  mixpanel.init(_MIXPANEL_TOKEN, {debug: _DEBUG});
  mixpanel.register(user_data)
}