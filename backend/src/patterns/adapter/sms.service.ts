//servicio externo de terceres: este servicio tiene sus propios metodos y nombres q no elijo yo
export class SmsService {
  public sendSms(telefono: string, texto: string): void {
    console.log(`[SMS EXTERNI] Enviando SMS a ${telefono}: "${texto}"`);
  }
}
