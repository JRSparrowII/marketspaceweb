import { useRouter } from 'next/router';
import React from 'react';

const ProductPage = () => {
  const router = useRouter();
  const productId = 1; // ID do produto que você deseja acessar

  // Redirecionar para a página do produto
  React.useEffect(() => {
    router.push(`/product/${productId}`);
  }, []);

  return null; // ou adicione uma mensagem ou componente de carregamento aqui
};

export default ProductPage;
