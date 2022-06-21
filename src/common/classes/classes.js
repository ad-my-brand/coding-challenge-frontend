export class FormModal {
  constructor(
    id = 0,
    userId = 0,
    title = "",
    body = ""
  ) {
    this.id = id
    this.userId = userId
    this.title = title
    this.body = body
  }

  createObj(obj) {
    if (null === obj || "object" !== typeof obj) return obj;
    var copy = new FormModal();
    for (var attr in obj) {
      if (copy.hasOwnProperty(attr)) {
        copy[attr] = obj[attr];
      }
    }
    return copy;
  }

  getAddRequest() {
    return {
      id: this.id === 0 ? undefined : this.id,
      userId: this.userId,
      title: this.title,
      body: this.body
    }
  }

  getUpdateRequest() {
    return {
      id: this.id === 0 ? undefined : this.id,
      userId: this.userId,
      title: this.title,
      body: this.body
    }
  }
}


export class ErrorModal {
    constructor(
      response = false,
      status = false,
      message = ""
    ) {
      this.response = response
      this.status = status
      this.message = message
    }
  }
  