import { useEffect, useState } from "react";
import { Card, Button, Container, Row, Col } from "react-bootstrap";
import "./App.css";

function App() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((err) =>
        console.error("Erreur lors du chargement des produits:", err)
      );
  }, []);

  return (
    <Container className="my-5 px-4" style={{ maxWidth: "1200px" }}>
      <h1 className="mb-4 text-center">Fake Store</h1>
      <Row className="g-4 justify-content-center">
        {products.map((product) => (
          <Col md={6} lg={4} xl={3} key={product.id}>
            <Card className="h-100">
              <div className="product-img-container">
                <Card.Img
                  variant="top"
                  src={product.image}
                  className="product-img"
                />
              </div>
              <Card.Body className="d-flex flex-column">
                <Card.Title>{product.title}</Card.Title>
                <Card.Text>{product.description}</Card.Text>
                <div className="mt-auto">
                  <h5>{product.price} $</h5>
                  <Button variant="primary">Voir</Button>
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default App;
