
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useBooks } from "../contexts/BookContext";
import BookList from "../components/BookList";
import SearchBar from "../components/SearchBar";
import LoanForm, { LoanFormData } from "../components/LoanForm";
import { Book } from "../contexts/BookContext";
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

const Dashboard = () => {
  const { books, searchBooks, deleteBook, createLoan } = useBooks();
  const navigate = useNavigate();
  const [filteredBooks, setFilteredBooks] = useState(books);
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);

  const handleSearch = (query: string) => {
    setFilteredBooks(searchBooks(query));
  };

  const handleDeleteBook = async (id: string) => {
    await deleteBook(id);
  };

  const handleLoanClick = (book: Book) => {
    setSelectedBook(book);
  };

  const handleLoanSubmit = async (loanData: LoanFormData) => {
    await createLoan(loanData);
    setSelectedBook(null);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Biblioteca CMCB</h1>
          <p className="text-muted-foreground">
            Gerenciamento de livros e empréstimos
          </p>
        </div>
        <SearchBar onSearch={handleSearch} />
      </div>

      <BookList 
        books={filteredBooks} 
        onDelete={handleDeleteBook} 
        onLoan={handleLoanClick}
      />

      {/* emprestimo dialog */}
      <Dialog open={!!selectedBook} onOpenChange={() => setSelectedBook(null)}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Empréstimo de Livro</DialogTitle>
            <DialogDescription>
              Preencha as informações abaixo para registrar o empréstimo.
            </DialogDescription>
          </DialogHeader>
          {selectedBook && (
            <LoanForm
              book={selectedBook}
              onSubmit={handleLoanSubmit}
              onCancel={() => setSelectedBook(null)}
            />
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Dashboard;
