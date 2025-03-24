import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Container, Form, Button, Card, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import registerImg from "../images/register.jpg";

const Register = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState({ type: "", text: "" });

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("http://localhost:8000/api/auth/register", {
                name,
                email,
                password
            });

            setMessage({ type: "success", text: "Registration successful! Redirecting to login..." });

            setName("");
            setEmail("");
            setPassword("");

            // Redirect login page
            setTimeout(() => {
                navigate("/login");
            }, 2000);

        } catch (error) {
            console.error("Registration failed:", error.response?.data?.message || error.message);


            setMessage({ type: "error", text: error.response?.data?.message || "Registration failed. Please try again." });
        }
    };

    return (
        <Container fluid className="d-flex vh-100 align-items-center justify-content-center bg-light-gray">
            <Row className="w-100 d-flex align-items-center justify-content-center">
                <Col xs={12} md={6} lg={5} className="d-flex align-items-center justify-content-center">
                    <Card className="shadow-lg p-4 w-100" style={{ maxWidth: "470px" }}>
                        <Card.Body>
                            <h2 className="text-center mb-4">Register</h2>
                            {message.text && (
                                <div className={`alert ${message.type === "success" ? "alert-success" : "alert-danger"} text-center`}>
                                    {message.text}
                                </div>
                            )}

                            <Form onSubmit={handleSubmit}>
                                <Form.Group className="mb-3">
                                    <Form.Label>Name</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Enter name"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        required
                                    />
                                </Form.Group>
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
                                <Button variant="success" type="submit" className="w-100">
                                    Register
                                </Button>
                            </Form>
                            <div className="text-center mt-3">
                                Already have an account? <Link to="/login" className="small-link">Login</Link>
                            </div>
                        </Card.Body>
                    </Card>
                </Col>

                <Col xs={12} md={6} lg={5} className="d-flex align-items-center justify-content-center">
                    <img src={registerImg} alt="Register" className="img-fluid" style={{ maxWidth: "100%", height: "auto" }} />
                </Col>
            </Row>
        </Container>
    );
};
export default Register;
