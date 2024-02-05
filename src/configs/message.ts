import constantMessage from '@configs/lang/constant.message'
import config from "config"

export default class Message {
  static async get(code: string, ...params: any) {
    const lang = config.get("lang") as string
    const messageLang: any = await constantMessage

    if (!code) {
      return null
    }
    
    var message = await messageLang[code][lang] || null
    if (params) {
      await params.forEach(async (value: string, key: number) => {
        message = await message.replace(`{${key}}`, value)
      })
    }
    return message
  }
}
