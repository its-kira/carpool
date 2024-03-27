module.exports = {

    Front: {
        Home: require('./Front/home.js'),
        Login: require('./Front/auth.js').login,
        Register: require('./Front/auth.js').register,
    },

    Api: {
        Login: require('./Api/auth/login.js'),
        Register: require('./Api/auth/register.js')
    }


}