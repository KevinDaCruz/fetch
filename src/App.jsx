import { useEffect, useState } from "react";
import { Card, Container, Row, Col, Button } from "react-bootstrap";
import "./App.css";

function App() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((err) =>
        console.error("Erreur lors du chargement des produits :", err)
      );
  }, []);

  const handleAddProduct = () => {
    const newProduct = {
      title: "Produit de test",
      price: 19.99,
      description: "Ceci est un produit factice",
      image: "https://via.placeholder.com/150",
      category: "test",
    };

    fetch("https://fakestoreapi.com/products", {
      method: "POST",
      body: JSON.stringify(newProduct),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        alert(`Le produit avec l'id ${data.id} a été créé`);
      });
  };

  return (
    <Container className="my-5 px-4">
      <h1 className="mb-4 text-center">Fake Store</h1>
      <div className="text-center mb-4">
        <Button onClick={handleAddProduct} variant="success">
          Ajouter un produit
        </Button>
      </div>
      <Row className="g-4 justify-content-center">
        {products.map((product) => (
          <Col md={6} lg={4} xl={3} key={product.id}>
            <Card className="h-100">
              <Card.Img variant="top" src={product.image} alt={product.title} />
              <Card.Body>
                <Card.Title>{product.title}</Card.Title>
                <Card.Text>{product.description}</Card.Text>
                <Card.Text>{product.price} €</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default App;
