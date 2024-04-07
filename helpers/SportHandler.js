export const SportHandler = {
  async getAll() {
    try {
      const res = await fetch("/api/sport/all", {
        headers: {
          'Accept': '*/*',
          'Content-Type': 'application/json'
        }
      })
      return await res.json()
    } catch (error) {
      return error
    }
  },
}
