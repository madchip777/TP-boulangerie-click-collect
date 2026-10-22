export class SmsConsole {
  envoyer(telephone: string, message: string): void {
    console.log(`[SMS] ${telephone} : ${message}`);
  }
}
