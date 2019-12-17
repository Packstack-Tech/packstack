var mandrill = require('node-mandrill')(process.env.MANDRILL_API);

export const sendPasswordReset = (email, resetUrl) => {
    mandrill('messages/send-template', {
        template_name: 'password-reset',
        template_content: [],
        message: {
            to: [{ email }],
            merge_language: 'mailchimp',
            merge_vars: [{
                rcpt: email,
                vars:
                    [
                        {
                            name: 'PASSWORD_RESET_URL',
                            content: resetUrl
                        }
                    ]
            }],
        }
    }, (err, response) => {
        console.log(err, response);
    })
};