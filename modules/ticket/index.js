
const guestModel = require("../guest/model");
const ticketModel = require("./model");

const ticketHandler = {

    async getTicketUser(data) {
        try {
            const countTicket = await ticketModel.find({ event: data.eventId }).count();
            const countTicketUsed = await ticketModel.find({ event: data.eventId, status: "USED" }).count();
            return { countTicket, countTicketUsed }

        } catch (error) {
            console.log(error);
        }
    },

    async ScanTicketReal(input) {
        try {
            const { value, eventId } = input;
            const data = {
                value,
                event: eventId
            };
            const item = await ticketModel.findOneAndUpdate(data, { status: "USED" });
            let guestInfo
            if(item) {
                guestInfo = await guestModel.findOne({ ticket: item._id });
            }
            return guestInfo
                ? { data: { ...guestInfo._doc, expirationDate: item.expirationDate } }
                : { message: "ticket_not_found" };
        }
        catch (error) {
            console.log(error);
        }
    },
};

module.exports = ticketHandler;
