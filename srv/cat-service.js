const cds = require('@sap/cds');

module.exports = cds.service.impl(async function (srv) {

    const {
        Books,
        BusinessPartners
      } = this.entities;

    this.after('READ', Books, (each) => {
        each.newtitle = each.ID + " " + each.title;
    });

    
    // connect to remote service
    const BPsrv = await cds.connect.to("API_BUSINESS_PARTNER");

    /**
     * Event-handler for read-events on the BusinessPartners entity.
     * Each request to the API Business Hub requires the apikey in the header.
     */
    this.on("READ", BusinessPartners, async (req) => {
        // The API Sandbox returns alot of business partners with empty names.
        // We don't want them in our application
        req.query.where("LastName <> '' and FirstName <> '' ");

        return await BPsrv.transaction(req).send({
            query: req.query,
            headers: {
                apikey: process.env.apikey,
            },
        });
    });


})