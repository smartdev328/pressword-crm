import app from "@/main";
import mixpanel from 'mixpanel-browser';

export const EVENTS = {
  REQUEST_OTP:"Request OTP"
}
export function track(event, prop) {
  mixpanel.init('2c91e98b6d0b2814042994af76445638', {debug: true});
  mixpanel.track(event, prop)
}