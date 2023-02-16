import mixpanel from 'mixpanel-browser';

export const EVENTS = {
  VIEWED_SIGNIN: "Viewed Sign In",
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

export function identify_tracked_user(email){
  mixpanel.init(_MIXPANEL_TOKEN, {debug: _DEBUG});
  mixpanel.identify(email);
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
  //first identity user
  try{ identify_tracked_user(user.personal_email) } catch (e) {/*do nothing*/}

  // build user data from User object, and register
  mixpanel.init(_MIXPANEL_TOKEN, {debug: _DEBUG});
  let user_data = {}
  user_data = {
    'email': user.personal_email,
    'phone': user.mobile,
    'first_name': user.first_name,
    'last_name': user.last_name,
  }
  try{
    if (user.team_size) user_data['team_size'] = user.team_size;
    if (user.business_name) user_data['business_name'] = user.business_name;
  }catch (e) {/*do nothing*/}
 
  mixpanel.register(user_data)

  // Set People profile. Untested Code. Put in try block
  try{
    user_data = {
      '$email': user.personal_email,
      '$phone': user.mobile,
      '$first_name': user.first_name,
      '$last_name': user.last_name
    }
    mixpanel.people.set(user_data)
  }
  catch (e) {/*do nothing*/}
}