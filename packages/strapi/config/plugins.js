module.exports = ({ env }) => ({
    email: {
        config: {
            provider: 'nodemailer',
            providerOptions: {
                host: 'localhost', //SMTP Host
                port: 25, //SMTP Port
            },
            settings: {
                defaultFrom: 'LSALab <lsalab@lsalab.cs.nthu.edu.tw>',
                defaultReplyTo: 'lsalab@lsalab.cs.nthu.edu.tw',
            },
        }
    },
    graphql: {
        config: {
            endpoint: '/graphql',
            shadowCRUD: true,
            playgroundAlways: true,
            depthLimit: 7,
            amountLimit: 100,
            apolloServer: {
                tracing: false,
            },
        }
    }
})