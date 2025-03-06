
import BookForm, { BookFormData } from "../components/BookForm";
import { useBooks } from "../contexts/BookContext";
import { useNavigate } from "react-router-dom";

const AddBook = () => {
  const { addBook } = useBooks();
  const navigate = useNavigate();

  const handleAddBook = async (bookData: BookFormData) => {
    await addBook(bookData);
    navigate("/dashboard");
  };

  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Adicionar Novo Livro</h1>
      <BookForm onSubmit={handleAddBook} />
    </div>
  );
};

export default AddBook;
