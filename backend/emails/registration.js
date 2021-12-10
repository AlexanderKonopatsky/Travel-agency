

module.exports = function(email) {
    return {
        from: process.env.EMAIL_FROM,
        to: email,
        subject: 'Account created',
        html: `
            <h1>Welcome to our site</h1>
            <p>You have successfully created an account with email - ${email}</p>
            <hr/>
            <a href="">Startups</a>
        `
    }
}