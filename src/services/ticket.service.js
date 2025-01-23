import Ticket from "../models/ticket.model.js";
import { sendEmail } from "../utils/emailUtils.js";

export class TicketService {
  static async createTicket({ amount, purchaser }) {
    const code = `TICKET-${Date.now()}`;
    const ticket = await Ticket.create({
      code,
      purchase_datetime: new Date(),
      amount,
      purchaser,
    });

    const emailContent = `
      <h1>Gracias por tu compra</h1>
      <p>Tu ticket ha sido generado exitosamente.</p>
      <ul>
        <li><strong>Código:</strong> ${ticket.code}</li>
        <li><strong>Total:</strong> $${ticket.amount}</li>
        <li><strong>Fecha:</strong> ${ticket.purchase_datetime}</li>
      </ul>
    `;

    await sendEmail(purchaser, "Ticket de compra", emailContent);

    return ticket;
  }
}
