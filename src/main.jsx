import { useMemo, useState } from "react";
import { business } from "./config";
import "./styles.css";

const money = (n) => new Intl.NumberFormat("pt-BR", { style: "currency", currency: business.currency }).format(n);
const wa = (message) => `https://wa.me/${business.whatsapp}?text=${encodeURIComponent(message)}`;

export default function App() {
  const [cart, setCart] = useState([]);
  const [category, setCategory] = useState("Todos");
  const [notice, setNotice] = useState("");
  const categories = ["Todos", ...new Set(business.products.map(p => p.category))];
  const products = business.products.filter(p => category === "Todos" || p.category === category);
  const total = useMemo(() => cart.reduce((sum, item) => sum + item.price * item.qty, 0), [cart]);
  const add = (p) => { setCart(old => { const found = old.find(i => i.id === p.id); return found ? old.map(i => i.id === p.id ? { ...i, qty: i.qty + 1 } : i) : [...old, { ...p, qty: 1 }]; }); setNotice(`${p.name} adicionado ao carrinho`); };
  const remove = (id) => setCart(old => old.filter(i => i.id !== id));
  const checkout = () => {
    if (!cart.length) return;
    if (business.payment.enabled && business.payment.checkoutUrl) {
      window.location.href = business.payment.checkoutUrl;
      return;
    }
    const lines = cart.map(i => `• ${i.name} x${i.qty} — ${money(i.price * i.qty)}`).join("\n");
    window.open(wa(`Olá! Gostaria de solicitar este pedido:\n${lines}\nTotal estimado: ${money(total)}\nPor favor, confirme disponibilidade, frete e formas de pagamento.`), "_blank", "noopener,noreferrer");
  };
  return <main>
    <nav className="nav"><a className="brand" href="#inicio">{business.name}<small>LOJA OFICIAL</small></a><div className="nav-actions"><a href="#catalogo">Catálogo</a><a className="cart-pill" href="#carrinho">Sacola ({cart.reduce((n,i)=>n+i.qty,0)})</a></div></nav>
    <section className="hero" id="inicio"><div><span className="eyebrow">SELEÇÃO ESPECIAL</span><h1>{business.tagline}</h1><p>{business.description}</p><a className="button" href="#catalogo">Explorar catálogo ↗</a></div><div className="hero-art"><span>V</span><small>ESCOLHAS COM INTENÇÃO</small></div></section>
    <section className="section" id="catalogo"><div className="section-heading"><div><span className="eyebrow">CATÁLOGO</span><h2>Produtos em destaque</h2></div><div className="filters">{categories.map(c=><button key={c} className={category===c?"filter active":"filter"} onClick={()=>setCategory(c)}>{c}</button>)}</div></div><div className="products">{products.map(p=><article className="product" key={p.id}><div className="product-art"><span>{p.category}</span></div><div className="product-info"><small>{p.category}</small><h3>{p.name}</h3><p>{p.description}</p><div className="product-bottom"><strong>{money(p.price)}</strong><button className="add" onClick={()=>add(p)}>Adicionar +</button></div></div></article>)}</div></section>
    <section className="cart-section" id="carrinho"><div><span className="eyebrow">SEU PEDIDO</span><h2>Sacola</h2><p>Revise os itens antes de continuar.</p>{notice && <p className="notice" role="status">{notice}</p>}</div><div className="cart-box">{cart.length===0?<p>Sua sacola está vazia.</p>:cart.map(i=><div className="cart-line" key={i.id}><div><strong>{i.name}</strong><p>{i.qty} × {money(i.price)}</p></div><div><strong>{money(i.qty*i.price)}</strong><button className="remove" onClick={()=>remove(i.id)} aria-label={`Remover ${i.name}`}>Remover</button></div></div>)}<div className="total"><span>Total estimado</span><strong>{money(total)}</strong></div><button className="button checkout" disabled={!cart.length} onClick={checkout}>{business.payment.enabled && business.payment.checkoutUrl ? "Continuar para pagamento ↗" : "Solicitar pedido pelo WhatsApp ↗"}</button>{!business.payment.enabled && <p className="small">Pagamento on-line ainda não configurado. O pedido será enviado pelo WhatsApp; não será cobrado automaticamente.</p>}</div></section>
    <footer><span>© {new Date().getFullYear()} {business.name}</span><span>{business.address}</span></footer>
  </main>;
}