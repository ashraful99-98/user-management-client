import { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Container, Form, Button, Card, Row, Col, Alert } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import loginImg from "../images/login.svg";
import "./Login.css";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);
    const { login } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setSuccess(null);

        const response = await login(email, password);

        if (response.success) {
            setSuccess("Login successful!");
            setTimeout(() => navigate("/"), 1500);
        } else {
            setError(response.message);
        }
    };

    return (
        <Container fluid className="d-flex vh-100 align-items-center justify-content-center bg-light-gray login-section">
            <Row className="w-100 d-flex align-items-center justify-content-center">
                <Col xs={12} md={6} lg={5} className="d-flex align-items-center justify-content-center">
                    <Card className="shadow-lg p-4 w-100" style={{ maxWidth: "470px" }}>
                        <Card.Body>
                            <h2 className="text-center mb-4">Login</h2>
                            {error && <Alert variant="danger">{error}</Alert>}
                            {success && <Alert variant="success">{success}</Alert>}
                            <Form onSubmit={handleSubmit}>
                                <Form.Group className="mb-3">
                                    <Form.Label>Email</Form.Label>
                                    <Form.Control
                                        type="email"
                                        placeholder="Enter email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                    />
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control
                                        type="password"
                                        placeholder="Enter password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                    />
                                </Form.Group>
                                <Button variant="primary" type="submit" className="w-100">
                                    Login
                                </Button>
                            </Form>
                            <div className="text-center mt-3">
                                <Link to="/forgot-password" className="small-link">Forgot password?</Link>
                            </div>
                            <div className="text-center mt-2">
                                Don't have an account? <Link to="/register" className="small-link">Register</Link>
                            </div>
                        </Card.Body>
                    </Card>
                </Col>
                <Col xs={12} md={6} lg={5} className="d-flex align-items-center justify-content-center">
                    <img src={loginImg} alt="Login Illustration" className="img-fluid" style={{ maxWidth: "80%", height: "auto" }} />
                </Col>
            </Row>
        </Container>
    );
};

export default Login;

