import Mailchimp from 'mailchimp-api-v3';

const audience_id = process.env.MAILCHIMP_AUDIENCE;
const mailchimpEnabled = !!process.env.MAILCHIMP_API;
const mailchimp = mailchimpEnabled ? new Mailchimp(process.env.MAILCHIMP_API) : {};

export const addEmailSubscriber = (email) => {
    if (!mailchimpEnabled) {
        return Promise.reject();
    }

    return mailchimp.post(`/lists/${audience_id}/members`, {
        email_address: email,
        status: 'subscribed'
    })
};
