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
export const buildWebdialerLink = (mobile_number) => {
    const formattedPhone = validateMobile(mobile_number);
    const currentHost = window.location.hostname
    let webdialerHost = "https://webdialer.pressone.co"
    if (currentHost.includes("pressone.africa")) {
        webdialerHost = "https://dialer.pressone.africa"
    }
    return `${webdialerHost}/?s=ec.${formattedPhone.substring(1,)}`
}