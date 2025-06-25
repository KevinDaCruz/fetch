import { useEffect, useState } from "react";
import {
  Card,
  Container,
  Row,
  Col,
  Button,
  Spinner,
  Alert,
} from "react-bootstrap";
import "./App.css";

function App() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("https://fakestoreapi.com/products");
        if (!response.ok) {
          throw new Error(
            `Erreur HTTP: ${
              response.statusText ? response.statusText + " - " : ""
            }${response.status}`
          );
        }
        const data = await response.json();
        setProducts(data);
      } catch (err) {
        console.error("Erreur lors du chargement des produits :", err.message);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleAddProduct = async () => {
    try {
      const response = await fetch("https://fakestoreapi.com/products", {
        method: "POST",
        body: JSON.stringify({
          title: "Nouveau produit",
          price: 10.99,
          description: "Description du nouveau produit",
          image: "https://via.placeholder.com/150",
          category: "autre",
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(
          `Erreur HTTP: ${
            response.statusText ? response.statusText + " - " : ""
          }${response.status}`
        );
      }
      const json = await response.json();
      alert(`Le produit avec l'id ${json.id} a été créé`);
    } catch (err) {
      alert("Une erreur est survenue lors de la création du produit.");
      console.error("Erreur création produit :", err.message);
    }
  };

  const handleUpdateProduct = async (id) => {
    try {
      const response = await fetch(`https://fakestoreapi.com/products/${id}`, {
        method: "PUT",
        body: JSON.stringify({
          title: "Produit modifié",
          price: 29.99,
          description: "Ceci est une nouvelle description",
          image: "https://via.placeholder.com/150",
          category: "modification",
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(
          `Erreur HTTP: ${
            response.statusText ? response.statusText + " - " : ""
          }${response.status}`
        );
      }
      const json = await response.json();
      alert(`Le produit avec l'id ${json.id} a été modifié`);
    } catch (err) {
      alert("Une erreur est survenue lors de la modification du produit.");
      console.error("Erreur modification complète :", err.message);
    }
  };

  const handleUpdatePrice = async (id) => {
    try {
      const response = await fetch(`https://fakestoreapi.com/products/${id}`, {
        method: "PATCH",
        body: JSON.stringify({
          price: 5,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(
          `Erreur HTTP: ${
            response.statusText ? response.statusText + " - " : ""
          }${response.status}`
        );
      }
      const json = await response.json();
      alert(`Le prix du produit avec l'id ${json.id} a été modifié`);
    } catch (err) {
      alert("Une erreur est survenue lors de la modification du prix.");
      console.error("Erreur modification partielle (prix) :", err.message);
    }
  };

  const handleDeleteProduct = async (id) => {
    try {
      const response = await fetch(`https://fakestoreapi.com/products/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error(
          `Erreur HTTP: ${
            response.statusText ? response.statusText + " - " : ""
          }${response.status}`
        );
      }
      const json = await response.json();
      alert(`Le produit avec l'id ${json.id} a été supprimé`);
    } catch (err) {
      alert("Une erreur est survenue lors de la suppression du produit.");
      console.error("Erreur suppression produit :", err.message);
    }
  };

  // === Rendu conditionnel ===
  if (loading) {
    return (
      <Container className="my-5 px-4 text-center">
        <Spinner animation="border" role="status" />
      </Container>
    );
  }

  if (error) {
    return (
      <Container className="my-5 px-4">
        <Alert variant="danger" className="text-center">
          Une erreur est survenue lors du chargement des produits.
        </Alert>
      </Container>
    );
  }

  // === Rendu principal ===
  return (
    <Container className="my-5 px-4">
      <h1 className="mb-4 text-center">Fake Store</h1>

      <div className="text-center mb-4">
        <Button variant="success" onClick={handleAddProduct}>
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

                <div className="d-grid gap-2">
                  <Button
                    variant="warning"
                    onClick={() => handleUpdateProduct(product.id)}
                  >
                    Modifier le produit complet
                  </Button>
                  <Button
                    variant="info"
                    onClick={() => handleUpdatePrice(product.id)}
                  >
                    Modifier le prix du produit
                  </Button>
                  <Button
                    variant="danger"
                    onClick={() => handleDeleteProduct(product.id)}
                  >
                    Supprimer le produit
                  </Button>
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
