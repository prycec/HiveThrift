/*********************************************************************************/
/*       If module is installed with npm use the following include :             */
/*       var client = require ('hive-thrift')                                    */
/*********************************************************************************/
var client = require('../index.js');
var util = require('../src/util.js');
var bunyan = require('bunyan');

/*********************************************************************************/
/*                                    LOGGER                                     */
/*********************************************************************************/
	
var logger = bunyan.createLogger({
		name: 'HiveThriftPingDatabase',
		stream: process.stdout,
        level: "info"
});

/*********************************************************************************/
/*                                    FUNCTIONS                                  */
/*********************************************************************************/

/*********************************************************************************/
/*                                    MAIN                                       */
/*********************************************************************************/

logger.info('Connecting ...');

/*By default the client API log is silent ... change log level for debug API*/
client.changeLogLevelTrace();

client.connect(function (err, session) {
	
	if (err) {
		logger.error('Connection error : ' + err);
		util.endProgram(1);	
	} else {
		logger.info('Connection success');
		logger.info(JSON.stringify(session));

		client.getSchemasNames(session, function (err, resSchema) {
			if(err) {
				logger.error("Error : " + err)
			} else {
				logger.info("Schemas => " + JSON.stringify(resSchema));
			}
			util.disconnect(session);
		});
	}
});