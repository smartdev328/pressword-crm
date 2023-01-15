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
    let matchFullMobile = phone_number.match(/^(\+|)?(\d{3})(\d{3})(\d{3})(\d{4})$/) //match +2348012878233
    let matchFullLand = phone_number.match(/^(\+|)?(\d{3})(\d{1})(\d{3})(\d{4})$/) //match +23417743211

    //format based on match
    if (matchFullMobile) {
        phone_number =  ["+", matchFullMobile[2], ' ', matchFullMobile[3], ' ', matchFullMobile[4], ' ', matchFullMobile[5]].join('')
    }
    else if (matchMobile) {
        phone_number =  ["+234", ' ', matchMobile[2], ' ', matchMobile[3], ' ', matchMobile[4]].join('')
    }
    else if(matchFullLand){
        phone_number =  ["+", matchFullLand[2], ' ', matchFullLand[3], ' ', matchFullLand[4], ' ', matchFullLand[5]].join('')
    }
    else if(matchLand){
        phone_number =  ["+234", ' ', matchLand[2], ' ', matchLand[3], ' ', matchLand[4]].join('')
    }
    else if(matchLand2){
        phone_number =  ["+234 1", ' ', matchLand2[1], ' ', matchLand2[2]].join('')
    }
    // Add contact name if included
    if(contact_name)return "<"+contact_name+"> "+phone_number;

    return phone_number;
}
export const buildWebdialerLink = (mobile_number) => {
    const formattedPhone = validateMobile(mobile_number);
    const currentHost = window.location.hostname
    let webdialerHost = "https://webdialer.pressone.co"
    if (currentHost.includes("pressone.africa")) {
        webdialerHost = "https://dialer.pressone.africa"
    }
    return `${webdialerHost}/?s=ec.${formattedPhone.substring(1,)}`
}