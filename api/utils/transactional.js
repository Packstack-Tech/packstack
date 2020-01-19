const mailjet = require('node-mailjet').connect(process.env.MAILJET_API_KEY, process.env.MAILJET_API_SECRET);

export const sendPasswordReset = (email, resetUrl) => {
    const request = mailjet.post("send", { 'version': 'v3.1' })
        .request({
            "Messages": [
                {
                    "From": {
                        "Email": "jerad@packstack.io",
                        "Name": "Jerad from Packstack"
                    },
                    "To": [
                        {
                            "Email": email,
                            "Name": email
                        }
                    ],
                    "Variables": {
                        "resetUrl": resetUrl
                    },
                    "TemplateLanguage": true,
                    "Subject": "Password reset",
                    "TextPart": "Reset your password for Packstack",
                    "HTMLPart": "<p>If you requested to reset your password for Packstack, you can do so here: {{var:resetUrl}}</p>",
                    "CustomID": "ResetPasswordRequest"
                }
            ]
        });

    // send request, ignore response
    request.then(res => console.log(res)).catch(err => console.log(err));
};