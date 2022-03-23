module.exports = ({ env }) => ({
    email: {
        config: {
            provider: 'sendgrid',
            providerOptions: {
                apiKey: env('SENDGRID_API_KEY')
            },
            // settings: {
            //     defaultFrom: 'no-reply@lsalab.cs.nthu.edu.tw',
            //     defaultReplyTo: 'contact@lsalab.cs.nthu.edu.tw'
            // }
            // provider: 'smtp',
            // providerOptions: {
            //   host: 'smtp.gmail.com', //SMTP Host
            //   port: 465   , //SMTP Port
            //   secure: true,
            //   username: 'kswang@lsalab.cs.nthu.edu.tw',
            //   password: 'cfai1012',
            //   rejectUnauthorized: true,
            //   requireTLS: true,
            //   connectionTimeout: 1,
            // },
            // settings: {
            //   from: 'kswang@lsalab.cs.nthu.edu.tw',
            //   replyTo: 'kswang@lsalab.cs.nthu.edu.tw',
            // },
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