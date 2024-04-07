export const GymCalendarEvent = {
  async getAll() {
    try {
      const res = await fetch("/api/gymEvent/all", {
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

  async create(user, event) {
    try {
      const res = await fetch("/api/gymEvent/create", {
        method: "POST",
        body: JSON.stringify(event),
        headers: {
          'Accept': '*/*',
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${user.token}`
        }
      })
      return await res.json()
    } catch (error) {
      return error
    }
  },

  async update(user, eventId, changes) {
    try {
      const res = await fetch(`/api/gymEvent/update?_id=${eventId}`, {
        method: "PATCH",
        body: JSON.stringify(changes),
        headers: {
          'Accept': '*/*',
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${user.token}`
        }
      })
      return await res.json()
    } catch (error) {
      return error
    }
  },

  async delete(user, eventId) {
    try {
      const res = await fetch(`/api/gymEvent/delete?_id=${eventId}`, {
        method: "DELETE",
        headers: {
          'Accept': '*/*',
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${user.token}`
        }
      })
      return await res.json()
    } catch (error) {
      return error
    }
  }
}

export function getTimeFromStr(str) {
  return str.split("T")[1].substring(0, 5)
}
