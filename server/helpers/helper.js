const { ReasonPhrases, StatusCodes, getReasonPhrase, getStatusCode } = require(
	'http-status-codes'
);

module.exports.internalServerError=(res)=>
{
  return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
    success:false,
    message:ReasonPhrases.INTERNAL_SERVER_ERROR,
    data:{}
  })
}

module.exports.response=(res, statusCode, success, message, data={})=>
{
  return res.status(statusCode).json({
    success,
    message,
    data
  })
}