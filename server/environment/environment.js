const development={
  passportJWTSecret:'something',
  sessionName:'something',
  sessionSecret:'something'
}
const production={
  passportJWTSecret:process.env.PASSPORT_JWT_SECRET,
  sessionName:process.env.SESSION_NAME,
  sessionSecret:process.env.SESSION_SECRET
}

module.exports=production;