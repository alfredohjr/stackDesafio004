import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

interface TransactionDTO {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  public getBalance(): Balance {

    var incomeValue = 0;
    var outcomeValue = 0;

    this.transactions.forEach((data, index) => {
      if (data.type === 'income') {
        incomeValue += data.value;
      } else if (data.type === 'outcome') {
        outcomeValue += data.value;
      }
    });

    const balance = {
      income: incomeValue,
      outcome: outcomeValue,
      total: incomeValue - outcomeValue,
    };

    return balance;
  }

  public create({ title, value, type }: TransactionDTO): Transaction {
    const transaction = new Transaction({ title, value, type });

    this.transactions.push(transaction);

    return transaction;
  }
}

export default TransactionsRepository;
