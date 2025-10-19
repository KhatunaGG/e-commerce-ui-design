import Form from "./form";
import ProductForm from "./ProductForm";

const Admin = () => {
  return (
    <div className="w-full min-h-screen flex items-start gap-10 px-[3%]">
      <Form />
      <ProductForm />
    </div>
  );
};

export default Admin;
