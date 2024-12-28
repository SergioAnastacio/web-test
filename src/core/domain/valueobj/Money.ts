export class Money {
	constructor(
		private readonly _amount: number,
		private readonly _currency: string,
	) {
		if (_amount < 0) {
			throw new Error("Amount cannot be negative");
		}
	}

	get amount(): number {
		return this._amount;
	}

	get currency(): string {
		return this._currency;
	}

	add(money: Money): Money {
		if (money.currency !== this.currency) {
			throw new Error("Currency mismatch");
		}
		return new Money(this.amount + money.amount, this.currency);
	}

	subtract(money: Money): Money {
		if (money.currency !== this.currency) {
			throw new Error("Currency mismatch");
		}
		return new Money(this.amount - money.amount, this.currency);
	}

	withAmount(newAmount: number): Money {
		if (newAmount < 0) {
			throw new Error("Amount cannot be negative");
		}
		return new Money(newAmount, this.currency);
	}
}
