import React, { useContext, useState } from 'react';
import { ShopContext } from '../../Context/ShopContext';
import { jsPDF } from 'jspdf';
import remove_icon from '../Assets/cart_cross_icon.png';
import './Cartitems.css';

export const CartItems = () => {
  const { getToTalCartAmount, all_product, cartItem, removeCartItem } = useContext(ShopContext);
  const [promoCode, setPromoCode] = useState('');
  const [userPhoneNumber, setUserPhoneNumber] = useState('');
  const [deliveryTime, setDeliveryTime] = useState('40 a 60 minutos');
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('');
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [discount, setDiscount] = useState(0);
  const [dataVencimento, setDataVencimento] = useState('');
  const [valor, setValor] = useState('');
  const [nomePagador, setNomePagador] = useState('');
  const [numeroDocumento, setNumeroDocumento] = useState('');
  const [nossoNumero, setNossoNumero] = useState('');


  const handleGerarBoleto = () => {
    // Criar um novo documento PDF
    const doc = new jsPDF('p', 'mm', 'a4');

    // Definir variáveis para coordenadas e tamanhos
    const margin = 10;
    const pageWidth = doc.internal.pageSize.getWidth();
    let y = margin;
  
    // Função para desenhar um retângulo
    const drawRectangle = (x, y, width, height) => {
      doc.rect(x, y, width, height);
    };

  

    // Função para adicionar uma seção ao boleto
    const addSection = (title, content, startX, startY, width, height, fontSize = 12) => {
      drawRectangle(startX, startY, width, height);
      doc.setFontSize(fontSize);
      doc.setFillColor(230, 230, 230)
      doc.text(title, startX + margin / 2, startY + margin / 2);
      doc.setFontSize(10);
      doc.text(content, startX + margin / 2, startY + margin / 2 + 7);
    };

    // Adicionar informações do boleto
   // Adicionar informações do boleto
  
   addSection('Banco:', '001-9', margin, y, 25, 15, 16);
   addSection('Pagamento', '', margin + 25, y, pageWidth - margin * 2 - 25, 15);
   y += 15;

   addSection('Beneficiário:', 'CENTRO CULTURAL CHANNEL LTDA', margin, y,    pageWidth - margin * 2, 15 )
   y += 15;

    addSection('Endereço', 'Rua Principal, 123 - Bairro Centro - CEP: 12345-678 - Cidade/UF', margin, y, pageWidth - margin * 2, 15);
    y += 15;

    addSection('Contato', '(00) 1234-5678   E-mail: contato@centroculturalchannel.com', margin, y, pageWidth - margin * 2, 15);
    y += 15;

    addSection('Pagador', 'DANIEL ANDERSON BRANDAO CAMPOS', margin, y, pageWidth - margin * 2, 15);
    y += 15;

    addSection('Endereço', 'Rua do Pagador, 456 - Bairro Pagador - CEP: 98765-432 - Cidade/UF', margin, y, pageWidth - margin * 2, 15);
    y += 15;

    addSection('Data do Documento', '06/02/2024', margin, y, pageWidth / 2 - margin * 0.5, 15);
    addSection('Nosso Número', '00027159750000341145', pageWidth / 2 + margin / 2, y, pageWidth / 2 - margin * 1.5, 15);
    y += 15;

    addSection('Vencimento', '06/02/2024', margin, y, pageWidth / 2 - margin * 0.5, 15);
    addSection('Valor', 'R$ 405,67', pageWidth / 2 + margin / 2, y, pageWidth / 2 - margin * 1.5, 15);
    y += 15;

    addSection('Descrição dos Produtos', '', margin, y, pageWidth - margin * 2, 15);
    y += 15;

    addSection('1. Produto A', 'R$ 100,00', margin, y, pageWidth - margin * 2, 15);
    y += 15;

    addSection('2. Produto B', 'R$ 200,00', margin, y, pageWidth - margin * 2, 15);
    y += 15;

    addSection('3. Produto C', 'R$ 105,67', margin, y, pageWidth - margin * 2, 15);
    y += 15;

    addSection('4. Produto D', 'R$ 0,00', margin, y, pageWidth - margin * 2, 15);
    y += 15;

    addSection('Linha Digitável', '00190.00009 02715.975005 00341.145175 7 96180000040567', margin, y, pageWidth - margin * 2, 15);
    y += 15;

    addSection('Código de Barras', '[CÓDIGO DE BARRAS AQUI]', margin, y, pageWidth - margin * 2, 15);

 
 

    // Salvar o documento
    doc.save('boleto.pdf');
  };
    
    
  const handleInputChange = (event) => {
    setPromoCode(event.target.value);
  };

  const applyPromoCode = () => {
    if (promoCode === 'DESCONTO10') {
      setDiscount(0.1);
      alert('Código promocional aplicado com sucesso!');
    } else {
      alert('Código promocional inválido!');
    }
  };
  const sendWhatsAppMessage = () => {
    // Filtra apenas os produtos que estão no carrinho
    const cartItems = all_product.filter(product => cartItem[product.id] > 0);
    
    // Mapeia os produtos para uma lista de itens formatada, incluindo a imagem
    const itemList = cartItems.map(item => `- ${item.name}} ${item.new_price}`).join('\n');
    
    // Calcula o preço total dos itens no carrinho
    const totalPrice = cartItems.reduce((total, item) => total + (item.new_price * cartItem[item.id]), 0);
    
    // Aplica o desconto, se houver
    const discountedPrice = totalPrice - (totalPrice * discount);
    
    // Definição de outros detalhes da mensagem
    const shippingFee = 0;
    const totalAmount = parseFloat(discountedPrice) + shippingFee;
    const message = `Olá, seu pedido está a caminho!\n\nItens Pedidos:\n${itemList}\nTotal: R$ ${totalAmount}\nPrevisão de Entrega: ${deliveryTime}\nMétodo de Pagamento: ${selectedPaymentMethod}`;
    
    const url = `https://web.whatsapp.com/send?phone=${encodeURIComponent(userPhoneNumber)}&text=${encodeURIComponent(message)}`;

    setLoading(true);

    // Simulando um tempo de carregamento de 2 segundos antes de abrir a janela do WhatsApp
    setTimeout(() => {
        window.open(url, '_blank');
        setLoading(false);
    }, 2000);
}


  const selectPaymentMethod = (paymentMethod) => {
    setSelectedPaymentMethod(paymentMethod);
  };

  const validatePaymentMethod = (event) => {
    event.preventDefault();
    if (selectedPaymentMethod) {
      sendWhatsAppMessage();
    } else {
      alert('Por favor, selecione um método de pagamento antes de enviar o formulário.');
    }
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <div className="cartitems">
      <h1>Cart Items</h1>
      <table className="cartitems-table">
        <thead>
          <tr>
            <th>Products</th>
            <th>Title</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Remove</th>
          </tr>
        </thead>
        <tbody>
          {all_product.map((product) => {
            if (cartItem[product.id] > 0) {
              return (
                <tr className="cartitems-row" key={product.id}>
                  <td><img src={product.image} className="carticon-product-icon" alt="product" /></td>
                  <td>{product.name}</td>
                  <td>{product.new_price}</td>
                  <td>{cartItem[product.id]}</td>
                  <td><img src={remove_icon} onClick={() => removeCartItem(product.id)} alt="remove" className="remove-icon" /></td>
                </tr>
              );
            }
            return null;
          })}
        </tbody>
      </table>
      <div className="cartitems-down">
        <div className="cartitems-total">
          <h1>Cart Totals</h1>
          <div className="cartitems-total-item">
            <p>SubTotal</p>
            <p>${getToTalCartAmount()}</p>
            <hr />
            <div className="cartitems-total-item">
              <p>Shipping Fee</p>
              <p>Free</p>
            </div>
            <hr />
            <div className="cartitems-total-item">
              <h3>Total : </h3>
              <h3>${getToTalCartAmount()}</h3>
            </div>
          </div>
          <div className="promo-code">
          <div className="boleto-form">
            <h2>Gerar Boleto</h2>
          
            <button onClick={ handleGerarBoleto}>Gerar Boleto</button>
          </div>
          </div>
        </div>
       
      
        <div className="cartitems-promocode">
          <div className="cartitems-promobox">
            <div className="left-content">
              <input type="text" placeholder="Código promocional" value={promoCode} onChange={handleInputChange} />
              <button onClick={applyPromoCode}>Aplicar</button>
            </div>
            <form onSubmit={validatePaymentMethod} className="form-button-enviar">
              <button type="button" onClick={() => selectPaymentMethod('Pix')}>Pagar com Pix</button>
              <button type="button" onClick={() => selectPaymentMethod('Cartão de Crédito')}>Pagar com Cartão de Crédito</button>
            
              <button className="whatsappbutton" type="button" onClick={() => sendWhatsAppMessage()}>
                {loading ? 'Enviando...' : 'Enviar via WhatsApp'}
              </button>
            </form>
            {/* Modal de carregamento */}
            {showModal && (
              <div className="loading-modal">
                <div className="loading-spinner"></div>
              </div>
            )}
            {/* Modal */}
            {showModal && (
              <div className="modal">
                <div className="modal-content">
                  <span className="close" onClick={closeModal}>&times;</span>
                  <p>Envio concluído!</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};