declare global {
  interface Window {
    gtag: (
      command: string,
      action: string,
      params?: {
        currency?: string
        transaction_id?: string
        value?: number | string
        items?: Array<{
          item_id: string
          item_name: string
          price?: number
        }>
        send_to?: string
      }
    ) => void
  }
}

export {} 