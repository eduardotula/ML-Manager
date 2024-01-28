export class Url {
    public id: number;
    public url: string;
    public anuncioId: number;
  
    constructor(id: number, url: string, anuncioId: number) {
      this.id = id;
      this.url = url;
      this.anuncioId = anuncioId;
    }
  }