import { useEffect, useState } from "react";
import { Card, Container, Row, Col } from "react-bootstrap";
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

  return (
    <Container className="my-5 px-4">
      <h1 className="mb-4 text-center">Fake Store</h1>
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
