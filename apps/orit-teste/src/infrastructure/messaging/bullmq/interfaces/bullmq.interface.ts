export interface IBullMqMessaging {
  sendMessage(route: string, data: any): Promise<boolean>;
}
