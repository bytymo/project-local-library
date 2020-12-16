// Find the author object based on the entered id#
const findAuthorById = (authors, id) => authors.find(author => author.id === id)

// Find the book object based on the entered id#
const findBookById = (books, id) => books.find(book => book.id === id)

const partitionBooksByBorrowedStatus = (books) => {
  // create two empty container arrays and a final array containing the finished product of the previous two
  const returnedBooks = [], borrowedBooks = [], bothArrays = [borrowedBooks, returnedBooks]

  books.forEach(book => {
    // For each book, sort through the books in the library's possession vs the ones still borrowed to their respective container arrays
    book.borrows[0].returned ? returnedBooks.push(book) : borrowedBooks.push(book)
  })
  // return both results 
  return bothArrays
}

const getBorrowersForBook = (book, accounts) => {
  // Create a container array
  let historyList = []

  // For each account in the accounts array and each occurance of the borrow array within each book...
  accounts.forEach(account => {
    book.borrows.forEach(transaction => {
      // ...return an object with the account information along with if they have returned the book or not and add to the container array
      if(transaction.id === account.id) {
        let accountObj = {...account}
        accountObj.returned = transaction.returned
        historyList.push(accountObj)
      }
    })
  })
  // Return the last ten transactions of the book
  return historyList.slice(0, 10)
}

module.exports = {
  findAuthorById,
  findBookById,
  partitionBooksByBorrowedStatus,
  getBorrowersForBook,
}