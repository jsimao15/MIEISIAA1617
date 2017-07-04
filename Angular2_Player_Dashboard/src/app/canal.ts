export interface Canal {
  id: number;
  descricao: string;
  nome: string;
  conteudo: Array<{
      idCont:number,
      url: string,
      tipo: string}>;
}