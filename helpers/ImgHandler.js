export const ImgHandler = {
  async getAll() {
    try {
      const res = await fetch("/api/img/all", {
        headers: {
          'Accept': '*/*',
          'Content-Type': 'application/json'
        }
      })
      return await res.json()
    } catch (error) {
      return error
    }
  }
}
