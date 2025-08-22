export declare class MailService {
    private transporter;
    sendSaleEmail(to: string, subject: string, html: string): Promise<void>;
}
