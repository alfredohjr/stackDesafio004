import TransactionsRepository from '../repositories/TransactionsRepository';
import Transaction from '../models/Transaction';

interface Request {
  title: string;
  value: number;
  type: string;
}

class CreateTransactionService {
  private transactionsRepository: TransactionsRepository;

  constructor(transactionsRepository: TransactionsRepository) {
    this.transactionsRepository = transactionsRepository;
  }

  public execute({ title, value, type }: Request): Transaction {
    const types = ['income', 'outcome'];
    const isInArray = types.includes(type);

    if (!isInArray) {
      throw Error('types accept: income or outcome.');
    }

    const transaction = this.transactionsRepository.create({
      title,
      value,
      type: type,
    });

    return transaction;
  }
}

export default CreateTransactionService;
