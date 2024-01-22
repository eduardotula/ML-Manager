export class User {
    id: number;
    name: string;
    userIdML: string;
    accessCode: string;
    refreshToken: string;
    createdAt: Date;
  
    constructor(
      id: number,
      name: string,
      userIdML: string,
      accessCode: string,
      refreshToken: string,
      createdAt: Date
    ) {
      this.id = id;
      this.name = name;
      this.userIdML = userIdML;
      this.accessCode = accessCode;
      this.refreshToken = refreshToken;
      this.createdAt = createdAt;
    }
  }