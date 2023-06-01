const ProductDetailsPage = ({ productId }) => {
    // Lógica para buscar os detalhes do produto com base no productId
  
    return (
      <div>
        <h1>Detalhes do Produto {productId}</h1>
        {/* Renderizar o conteúdo do produto aqui */}
      </div>
    );
};
  
export async function getServerSideProps(context) {
    const { productId } = context.query;
  
    return {
      props: {
        productId,
      },
    };
}
  
export default ProductDetailsPage;
  