var CronJob = require('cron').CronJob;
var job = new CronJob({
  cronTime: '10 48 18 * * 0-6',
  onTick: function() {
    /*
     * Runs every weekday (Monday through Friday)
     * at 11:30:00 AM. It does not run on Saturday
     * or Sunday.
     */console.log('It is Running')
  },
  start: false,
  timeZone: 'America/Los_Angeles'
});
job.start();