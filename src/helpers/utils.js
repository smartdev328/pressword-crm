export const validateMobile = (mobile_phone) => {
    //remove spaces from input
    mobile_phone = mobile_phone.replace(/\s+/g, '');

    //remove any non-numeric input, but leave +.
    mobile_phone = mobile_phone.replace(/[^\d+]/g, '');

    //check phone number to make sure it starts with +234
    if(mobile_phone.substring(0,1) !== "+"){
        if(mobile_phone.substring(0,3) === "234") //if input is "234803444555", then just add a +
            mobile_phone = "+"+mobile_phone;
        else if(mobile_phone.substring(0,1) === "0") //else add a +234
            mobile_phone = "+234"+mobile_phone.substring(1,);
        else
            mobile_phone = "+234"+mobile_phone;
    }
    return mobile_phone;
}
export const formatPhoneNumber = (phone_number, contact_name="") => {
    //Declare possible matches
    let matchMobile = phone_number.match(/^(0|)?(\d{3})(\d{3})(\d{4})$/); // match 08012878233 or 8012878233
    let matchLand = phone_number.match(/^(0|)?(\d{1})(\d{3})(\d{4})$/); //match 017743211 or 17743211
    let matchLand2 = phone_number.match(/^(\d{3})(\d{4})$/); //match 7743211
    let matchFullMobile = phone_number.match(/^(\+234|)(\d{3})(\d{3})(\d{4})$/) //match +2348012878233
    let matchFullLand = phone_number.match(/^(\+234)(\d{1})(\d{3})(\d{4})$/) //match +23417743211
    let matchFullUS = phone_number.match(/^(\+1)(\d{3})(\d{3})(\d{4})$/) //match +14083326784

    //format based on match
    if (matchFullMobile) {
        phone_number =  [matchFullMobile[1], ' ',matchFullMobile[2], ' ', matchFullMobile[3], ' ', matchFullMobile[4]].join('')
    }
    else if (matchMobile) {
        phone_number =  ["+234", ' ', matchMobile[2], ' ', matchMobile[3], ' ', matchMobile[4]].join('')
    }
    else if(matchFullLand){
        phone_number =  [matchFullLand[1],' ', matchFullLand[2], ' ', matchFullLand[3], ' ', matchFullLand[4]].join('')
    }
    else if(matchLand){
        phone_number =  ["+234", ' ', matchLand[2], ' ', matchLand[3], ' ', matchLand[4]].join('')
    }
    else if(matchLand2){
        phone_number =  ["+234 1", ' ', matchLand2[1], ' ', matchLand2[2]].join('')
    }
    else if(matchFullUS){
        phone_number =  [matchFullUS[1], '(', matchFullUS[2], ') ', matchFullUS[3], ' ', matchFullUS[4]].join('')
    }
    // Add contact name if included
    if(contact_name)return "<"+contact_name+"> "+phone_number;

    return phone_number;
}
export const buildPaymentLink = (currentUser, planAmount) => {
    let payment_link = "";
    let extra_params = "";

    switch (planAmount){
        case 1499:
            payment_link = "https://paystack.com/pay/pressone-base-monthly"
            break;
        case 4999:
            payment_link = "https://paystack.com/pay/pressone-professional-monthly"
            break;
        case 9999:
            payment_link = "https://paystack.com/pay/pressone-international-monthly"
            break;
        default: //if no plan is specified, then this is a top up
            payment_link = "https://paystack.com/pay/53f90o5uy-"
    }
    if(currentUser){
        extra_params = [
            "?first_name="+currentUser.first_name,
            "last_name="+currentUser.last_name,
            "email="+currentUser.personal_email,
            "phone="+currentUser.mobile
        ].join("&")
    }

    return payment_link + extra_params;
}

/**
 * Determine if a user just joined PressOne and needs to complete their profile
 * @param first_name
 * @param last_name
 * @param date_joined
 * @returns {boolean}
 */
export const userJustJoined = (first_name, last_name, date_joined) => {
    function _containsNumbers(str) {
        return /\d/.test(str);
    }
    if(_containsNumbers(first_name) && _containsNumbers(last_name)) //by default PressOne sets your first name and last name to the phone number you signed up with
        return true
    return false;
}

export const getWebdialerHost = () => {
    const currentHost = window.location.hostname
    let webdialerHost = "https://webdialer.pressone.co"
    if (currentHost.includes("pressone.africa")) {
        webdialerHost = "https://dialer.pressone.africa"
    }
    return webdialerHost
}

export const buildWebdialerLink = (mobile_number, receiver_number_id) => {
    const formattedPhone = validateMobile(mobile_number);
    const webdialerHost = getWebdialerHost()
    console.log((receiver_number_id).toString(16))
    return `${webdialerHost}/?s=${(receiver_number_id).toString(16)}.${formattedPhone.substring(1,)}`
}

export const formatResults = (arrayComingFromPeopleApi) => {
    const resources = arrayComingFromPeopleApi.map((resource) => {
      // get multiple email addresses and phone numbers if applicable
      const { emailAddresses = [], names = [], phoneNumbers = [], organizations = [] } = resource;
      const email = emailAddresses.map((email = {}) => email.value || '');
      const phone = phoneNumbers.map((phone = {}) => phone.value || '');
      const lastName = names.map((name = {}) => name.familyName || '');
      const firstName = names.map((name = {}) => name.givenName || '');
      const organization = organizations.map((name = {}) => name.name || '');

      return {
        first: firstName[0],
        last: lastName[0],
        email,
        phone,
        organization
      };
    });
    return resources
    // commit the resources to the store
  }
