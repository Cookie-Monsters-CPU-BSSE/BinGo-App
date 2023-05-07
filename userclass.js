class User {
  constructor(email, password) {
    this.email = email;
    this._password = password; // Use a protected attribute for password
    this.acquiredVouchers = [];
    this.coinsEarned = 0;
  }

  verifyPassword(password) {
    return this._password === password;
  }

  addVoucher(voucher) {
    this.acquiredVouchers.push(voucher);
  }

  addCoins(coins) {
    this.coinsEarned += coins;
  }
}