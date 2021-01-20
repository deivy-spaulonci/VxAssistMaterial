import {Fornecedor} from './fornecedor';

export class LancamentoContaCartao {
  id: number;
  data: Date;
  forncedor: Fornecedor;
  valor: number;
  parcela: number;
  totalParcela: number;
}
