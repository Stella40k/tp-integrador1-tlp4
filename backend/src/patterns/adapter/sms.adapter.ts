import { INotifier } from "./notifier.interfacace";
import { SmsService } from "./sms.service";

//pateron adapter: traduce nuestra fun 'sendNotification a la fun 'sendSms del servicio externo

export class SmsAdapater implements INotifier {
  private smsService: SmsService;

  constructor(smsService: SmsService) {
    this.smsService = smsService;
  }
  public async sendNotification(
    recipient: string,
    message: string,
  ): Promise<boolean> {
    try {
      this.smsService.sendSms(recipient, message);
      return true;
    } catch (error) {
      console.error("Errror en SmsAdapter: ", error);
      return false;
    }
  }
}
