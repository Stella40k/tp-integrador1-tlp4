//interfax objetiva (target): es el contrato q nuestro sistema conoce y espera usar

export interface INotifier {
  sendNotification(recipient: string, message: string): Promise<boolean>;
}
