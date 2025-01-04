const paypal = require('paypal-rest-sdk');

paypal.configure({
    mode : 'sandbox',
    client_id : 'AUM3aj40YHskIqvMM_fmxHyUQ3c2LU7J-cmq9GMVbfjZo2ApuSAf5AXUio8ejxQkWLIN41NmQY6_aPJA',
    client_secret : 'EG-osg5qzEgYy2VtEgnG_fdAi4uk3IyqhT2UtaPkH3l679Jf_IuJCw4qWHhPgZKhw8BO1MnY2leCDPV2',
})

module.exports = paypal;