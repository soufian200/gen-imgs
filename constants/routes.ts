const auth = '/auth'
const content = '/c'
const routes = {

    // Sign up
    ABSOLUTE: "/",

    // Log in
    LOGIN: auth + "/login",
    /**
     * Log out
     */
    LOGOUT: auth + "/logout",
    // Sign up
    SIGNUP: auth + "/signup",

    // reset password if user forget it
    RESETPASSWORD: auth + "/reset-password",



    /**
     * If user is authenticated
     * */

    // content
    CONTENT: "/c",

    // layers
    LAYERS: "/layers",
    /**
     * Add New Layer
     */
    ADDLAYER: "/add",
    /**
     * Add New Layer
     */
    RENAMELAYER: "/rename",

    // images
    HOME: "/home",

    // exported
    EXPORTED: "/exported",

    // exported
    SETTINGS: "/settings",

    // exported
    HELP: "/help",
    // exported
    VERIFY: content + "/verify",
    RESEND: "/RESEND",


    /**
   * Tools
   * */

    // Generate
    TOOLS: "/tools",

    // Generate
    GENERATE: "/generate",


    // update json
    UPDATEJSON: "/update-json",

    // generate gif
    GENERATEGIF: "/generate-gif",


}

export default routes;