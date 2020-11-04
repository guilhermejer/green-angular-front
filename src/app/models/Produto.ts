export class Produto {
    constructor(
      public id: string,
      public slug: string,
      public titulo: string,
      public descricao: string,
      public preco: number,
      public ativo: boolean,
      public tags: string,
      public image: string
    ) { }
  }
